'use client'

import { useState, useMemo } from 'react'

export default function DiffTool() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')

  const diff = useMemo(() => {
    if (!textA && !textB) return []
    const linesA = textA.split('\n')
    const linesB = textB.split('\n')
    const maxLen = Math.max(linesA.length, linesB.length)
    const result: { lineA: string; lineB: string; type: 'same' | 'changed' | 'added' | 'removed'; lineNum: number }[] = []
    
    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i] ?? ''
      const b = linesB[i] ?? ''
      
      if (a === b) {
        result.push({ lineA: a, lineB: b, type: 'same', lineNum: i + 1 })
      } else if (!a && b) {
        result.push({ lineA: a, lineB: b, type: 'added', lineNum: i + 1 })
      } else if (a && !b) {
        result.push({ lineA: a, lineB: b, type: 'removed', lineNum: i + 1 })
      } else {
        result.push({ lineA: a, lineB: b, type: 'changed', lineNum: i + 1 })
      }
    }
    return result
  }, [textA, textB])

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'added' || d.type === 'changed').length
    const removed = diff.filter(d => d.type === 'removed' || d.type === 'changed').length
    const same = diff.filter(d => d.type === 'same').length
    return { added, removed, same, total: diff.length }
  }, [diff])

  const loadExample = () => {
    setTextA(`function hello() {
  console.log("Hello");
  return true;
}

function add(a, b) {
  return a + b;
}`)
    setTextB(`function hello(name) {
  console.log("Hello, " + name);
  return true;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={loadExample} className="btn-secondary">Load Example</button>
        <button onClick={() => { setTextA(''); setTextB('') }} className="btn-secondary">Clear</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Original Text</label>
          <textarea className="input-area" value={textA} onChange={e => setTextA(e.target.value)} placeholder="Paste original text..." rows={12} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Modified Text</label>
          <textarea className="input-area" value={textB} onChange={e => setTextB(e.target.value)} placeholder="Paste modified text..." rows={12} />
        </div>
      </div>

      {diff.length > 0 && (textA || textB) && (
        <>
          <div className="flex gap-4 text-sm">
            <span className="badge !bg-green-100 !text-green-600 dark:!bg-green-900/30 dark:!text-green-400">+ {stats.added} changed/added</span>
            <span className="badge !bg-red-100 !text-red-600 dark:!bg-red-900/30 dark:!text-red-400">- {stats.removed} changed/removed</span>
            <span className="badge">= {stats.same} unchanged</span>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[40px_1fr_1fr] gap-0 text-xs font-mono" style={{ minWidth: 600 }}>
              <div className="p-2 font-semibold" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>#</div>
              <div className="p-2 font-semibold" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>Original</div>
              <div className="p-2 font-semibold" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>Modified</div>
              {diff.map((d, i) => (
                <>
                  <div key={`n-${i}`} className="p-2 text-center" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>{d.lineNum}</div>
                  <div key={`a-${i}`} className="p-2 whitespace-pre" style={{
                    background: d.type === 'removed' ? 'rgba(239,68,68,0.1)' : d.type === 'changed' ? 'rgba(239,68,68,0.1)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                    color: d.type === 'same' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                  }}>{d.lineA}</div>
                  <div key={`b-${i}`} className="p-2 whitespace-pre" style={{
                    background: d.type === 'added' ? 'rgba(16,185,129,0.1)' : d.type === 'changed' ? 'rgba(16,185,129,0.1)' : 'transparent',
                    borderBottom: '1px solid var(--border)',
                    color: d.type === 'same' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                  }}>{d.lineB}</div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
