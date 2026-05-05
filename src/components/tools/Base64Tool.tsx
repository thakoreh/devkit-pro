'use client'

import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
      setError('')
    } catch {
      setError(mode === 'encode' ? 'Failed to encode' : 'Invalid Base64 string')
      setOutput('')
    }
  }

  const copy = () => navigator.clipboard.writeText(output)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setMode('encode'); setOutput(''); setError('') }} className={mode === 'encode' ? 'btn-primary' : 'btn-secondary'}>
          Encode →
        </button>
        <button onClick={() => { setMode('decode'); setOutput(''); setError('') }} className={mode === 'decode' ? 'btn-primary' : 'btn-secondary'}>
          ← Decode
        </button>
        <button onClick={process} className="btn-primary ml-auto">
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <textarea className="input-area" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} rows={10} />
          {error && <p className="mt-2 text-sm" style={{ color: 'var(--error)' }}>❌ {error}</p>}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && <button onClick={copy} className="btn-copy text-xs">📋 Copy</button>}
          </div>
          <div className="output-area" style={{ minHeight: 240 }}>{output}</div>
        </div>
      </div>
    </div>
  )
}
