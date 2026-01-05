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

