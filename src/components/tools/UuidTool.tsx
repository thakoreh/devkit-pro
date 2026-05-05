'use client'

import { useState } from 'react'

function generateUUIDv4(): string {
  const hex = () => Math.floor(Math.random() * 16).toString(16)
  const section = (n: number) => Array.from({ length: n }, () => hex()).join('')
  return `${section(8)}-${section(4)}-4${section(3)}-${['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)]}${section(3)}-${section(12)}`
}

export default function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'no-dash' | 'braces'>('standard')

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUIDv4())
    setUuids(newUuids)
  }

  const formatUuid = (uuid: string) => {
    switch (format) {
      case 'uppercase': return uuid.toUpperCase()
      case 'no-dash': return uuid.replace(/-/g, '')
      case 'braces': return `{${uuid}}`
      default: return uuid
    }
  }

  const copyAll = () => navigator.clipboard.writeText(uuids.map(formatUuid).join('\n'))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <button onClick={generate} className="btn-primary">Generate UUIDs</button>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Count:</label>
          <select value={count} onChange={e => setCount(Number(e.target.value))} className="input-area !min-h-0 !py-1 !px-2 !w-16 text-sm">
            {[1, 5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Format:</label>
          <select value={format} onChange={e => setFormat(e.target.value as typeof format)} className="input-area !min-h-0 !py-1 !px-2 !w-32 text-sm">
            <option value="standard">Standard</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="no-dash">No dashes</option>
            <option value="braces">{'{Braces}'}</option>
          </select>
        </div>
        {uuids.length > 0 && (
          <button onClick={copyAll} className="btn-secondary ml-auto">📋 Copy All</button>
        )}
      </div>
      {uuids.length > 0 && (
        <div className="output-area space-y-1" style={{ minHeight: 'auto' }}>
          {uuids.map((uuid, i) => (
            <div key={i} className="flex justify-between items-center group py-1">
              <code className="text-sm" style={{ color: 'var(--accent)' }}>{formatUuid(uuid)}</code>
              <button onClick={() => navigator.clipboard.writeText(formatUuid(uuid))} className="btn-copy text-xs opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
