'use client'

import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'All 11 tools, forever free.',
    features: [
      'All 11 developer tools',
      'JSON formatter & validator',
      'JWT decoder',
      'Base64 & URL encoder',
      'Hash generator (MD5, SHA)',
      'Timestamp converter',
      'UUID generator',
      'Regex tester',
      'Color converter',
      'Lorem ipsum generator',
      'Text diff tool',
    ],
    cta: 'Start Using Free',
    ctaLink: '#tools',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'one-time',
    desc: 'Lifetime access to pro features.',
    features: [
      'Everything in Free, plus:',
      'AI-powered regex generation',
      'JSON Schema validation',
      'JWT signature verification',
      'Batch operations',
      'History & saved items',
      'Custom keyboard shortcuts',
      'Priority support',
      'Future tools included',
    ],
    cta: 'Get Pro — $12 one-time',
    ctaLink: 'https://buy.stripe.com/test_dRmeVd5Nj4k75QUcSD0Jq00',
    popular: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Free to use forever. Upgrade for pro features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`tool-card p-8 relative ${plan.popular ? 'ring-2 ring-indigo-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white hero-gradient">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                <span className="text-sm ml-1" style={{ color: 'var(--text-tertiary)' }}>/ {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaLink}
                className={plan.popular ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-tertiary)' }}>
          All tools work in your browser. No account needed for free tier.
        </p>
      </div>
    </section>
  )
}
