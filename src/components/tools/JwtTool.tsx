'use client'

import { useState } from 'react'

export default function JwtTool() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<{ header: string; payload: string; signature: string } | null>(null)
  const [error, setError] = useState('')

  const decode = () => {
    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots')
      
      const decodeB64 = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        while (base64.length % 4) base64 += '='
        return JSON.parse(atob(base64))
      }

      setDecoded({
        header: JSON.stringify(decodeB64(parts[0]), null, 2),
        payload: JSON.stringify(decodeB64(parts[1]), null, 2),
        signature: parts[2],
      })
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JWT')
      setDecoded(null)
    }
  }

  const copy = (text: string) => navigator.clipboard.writeText(text)

  const payloadObj = decoded ? JSON.parse(decoded.payload) : null
  const isExpired = payloadObj?.exp ? payloadObj.exp * 1000 < Date.now() : null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={decode} className="btn-primary">Decode Token</button>
        <button onClick={() => { setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'); setError(''); setDecoded(null) }} className="btn-secondary">Load Example</button>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>JWT Token</label>
        <textarea className="input-area" value={token} onChange={e => setToken(e.target.value)} placeholder="Paste your JWT token here..." rows={4} />
        {error && <p className="mt-2 text-sm" style={{ color: 'var(--error)' }}>❌ {error}</p>}
      </div>
      {decoded && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Header (Algorithm & Token Type)</h3>
              <span className="badge">ALG</span>
            </div>
            <div className="output-area !bg-blue-50 dark:!bg-blue-950/30">{decoded.header}</div>
            <button onClick={() => copy(decoded.header)} className="btn-copy text-xs mt-2">📋 Copy Header</button>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Payload (Data)</h3>
              <div className="flex gap-2">
                {isExpired !== null && (
                  <span className={`badge ${isExpired ? '!bg-red-100 !text-red-600 dark:!bg-red-900/30 dark:!text-red-400' : '!bg-green-100 !text-green-600 dark:!bg-green-900/30 dark:!text-green-400'}`}>
                    {isExpired ? '⚠ Expired' : '✓ Valid'}
                  </span>
                )}
                <span className="badge">PAY</span>
              </div>
            </div>
            <div className="output-area !bg-green-50 dark:!bg-green-950/30">{decoded.payload}</div>
            <button onClick={() => copy(decoded.payload)} className="btn-copy text-xs mt-2">📋 Copy Payload</button>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Signature</h3>
            <div className="output-area !bg-purple-50 dark:!bg-purple-950/30" style={{ wordBreak: 'break-all' }}>{decoded.signature}</div>
          </div>
          {payloadObj?.exp && (
            <div className="tool-card p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Issued at:</span>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {payloadObj.iat ? new Date(payloadObj.iat * 1000).toLocaleString() : 'N/A'}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Expires:</span>
                  <div className="font-medium" style={{ color: isExpired ? 'var(--error)' : 'var(--success)' }}>
                    {new Date(payloadObj.exp * 1000).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
