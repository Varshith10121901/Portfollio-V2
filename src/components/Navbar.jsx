import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const navItems = [
    { label: 'Console', href: '#home' },
    { label: 'Summary', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          <svg className="terminal-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" className="terminal-cursor" />
          </svg>
          <span className="vk-logo-text">Varshith</span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
          {/* Theme Toggle Button */}
          <li>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              aria-label="Toggle light/dark theme"
            >
              {theme === 'light' ? (
                /* Moon Icon for Light Mode -> toggles to Dark */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                /* Sun Icon for Dark Mode -> toggles to Light */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </li>
          <li>
            <a 
              href="https://aiasapp.me/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Launch AIAS
            </a>
          </li>
        </ul>

        {/* Hamburger Menu Toggle */}
        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <div className={`nav-mobile-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-mobile-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="nav-mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.25rem 0' }}>
              <button 
                onClick={() => {
                  toggleTheme()
                  setIsOpen(false)
                }} 
                className="theme-toggle-btn"
                style={{ width: '100%', gap: '0.5rem', borderRadius: '6px' }}
                aria-label="Toggle light/dark theme"
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </li>
            <li>
              <a
                href="https://aiasapp.me/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                Launch AIAS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
