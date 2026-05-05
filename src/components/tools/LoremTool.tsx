'use client'

import { useState } from 'react'

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function generateWords(count: number): string {
  const words: string[] = []
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
  }
  return words.join(' ')
}

function generateParagraphs(count: number, sentencesPerParagraph: number): string {
  const paragraphs: string[] = []
  for (let p = 0; p < count; p++) {
    const sentences: string[] = []
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const wordCount = 8 + Math.floor(Math.random() * 12)
      let sentence = generateWords(wordCount)
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
      sentences.push(sentence)
    }
    paragraphs.push(sentences.join(' '))
  }
  return paragraphs.join('\n\n')
}

function generateSentences(count: number): string {
  const sentences: string[] = []
  for (let s = 0; s < count; s++) {
    const wordCount = 8 + Math.floor(Math.random() * 12)
    let sentence = generateWords(wordCount)
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
    sentences.push(sentence)
  }
  return sentences.join(' ')
}

export default function LoremTool() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')

  const generate = () => {
    let result = ''
    switch (type) {
      case 'paragraphs': result = generateParagraphs(count, 4 + Math.floor(Math.random() * 3)); break
      case 'sentences': result = generateSentences(count); break
      case 'words': result = generateWords(count); break
    }
    if (startWithLorem && result.length > 0) {
      result = 'Lorem ipsum dolor sit amet, ' + result.slice(result.indexOf(' ') + 1)
    }
    setOutput(result)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <button onClick={generate} className="btn-primary">Generate</button>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Type:</label>
          <select value={type} onChange={e => setType(e.target.value as typeof type)} className="input-area !min-h-0 !py-1 !px-2 !w-32 text-sm">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Count:</label>
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="input-area !min-h-0 !py-1 !w-16 text-sm text-center" />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} className="rounded" />
          Start with &quot;Lorem ipsum...&quot;
        </label>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary ml-auto">📋 Copy All</button>
        )}
      </div>
      {output && (
        <div className="output-area whitespace-pre-wrap" style={{ minHeight: 200, lineHeight: 1.8 }}>{output}</div>
      )}
    </div>
  )
}
