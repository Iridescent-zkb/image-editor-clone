import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { createSupabaseRouteClient } from "@/lib/supabase/route"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = url.origin
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/"

  if (!code) {
    return NextResponse.redirect(new URL(next, origin))
  }

  let supabase: ReturnType<typeof createSupabaseRouteClient>["supabase"]
  let applyCookies: ReturnType<typeof createSupabaseRouteClient>["applyCookies"]

  try {
    ;({ supabase, applyCookies } = createSupabaseRouteClient(request))
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    const errorUrl = new URL("/auth/error", origin)
    errorUrl.searchParams.set("message", message)
    return NextResponse.redirect(errorUrl)
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    const errorUrl = new URL("/auth/error", origin)
    errorUrl.searchParams.set("message", error.message)
    return NextResponse.redirect(errorUrl)
  }

  const response = NextResponse.redirect(new URL(next, origin))
  applyCookies(response)
  return response
}
