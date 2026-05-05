'use client'

import { useState } from 'react'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
    case g: h = ((b - r) / d + 2) / 6; break
    case b: h = ((r - g) / d + 4) / 6; break
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorTool() {
  const [hex, setHex] = useState('#6366f1')
  const [pickerColor, setPickerColor] = useState('#6366f1')

  const rgb = hexToRgb(hex.replace('#', '').length === 6 ? hex : '')
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const formats = rgb ? [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
    { label: 'CSS', value: `--color: ${hex};` },
    { label: 'Tailwind', value: `bg-[${hex}]` },
  ] : []

  const handleHexChange = (value: string) => {
    setHex(value)
    if (/^#[0-9a-fA-F]{6}$/.test(value)) setPickerColor(value)
  }

  const handlePickerChange = (value: string) => {
    setPickerColor(value)
    setHex(value)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Pick a Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={pickerColor} onChange={e => handlePickerChange(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" />
              <div className="w-16 h-16 rounded-lg" style={{ background: hex }} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>HEX Value</label>
            <input className="input-area !min-h-0 !py-2" value={hex} onChange={e => handleHexChange(e.target.value)} placeholder="#6366f1" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Color Formats</h3>
          {formats.map(({ label, value }) => (
            <div key={label} className="tool-card p-3 flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{value}</code>
                <button onClick={() => navigator.clipboard.writeText(value)} className="btn-copy text-xs">📋</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shades */}
      {rgb && hsl && (
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Shades</h3>
          <div className="flex rounded-lg overflow-hidden h-12">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100].map(l => (
              <div key={l} className="flex-1 cursor-pointer group relative" style={{ background: `hsl(${hsl.h}, ${hsl.s}%, ${l}%)` }} onClick={() => {
                navigator.clipboard.writeText(`hsl(${hsl.h}, ${hsl.s}%, ${l}%)`)
              }}>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100" style={{ color: l > 50 ? '#000' : '#fff' }}>{l}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
