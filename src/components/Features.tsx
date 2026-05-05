const features = [
  {
    icon: '🔒',
    title: '100% Private',
    desc: 'Everything runs in your browser. No data is ever sent to any server. Your code, tokens, and data stay on your machine.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'No server roundtrips. Instant results. Works offline. Built with modern web APIs for maximum performance.',
  },
  {
    icon: '🛠️',
    title: '11 Essential Tools',
    desc: 'JSON formatter, JWT decoder, Base64, URL encoder, hash generator, timestamp converter, UUID gen, regex tester, color converter, lorem ipsum, and text diff.',
  },
  {
    icon: '🎨',
    title: 'Beautiful UI',
    desc: 'Clean, modern interface with dark mode support. Designed for developers who spend hours in their tools.',
  },
  {
    icon: '📱',
    title: 'Responsive',
    desc: 'Works perfectly on desktop, tablet, and mobile. Use it on any device, anywhere.',
  },
  {
    icon: '🔄',
    title: 'Always Updated',
    desc: 'New tools added regularly. Built by developers, for developers. No bloat, just what you need.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Why developers love <span className="gradient-text">DevKit Pro</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            All the tools you reach for daily, unified in one beautiful interface.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="tool-card p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
