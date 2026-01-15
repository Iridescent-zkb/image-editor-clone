import { getCreemEnv } from "@/lib/creem/env"

export type CreateCreemCheckoutInput = {
  productId: string
  requestId: string
  successUrl: string
  units?: number
}

export type CreateCreemCheckoutResult = {
  checkoutUrl: string
}

export async function createCreemCheckout(input: CreateCreemCheckoutInput): Promise<CreateCreemCheckoutResult> {
  const { apiKey } = getCreemEnv()

  const response = await fetch("https://api.creem.io/v1/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      product_id: input.productId,
      request_id: input.requestId,
      success_url: input.successUrl,
      ...(typeof input.units === "number" ? { units: input.units } : {}),
    }),
  })

  const json = (await response.json().catch(() => null)) as null | {
    checkout_url?: string
    message?: string
    error?: string
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Creem API rejected the request (Forbidden). Verify `CREEM_API_KEY` is your Creem secret API key (not webhook secret), and that the product id belongs to the same Creem account/mode.",
      )
    }
    const message = json?.message ?? json?.error ?? `Creem error (${response.status}).`
    throw new Error(message)
  }

  const checkoutUrl = json?.checkout_url
  if (!checkoutUrl) {
    throw new Error("Creem response missing checkout_url.")
  }

  return { checkoutUrl }
}
