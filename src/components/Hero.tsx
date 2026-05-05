import Navbar from './Navbar'

export default function Hero() {
  return (
    <section className="relative pt-16 overflow-hidden">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 badge mb-6 text-sm px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            10+ tools — 100% free — No signup
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Every developer tool you need,{" "}
            <span className="gradient-text">in one place</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            JSON formatter, JWT decoder, Base64 encoder, hash generator, regex tester, 
            and 6 more essential tools. Fast, private, works offline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#tools" className="btn-primary text-base px-8 py-3 rounded-xl inline-flex items-center gap-2">
              Open Tools →
            </a>
            <a href="#features" className="btn-secondary text-base px-8 py-3 rounded-xl">
              See what&apos;s included
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              100% Private
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Instant — No Server
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Works Offline
            </div>
          </div>
        </div>
      </div>
      {/* Subtle gradient bg */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07] hero-gradient blur-3xl pointer-events-none" />
    </section>
  )
}
