export type CreemEnv = {
  apiKey: string
  webhookSecret?: string
  products: {
    monthly?: string
    basicMonthly?: string
    basicYearly?: string
    proMonthly?: string
    proYearly?: string
    maxMonthly?: string
    maxYearly?: string
  }
}

export function getCreemEnv(): CreemEnv {
  const apiKey = process.env.CREEM_API_KEY
  if (!apiKey) {
    throw new Error("Missing CREEM_API_KEY.")
  }

  return {
    apiKey,
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET,
    products: {
      monthly: process.env.CREEM_PRODUCT_ID_MONTHLY,
      basicMonthly: process.env.CREEM_PRODUCT_ID_BASIC_MONTHLY,
      basicYearly: process.env.CREEM_PRODUCT_ID_BASIC_YEARLY,
      proMonthly: process.env.CREEM_PRODUCT_ID_PRO_MONTHLY,
      proYearly: process.env.CREEM_PRODUCT_ID_PRO_YEARLY,
      maxMonthly: process.env.CREEM_PRODUCT_ID_MAX_MONTHLY,
      maxYearly: process.env.CREEM_PRODUCT_ID_MAX_YEARLY,
    },
  }
}
