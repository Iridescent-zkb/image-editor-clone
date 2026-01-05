import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const showcases = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with optimized neural engine",
    image: "/stunning-mountain-sunset.png",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using AI technology",
    image: "/beautiful-garden-with-flowers-and-pathways.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Delivers photorealistic results at lightning speed",
    image: "/tropical-beach-paradise.png",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with AI",
    image: "/aurora-borealis-over-snowy-landscape.jpg",
  },
]

export function Showcase() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative bananas */}
      <div className="absolute bottom-10 left-10 text-9xl opacity-5 -rotate-12 pointer-events-none select-none">🍌</div>
      <div className="absolute top-20 right-1/4 text-6xl opacity-5 rotate-45 pointer-events-none select-none">🍌</div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Showcase</h2>
          <p className="text-xl text-muted-foreground text-balance">Lightning-Fast AI Creations</p>
          <p className="text-muted-foreground mt-2 text-pretty">See what BananaEdit generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {showcases.map((item, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">BananaEdit Speed</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">Experience the power of BananaEdit yourself</p>
          <Button size="lg">Try BananaEdit Editor</Button>
        </div>
      </div>
    </section>
  )
}
