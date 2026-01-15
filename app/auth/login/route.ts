import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { createSupabaseRouteClient } from "@/lib/supabase/route"

export async function GET(request: NextRequest) {
  let supabase: ReturnType<typeof createSupabaseRouteClient>["supabase"]
  let applyCookies: ReturnType<typeof createSupabaseRouteClient>["applyCookies"]

  try {
    ;({ supabase, applyCookies } = createSupabaseRouteClient(request))
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    const origin = new URL(request.url).origin
    const errorUrl = new URL("/auth/error", origin)
    errorUrl.searchParams.set("message", message)
    return NextResponse.redirect(errorUrl)
  }

  const url = new URL(request.url)
  const origin = url.origin
  const next = url.searchParams.get("next") ?? "/"

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error) {
    const errorUrl = new URL("/auth/error", origin)
    errorUrl.searchParams.set("message", error.message)
    return NextResponse.redirect(errorUrl)
  }

  const response = NextResponse.redirect(data.url)
  applyCookies(response)
  return response
}
