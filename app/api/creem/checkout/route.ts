import crypto from "node:crypto"
import { NextResponse } from "next/server"

import { createCreemCheckout } from "@/lib/creem/client"
import { getCreemEnv } from "@/lib/creem/env"

export async function POST(request: Request) {
  let body: { units?: number }
  try {
    body = (await request.json()) as { units?: number }
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  const units = body.units

  if (units !== undefined && (!Number.isInteger(units) || units < 1 || units > 1000)) {
    return NextResponse.json({ error: "Invalid units." }, { status: 400 })
  }

  const env = getCreemEnv()
  const productId =
    env.products.monthly ??
    env.products.proMonthly ??
    env.products.basicMonthly ??
    env.products.maxMonthly ??
    env.products.proYearly ??
    env.products.basicYearly ??
    env.products.maxYearly

  if (!productId) {
    return NextResponse.json(
      { error: "Missing Creem product id env. Set CREEM_PRODUCT_ID_MONTHLY (recommended)." },
      { status: 500 },
    )
  }

  const origin = new URL(request.url).origin
  const requestId = crypto.randomUUID()
  const successUrl = `${origin}/pricing/success?rid=${encodeURIComponent(requestId)}`

  try {
    const { checkoutUrl } = await createCreemCheckout({
      productId,
      requestId,
      successUrl,
      units,
    })
    return NextResponse.json({ checkoutUrl })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
