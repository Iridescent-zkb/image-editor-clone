"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, Upload, Sparkles } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"

export function Hero() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background pt-20 pb-32">
      <div className="absolute top-6 right-6 z-20">
        <Button size="sm" variant="secondary" className="font-semibold" asChild>
          <a href="/auth/login">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in with Google
          </a>
        </Button>
      </div>

      {/* Decorative banana elements */}
      <div className="absolute top-10 right-10 text-8xl opacity-10 rotate-12 pointer-events-none select-none">🍌</div>
      <div className="absolute bottom-20 left-10 text-6xl opacity-10 -rotate-45 pointer-events-none select-none">
        🍌
      </div>
      <div className="absolute top-40 left-1/4 text-5xl opacity-5 rotate-90 pointer-events-none select-none">🍌</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Announcement banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-foreground px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>NEW: BananaEdit Pro is now live</span>
            <Button variant="link" className="h-auto p-0 text-primary font-semibold">
              Try it now
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-5xl">🍌</span>
            <h1 className="text-6xl font-bold tracking-tight text-balance">BananaEdit</h1>
          </div>

          <p className="text-xl text-muted-foreground mb-4 text-balance leading-relaxed">
            Transform any image with simple text prompts. Advanced AI delivers consistent character editing and scene
            preservation.
          </p>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
            Experience the future of AI image editing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-base font-semibold" onClick={() => setShowUpload(true)}>
              <Upload className="mr-2 h-5 w-5" />
              Start Editing
            </Button>
            <Button size="lg" variant="outline" className="text-base font-semibold bg-transparent">
              View Examples
            </Button>
          </div>

          {/* Upload section */}
          {showUpload && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4">
              <ImageUpload />
            </div>
          )}

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>One-shot editing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Multi-image support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Natural language</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
