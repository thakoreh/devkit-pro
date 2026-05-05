'use client'

import { useState, useEffect } from 'react'

export default function TimestampTool() {
  const [timestampInput, setTimestampInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000))
  const [result, setResult] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(interval)
  }, [])

  const fromTimestamp = () => {
    try {
      let ts = Number(timestampInput)
      if (ts > 1e12) ts = Math.floor(ts / 1000) // ms -> s
      const d = new Date(ts * 1000)
      setResult({
        'UTC': d.toUTCString(),
        'ISO 8601': d.toISOString(),
        'Local': d.toLocaleString(),
        'Relative': getRelative(d),
        'Unix (seconds)': String(Math.floor(ts)),
        'Unix (milliseconds)': String(ts * 1000),
      })
    } catch {
      setResult({ error: 'Invalid timestamp' })
    }
  }

  const fromDate = () => {
    try {
      const d = new Date(dateInput)
      setResult({
        'Unix (seconds)': String(Math.floor(d.getTime() / 1000)),
        'Unix (milliseconds)': String(d.getTime()),
        'UTC': d.toUTCString(),
        'ISO 8601': d.toISOString(),
      })
    } catch {
      setResult({ error: 'Invalid date' })
    }
  }

  const getRelative = (d: Date): string => {
    const now = Date.now()
    const diff = now - d.getTime()
    const abs = Math.abs(diff)
    const suffix = diff > 0 ? 'ago' : 'from now'
    if (abs < 60000) return `${Math.floor(abs / 1000)} seconds ${suffix}`
    if (abs < 3600000) return `${Math.floor(abs / 60000)} minutes ${suffix}`
    if (abs < 86400000) return `${Math.floor(abs / 3600000)} hours ${suffix}`
    return `${Math.floor(abs / 86400000)} days ${suffix}`
  }

  const setCurrent = () => {
    setTimestampInput(String(currentTime))
    const d = new Date()
    setDateInput(d.toISOString().slice(0, 16))
  }

  return (
    <div className="space-y-6">
      <div className="tool-card p-4 text-center">
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Current Unix Timestamp</div>
        <div className="text-3xl font-mono font-bold gradient-text">{currentTime}</div>
        <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{new Date().toISOString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Timestamp → Date</h3>
          <div className="flex gap-2">
            <input className="input-area !min-h-0 !py-2 flex-1" value={timestampInput} onChange={e => setTimestampInput(e.target.value)} placeholder="e.g. 1700000000" />
            <button onClick={fromTimestamp} className="btn-primary whitespace-nowrap">Convert</button>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Date → Timestamp</h3>
          <div className="flex gap-2">
            <input type="datetime-local" className="input-area !min-h-0 !py-2 flex-1" value={dateInput} onChange={e => setDateInput(e.target.value)} />
            <button onClick={fromDate} className="btn-primary whitespace-nowrap">Convert</button>
          </div>
        </div>
      </div>

      <button onClick={setCurrent} className="btn-secondary text-sm">Use Current Time</button>

      {result && (
        <div className="space-y-2">
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="tool-card p-3 flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{key}</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{value}</code>
                <button onClick={() => navigator.clipboard.writeText(value)} className="btn-copy text-xs">📋</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
