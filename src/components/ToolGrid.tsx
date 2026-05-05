'use client'

import { useState } from 'react'
import JsonTool from './tools/JsonTool'
import JwtTool from './tools/JwtTool'
import Base64Tool from './tools/Base64Tool'
import UrlTool from './tools/UrlTool'
import HashTool from './tools/HashTool'
import TimestampTool from './tools/TimestampTool'
import UuidTool from './tools/UuidTool'
import RegexTool from './tools/RegexTool'
import ColorTool from './tools/ColorTool'
import LoremTool from './tools/LoremTool'
import DiffTool from './tools/DiffTool'

const tools = [
  { id: 'json', name: 'JSON Formatter', icon: '{ }', desc: 'Format, minify, and validate JSON' },
  { id: 'jwt', name: 'JWT Decoder', icon: '🔑', desc: 'Decode and inspect JWT tokens' },
  { id: 'base64', name: 'Base64', icon: '🔤', desc: 'Encode and decode Base64 strings' },
  { id: 'url', name: 'URL Encode/Decode', icon: '🔗', desc: 'Encode and decode URLs' },
  { id: 'hash', name: 'Hash Generator', icon: '#️⃣', desc: 'MD5, SHA-1, SHA-256, SHA-512' },
  { id: 'timestamp', name: 'Timestamp', icon: '🕐', desc: 'Convert Unix timestamps' },
  { id: 'uuid', name: 'UUID Generator', icon: '🆔', desc: 'Generate UUIDs (v4)' },
  { id: 'regex', name: 'Regex Tester', icon: '✨', desc: 'Test regex with live matching' },
  { id: 'color', name: 'Color Converter', icon: '🎨', desc: 'HEX, RGB, HSL converter' },
  { id: 'lorem', name: 'Lorem Ipsum', icon: '📝', desc: 'Generate placeholder text' },
  { id: 'diff', name: 'Text Diff', icon: '📄', desc: 'Compare two texts side by side' },
]

const toolComponents: Record<string, React.ComponentType> = {
  json: JsonTool,
  jwt: JwtTool,
  base64: Base64Tool,
  url: UrlTool,
  hash: HashTool,
  timestamp: TimestampTool,
  uuid: UuidTool,
  regex: RegexTool,
  color: ColorTool,
  lorem: LoremTool,
  diff: DiffTool,
}

export default function ToolGrid() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const ActiveComponent = activeTool ? toolComponents[activeTool] : null

  return (
    <section id="tools" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {activeTool ? tools.find(t => t.id === activeTool)?.name : 'Developer Tools'}
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {activeTool ? tools.find(t => t.id === activeTool)?.desc : 'Pick a tool to get started. Everything runs in your browser — nothing is sent to a server.'}
          </p>
          {activeTool && (
            <button onClick={() => setActiveTool(null)} className="btn-secondary mt-4 text-sm">
              ← Back to all tools
            </button>
          )}
        </div>

        {activeTool && ActiveComponent ? (
          <div className="max-w-5xl mx-auto">
            <ActiveComponent />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="tool-card p-6 text-left cursor-pointer group"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{tool.name}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tool.desc}</p>
                <div className="mt-3 text-xs font-medium" style={{ color: 'var(--accent)' }}>
                  Open tool →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
