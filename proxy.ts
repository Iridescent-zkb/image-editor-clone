import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { createSupabaseRouteClient } from "@/lib/supabase/route"
import { hasSupabaseEnv } from "@/lib/supabase/env"

export async function proxy(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const { supabase, applyCookies } = createSupabaseRouteClient(request)

  // Refresh the session if needed (sets/rotates cookies).
  await supabase.auth.getUser()
  applyCookies(response)

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
