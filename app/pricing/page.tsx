import Link from "next/link"

import { PricingPlans } from "@/components/pricing-plans"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-2xl">🍌</span>
          <span>BananaEdit</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost">
            <Link href="/account">Account</Link>
          </Button>
          <Button asChild variant="secondary">
            <a href="/auth/login">Sign in</a>
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-10 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Pricing that scales with your creativity
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            One simple plan. Cancel anytime.
          </p>
        </div>

        <div className="mt-10">
          <PricingPlans />
        </div>

        <div className="mt-16 mx-auto max-w-3xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">Questions?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If you need a custom plan or have billing questions, reach out and we’ll help.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <a href="mailto:support@bananaedit.local">Contact support</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
