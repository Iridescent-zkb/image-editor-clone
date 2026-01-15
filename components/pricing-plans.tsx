"use client"

import { useState, useTransition } from "react"
import { Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Plan = {
  name: string
  description: string
  price: string
  priceSuffix: string
  features: string[]
}

const PLAN: Plan = {
  name: "Pro",
  description: "Everything you need to edit images professionally",
  price: "$9.9",
  priceSuffix: "/mo",
  features: ["Unlimited edits", "Faster generation speed", "Asset library access", "Commercial use license", "Priority support"],
}

async function createCheckout() {
  const response = await fetch("/api/creem/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })

  const payload = (await response.json()) as { checkoutUrl?: string; error?: string }

  if (!response.ok) {
    throw new Error(payload.error ?? "Failed to create checkout.")
  }
  if (!payload.checkoutUrl) {
    throw new Error("Missing checkout URL.")
  }

  return payload.checkoutUrl
}

export function PricingPlans() {
  const [pending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center gap-4">
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      </div>

      <div className="mt-8 flex justify-center">
        <Card className="relative w-full max-w-lg overflow-hidden border-primary shadow-md">
          <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Best value
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{PLAN.name}</CardTitle>
            <CardDescription>{PLAN.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold tracking-tight">{PLAN.price}</span>
                <span className="text-sm text-muted-foreground">{PLAN.priceSuffix}</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Billed monthly. Cancel anytime.</div>
            </div>

            <ul className="space-y-3 text-sm">
              {PLAN.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              disabled={pending}
              onClick={() => {
                setErrorMessage(null)
                startTransition(async () => {
                  try {
                    const checkoutUrl = await createCheckout()
                    window.location.href = checkoutUrl
                  } catch (error) {
                    setErrorMessage(error instanceof Error ? error.message : "Checkout failed.")
                  }
                })
              }}
            >
              {pending ? "Redirecting…" : "Subscribe for $9.9/mo"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
