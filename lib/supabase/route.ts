import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { getSupabaseEnv } from "@/lib/supabase/env"

type CookiesToSet = Array<{
  name: string
  value: string
  options: CookieOptions
}>

export function createSupabaseRouteClient(request: NextRequest): {
  supabase: ReturnType<typeof createServerClient>
  applyCookies: (response: NextResponse) => void
} {
  const { url, anonKey } = getSupabaseEnv()
  const cookiesToSet: CookiesToSet = []

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(newCookies) {
        cookiesToSet.push(...newCookies)
      },
    },
  })

  function applyCookies(response: NextResponse) {
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
  }

  return { supabase, applyCookies }
}

