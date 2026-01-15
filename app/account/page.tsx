import { redirect } from "next/navigation"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function AccountPage() {
  let user:
    | {
        id: string
        email?: string | null
      }
    | null = null

  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h1 className="text-xl font-semibold">Auth not configured</h1>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
          <p className="mt-4 text-sm">
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code>.env.local</code>.
          </p>
          <a className="mt-4 inline-block text-sm text-primary hover:underline" href="/">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  if (!user) {
    redirect("/auth/login?next=/account")
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h1 className="text-xl font-semibold">Account</h1>
        <div className="mt-4 space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Email:</span> {user.email ?? "—"}
          </div>
          <div>
            <span className="text-muted-foreground">User ID:</span> {user.id}
          </div>
        </div>

        <form action="/auth/signout" method="post" className="mt-6">
          <button className="text-sm text-primary hover:underline" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </main>
  )
}
