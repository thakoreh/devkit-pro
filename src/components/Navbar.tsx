'use client'

import { useState } from 'react'
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react'

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>DevKit <span className="gradient-text">Pro</span></span>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            <a href="#tools" className="nav-link">Tools</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="btn-copy flex items-center gap-1" aria-label="Toggle theme">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="#tools" className="btn-primary hidden sm:inline-flex">Get Started Free</a>
            <button className="md:hidden btn-copy" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
          <a href="#tools" className="block nav-link mb-1" onClick={() => setMenuOpen(false)}>Tools</a>
          <a href="#features" className="block nav-link mb-1" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#pricing" className="block nav-link mb-1" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" className="block nav-link" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
      )}
    </nav>
  )
}
