import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Specialties',  href: '#specialties'  },
  { label: 'Origin',       href: '#origin'       },
  { label: 'Careers',      href: '#careers'      },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Sticky bar ── */}
      <nav
        role="navigation"
        aria-label="Main"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:           scrolled ? 'rgba(4,10,15,0.88)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(24px)'         : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)'         : 'none',
          borderBottom:         scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center hover:opacity-80 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            aria-label="AELIUS Exploitation Technologies — home"
          >
            <img
              src="/logo.png"
              alt="AELIUS Exploitation Technologies"
              className="h-11 w-auto"
              style={{
                filter:
                  'drop-shadow(0 0 1px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.35)) brightness(1.2)',
              }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative font-heading text-sm font-medium text-arctic/60 tracking-[0.12em] uppercase hover:text-signal transition-colors duration-200 group focus-visible:outline-none focus-visible:text-signal"
              >
                {label}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-signal transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="font-heading text-sm font-semibold tracking-[0.1em] uppercase px-5 py-2 border border-brass/60 text-brass hover:bg-brass hover:text-void transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger — min 44×44px touch target (skill rule: touch-target-size) */}
          <button
            className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-0.5 bg-arctic origin-center transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-arctic transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-arctic origin-center transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-void/96 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center gap-9">
              {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl text-arctic/80 tracking-widest hover:text-brass transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
