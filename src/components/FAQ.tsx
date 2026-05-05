'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Is DevKit Pro really free?',
    a: 'Yes! All 11 core tools are completely free to use, forever. No signup required, no limits on usage. The Pro tier adds advanced features like AI-powered regex generation and batch operations.',
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. All processing happens directly in your browser. We never send your data to any server. You can even use DevKit Pro offline once loaded.',
  },
  {
    q: 'What tools are included?',
    a: 'JSON Formatter, JWT Decoder, Base64 Encode/Decode, URL Encode/Decode, Hash Generator (MD5, SHA-1, SHA-256, SHA-512), Timestamp Converter, UUID Generator, Regex Tester, Color Converter, Lorem Ipsum Generator, and Text Diff.',
  },
  {
    q: 'How does the Pro license work?',
    a: 'Pro is a one-time payment of $12. You get lifetime access to all current and future pro features. No recurring charges, no surprises.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. Just open the site and start using any tool immediately. Zero friction.',
  },
  {
    q: 'Can I use this at work?',
    a: 'Absolutely. DevKit Pro is built for professional developers. Many teams use it daily for debugging, encoding, and formatting tasks.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 sm:py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="tool-card overflow-hidden">
              <button
                className="w-full p-5 text-left flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm pr-4" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
                <span className="text-lg flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
