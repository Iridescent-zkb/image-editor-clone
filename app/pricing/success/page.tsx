import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PricingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ rid?: string }>
}) {
  const { rid } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-secondary/30 to-background">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>Payment received</CardTitle>
          <CardDescription>Your checkout completed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {rid ? <p className="text-sm text-muted-foreground">Reference: {rid}</p> : null}
          <p className="text-sm text-muted-foreground">
            If your plan benefits don’t show up immediately, it may take a moment for the webhook to process.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/account">Go to account</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/pricing">Back to pricing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

