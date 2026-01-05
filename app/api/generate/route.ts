import { NextResponse } from "next/server"

// Basic image URL detector for common response shapes
function extractImageUrls(json: any): string[] {
  const out: string[] = []

  const pushIfImageUrl = (val: unknown) => {
    if (typeof val !== "string") return
    // http(s) images or data URLs
    if (/^(https?:)\/\/.+\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(val)) out.push(val)
    if (/^data:image\/(png|jpeg|webp|gif);base64,/i.test(val)) out.push(val)
  }

  const walk = (v: any) => {
    if (!v) return
    if (Array.isArray(v)) {
      v.forEach(walk)
      return
    }
    if (typeof v === "object") {
      // common shapes
      // { type: 'image_url', image_url: { url } }
      if ((v as any).image_url?.url) pushIfImageUrl((v as any).image_url.url)
      if ((v as any).url) pushIfImageUrl((v as any).url)
      if ((v as any).b64_json) {
        const dataUrl = `data:image/png;base64,${(v as any).b64_json}`
        pushIfImageUrl(dataUrl)
      }
      for (const k of Object.keys(v)) walk((v as any)[k])
      return
    }
    pushIfImageUrl(v)
  }

  walk(json)
  return Array.from(new Set(out))
}

export async function POST(req: Request) {
  try {
    const { prompt, image } = (await req.json()) as { prompt?: string; image?: string }
    if (!prompt || !image) {
      return NextResponse.json({ error: "Missing prompt or image" }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "OPENROUTER_API_KEY is not set" }, { status: 500 })
    }

    const body = {
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "BananaEdit",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: "OpenRouter error", detail: text }, { status: 500 })
    }

    const data = await res.json()
    const images = extractImageUrls(data)

    // If the provider returned no image URLs, surface raw content for debugging.
    return NextResponse.json({ images, raw: data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}

