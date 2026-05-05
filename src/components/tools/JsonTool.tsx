'use client'

import { useState } from 'react'

export default function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const sortKeys = () => {
    try {
      const parsed = JSON.parse(input)
      const sorted = sortObjectKeys(parsed)
      setOutput(JSON.stringify(sorted, null, indent))
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const sortObjectKeys = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(sortObjectKeys)
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj as Record<string, unknown>)
        .sort()
        .reduce((acc: Record<string, unknown>, key) => {
          acc[key] = sortObjectKeys((obj as Record<string, unknown>)[key])
          return acc
        }, {})
    }
    return obj
  }

  const copy = () => navigator.clipboard.writeText(output)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={format} className="btn-primary">Format</button>
        <button onClick={minify} className="btn-secondary">Minify</button>
        <button onClick={sortKeys} className="btn-secondary">Sort Keys</button>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Indent:</label>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} className="input-area !min-h-0 !py-1 !px-2 !w-16 text-sm">
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Input JSON</label>
            {input && (
              <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn-copy text-xs">Clear</button>
            )}
          </div>
          <textarea className="input-area" value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' rows={14} />
          {error && <p className="mt-2 text-sm" style={{ color: 'var(--error)' }}>❌ {error}</p>}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Output</label>
            {output && <button onClick={copy} className="btn-copy text-xs">📋 Copy</button>}
          </div>
          <div className="output-area" style={{ minHeight: 336 }}>{output}</div>
        </div>
      </div>
    </div>
  )
}
