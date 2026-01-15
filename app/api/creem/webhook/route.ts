import crypto from "node:crypto"
import { NextResponse } from "next/server"

import { getCreemEnv } from "@/lib/creem/env"

function timingSafeEqualHex(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8")
  const bBuf = Buffer.from(b, "utf8")
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

export async function POST(request: Request) {
  const { webhookSecret } = getCreemEnv()
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing CREEM_WEBHOOK_SECRET." }, { status: 500 })
  }

  const signature = request.headers.get("creem-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing creem-signature header." }, { status: 400 })
  }

  const rawBody = await request.text()
  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex")

  if (!timingSafeEqualHex(signature, expected)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  }

  let event: unknown = null
  try {
    event = JSON.parse(rawBody) as unknown
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  // TODO: Persist entitlements/subscriptions in your DB.
  // Keeping the handler lenient for now: accept and acknowledge verified events.
  return NextResponse.json({ received: true })
}

