"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Wand2 } from "lucide-react"

export function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [outputs, setOutputs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File too large. Max 10MB.")
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File too large. Max 10MB.")
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!image || !prompt || loading) return
    setLoading(true)
    setError(null)
    setOutputs([])
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, image }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.detail || err?.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      const imgs: string[] = data?.images || []
      if (imgs.length === 0) {
        // fallback: try to extract from data.raw.choices[0].message
        const raw = data?.raw
        try {
          const content = raw?.choices?.[0]?.message?.content
          if (Array.isArray(content)) {
            const urls = content
              .map((c: any) => (c?.image_url?.url ? c.image_url.url : c?.url))
              .filter(Boolean)
            if (urls.length) setOutputs(urls)
          }
        } catch {}
      } else {
        setOutputs(imgs)
      }
    } catch (e: any) {
      setError(e?.message || "Failed to generate image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Try The AI Editor</h3>
      <p className="text-muted-foreground text-center mb-6">
        Experience the power of AI-powered image editing. Transform any photo with simple text commands
      </p>

      {/* Upload area */}
      {!image ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Drop your image here</p>
          <p className="text-sm text-muted-foreground mb-4">or</p>
          <Button asChild>
            <label>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
              Add Image
            </label>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Max 10MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image preview */}
          <div className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt="Uploaded preview"
              className="w-full h-auto rounded-lg max-h-96 object-contain bg-muted"
            />
            <Button size="icon" variant="destructive" className="absolute top-2 right-2" onClick={() => setImage(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Prompt input */}
          <div>
            <label className="text-sm font-medium mb-2 block">Main Prompt</label>
            <Textarea
              placeholder="Describe how you want to edit this image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt || !image || loading}>
            <Wand2 className="mr-2 h-5 w-5" />
            {loading ? "Generating..." : "Generate Now"}
          </Button>

          {/* Output Gallery */}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {outputs.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Output Gallery</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outputs.map((src, idx) => (
                  <img key={idx} src={src} alt={`Output ${idx + 1}`} className="w-full h-auto rounded bg-muted" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
