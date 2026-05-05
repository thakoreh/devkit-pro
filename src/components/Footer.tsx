import { Terminal } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded hero-gradient flex items-center justify-center">
              <Terminal className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>DevKit Pro</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#tools" className="hover:underline">Tools</a>
            <a href="#features" className="hover:underline">Features</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} DevKit Pro. All tools run in your browser.
          </p>
        </div>
      </div>
    </footer>
  )
}
