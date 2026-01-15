export function Footer() {
  return (
    <footer className="py-12 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍌</span>
            <span className="text-xl font-bold">BananaEdit</span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <div className="text-sm text-muted-foreground">© 2025 BananaEdit. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
