# BananaEdit

AI-powered image editor built with Next.js 16, React 19, and Tailwind CSS v4.

Features
- Upload an image (drag & drop or button), 10MB limit
- Enter a main prompt and generate edited images via OpenRouter (Gemini 2.5 Flash Image)
- Output Gallery displays results

Quick Start
1. Requirements: Node 18+ (Node 20+ recommended), pnpm
2. Install deps: `pnpm install`
3. Dev server: `pnpm dev` (open http://localhost:3000)
4. Build: `pnpm build` → Start: `pnpm start`

Environment
1. Copy `.env.example` to `.env.local`
2. Set `OPENROUTER_API_KEY` (do NOT commit secrets)
3. (Auth) Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Supabase Google Login
1. Create a Supabase project
2. Enable Google provider in Supabase Auth
3. Add redirect URLs in Supabase:
   - `http://localhost:3000/auth/callback`
   - (prod) `https://YOUR_DOMAIN/auth/callback`
4. Start login at `GET /auth/login` (or click “Sign in with Google” on the home page)
5. After login, visit `GET /account` to see the session, and sign out via the button there

Pricing + Creem Payments
1. Create a monthly product in Creem and copy its product ID (e.g. `prod_...`)
2. Set env vars in `.env.local`:
   - `CREEM_API_KEY`
   - `CREEM_PRODUCT_ID_MONTHLY` (recommended)
3. Open `GET /pricing` and click a plan to start checkout
4. (Recommended) Configure a Creem webhook to `POST /api/creem/webhook` and set `CREEM_WEBHOOK_SECRET`

API
- Route: `POST /api/generate`
  - Body: `{ prompt: string, image: string }` where `image` is a data URL
  - Returns: `{ images: string[], raw: any }`

Tech Stack
- Next.js App Router, Server/Client components
- Tailwind v4
- OpenRouter API (OpenAI-compatible)

CI
- GitHub Actions workflow runs lint + build on Node 20/22

License
MIT
