import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterGlitch from './LetterGlitch'

const DURATION = 5000
const EXIT_MS  = 800

export default function Intro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => { document.body.style.overflow = ''; window.scrollTo(0, 0) }, EXIT_MS)
    }, DURATION)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200]"
          aria-hidden="true"
        >
          <LetterGlitch
            glitchColors={['#0D1B2A', '#C8A96E', '#00B4D8']}
            glitchSpeed={45}
            outerVignette={true}
            smooth={true}
          />

          {/* Centered logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src="/logo.png"
              alt="AELIUS"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="h-48 w-auto"
              style={{
                filter:
                  'drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 16px rgba(255,255,255,0.5)) brightness(1.3)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
