'use client'

import { useState, useMemo } from 'react'

export default function RegexTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [error, setError] = useState('')

  const result = useMemo(() => {
    if (!pattern || !testString) return null
    try {
      const regex = new RegExp(pattern, flags)
      const matches: { match: string; index: number; groups: string[] }[] = []
      let match: RegExpExecArray | null
      
      if (flags.includes('g')) {
        const re = new RegExp(pattern, flags)
        while ((match = re.exec(testString)) !== null) {
          matches.push({ match: match[0], index: match.index, groups: match.slice(1) })
          if (!match[0]) break // prevent infinite loop
        }
      } else {
        match = regex.exec(testString)
        if (match) {
          matches.push({ match: match[0], index: match.index, groups: match.slice(1) })
        }
      }
      setError('')
      return { matches, total: testString.length }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid regex')
      return null
    }
  }, [pattern, flags, testString])

  const highlighted = useMemo(() => {
    if (!pattern || !testString || error) return testString
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const parts: { text: string; isMatch: boolean }[] = []
      let lastIndex = 0
      let match: RegExpExecArray | null
      while ((match = regex.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false })
        }
        parts.push({ text: match[0], isMatch: true })
        lastIndex = match.index + match[0].length
        if (!match[0]) break
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false })
      }
      return parts
    } catch {
      return testString
    }
  }, [pattern, flags, testString, error])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-0">
            <span className="px-3 py-2 rounded-l-lg text-sm font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRight: 'none' }}>/</span>
            <input className="input-area !min-h-0 !py-2 !rounded-l-none flex-1" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Enter regex pattern..." />
            <span className="px-3 py-2 text-sm font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderLeft: 'none', borderRight: 'none' }}>/</span>
            <input className="input-area !min-h-0 !py-2 !rounded-none !w-16 text-center" value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Test String</label>
          <textarea className="input-area" value={testString} onChange={e => setTestString(e.target.value)} placeholder="Enter text to test against..." rows={8} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Highlighted Matches</label>
          <div className="output-area" style={{ minHeight: 200 }}>
            {typeof highlighted === 'string' ? highlighted : highlighted.map((part, i) => (
              <span key={i} style={{ backgroundColor: part.isMatch ? 'var(--accent-light)' : 'transparent', color: part.isMatch ? 'var(--accent)' : 'inherit', padding: part.isMatch ? '1px 2px' : 0, borderRadius: 2 }}>
                {part.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-sm" style={{ color: 'var(--error)' }}>❌ {error}</p>}

      {result && result.matches.length > 0 && (
        <div className="tool-card p-4">
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            Matches ({result.matches.length})
          </h3>
          <div className="space-y-2">
            {result.matches.map((m, i) => (
              <div key={i} className="flex items-center gap-3 text-sm p-2 rounded" style={{ background: 'var(--bg-secondary)' }}>
                <span className="font-mono" style={{ color: 'var(--text-tertiary)' }}>#{i + 1}</span>
                <code className="font-semibold" style={{ color: 'var(--accent)' }}>&quot;{m.match}&quot;</code>
                <span style={{ color: 'var(--text-tertiary)' }}>at index {m.index}</span>
                {m.groups.length > 0 && (
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    groups: [{m.groups.map(g => `"${g}"`).join(', ')}]
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tool-card p-4">
        <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Quick Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {[
            ['.', 'Any character'], ['^', 'Start of string'], ['$', 'End of string'],
            ['*', 'Zero or more'], ['+', 'One or more'], ['?', 'Zero or one'],
            ['\\d', 'Digit [0-9]'], ['\\w', 'Word char [a-zA-Z0-9_]'], ['\\s', 'Whitespace'],
            ['[abc]', 'Character set'], ['(a|b)', 'Alternation'], ['(?&lt;name&gt;)', 'Named group'],
          ].map(([sym, desc]) => (
            <div key={sym} className="flex items-center gap-2 p-1.5 rounded" style={{ background: 'var(--bg-secondary)' }}>
              <code className="font-mono font-semibold" style={{ color: 'var(--accent)' }}>{sym}</code>
              <span style={{ color: 'var(--text-secondary)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
