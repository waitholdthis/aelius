import { useEffect, useRef } from 'react'

/**
 * Tracks the cursor and paints a radial signal-blue glow behind all content.
 * Uses CSS custom properties for zero-jank performance on 60fps.
 * Desktop only — touch devices skip it entirely.
 */
export default function CursorSpotlight() {
  const spotlightRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (!spotlightRef.current) return
      spotlightRef.current.style.setProperty('--cx', `${e.clientX}px`)
      spotlightRef.current.style.setProperty('--cy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background:
          'radial-gradient(640px circle at var(--cx, 50%) var(--cy, 50%), rgba(0,180,216,0.055), transparent 80%)',
      }}
    />
  )
}
