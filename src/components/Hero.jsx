import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const HEADLINE = ['ENGINEERED', 'FOR THE', 'IMPOSSIBLE.']

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.55 } },
}

const word = {
  hidden:  { opacity: 0, y: 52, filter: 'blur(5px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const videoRef = useRef(null)

  // Respect prefers-reduced-motion: pause video if user opts out of motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = (e) => {
      if (!videoRef.current) return
      e.matches ? videoRef.current.pause() : videoRef.current.play()
    }
    if (mq.matches) videoRef.current?.pause()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        src={`${import.meta.env.BASE_URL}Aelius.mp4`}
      />

      {/* Base darkening layer so text always reads over any video content */}
      <div aria-hidden="true" className="absolute inset-0 bg-void/52" />

      {/* Vertical gradient: transparent → void (smooth section transition at bottom) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void"
      />
      {/* Side vignettes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60"
      />
      {/* Subtle dot-matrix grain for cinematic texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(232,237,242,0.9) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Copy ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="label-tag tracking-[0.3em] mb-8 block"
        >
          // Aelius Exploitation Technologies
        </motion.span>

        <h1 className="sr-only">
          Engineered for the Impossible — AELIUS Exploitation Technologies
        </h1>

        {/* Kinetic stamp headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
          className="font-display text-[clamp(3.8rem,13.5vw,13.5rem)] leading-[0.92] text-arctic mb-7"
        >
          {HEADLINE.map((line, i) => (
            <motion.span key={i} variants={word} className="block">
              {line}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated brass rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="brass-divider max-w-[18rem] mx-auto mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 0.55, ease: 'easeOut' }}
          className="font-body text-arctic/55 text-base md:text-lg max-w-2xl mx-auto leading-[1.85] mb-11"
        >
          AELIUS bridges the gap between the world's most demanding operators
          and the engineers who redefine what's achievable. When conventional
          thinking reaches its limit — we're already past it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.46, duration: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#capabilities"
            className="font-heading text-sm font-semibold tracking-[0.1em] uppercase px-9 py-3.5 bg-brass text-void border border-brass hover:bg-transparent hover:text-brass transition-all duration-200 w-full sm:w-auto text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Explore the Mission
          </a>
          <a
            href="#capabilities"
            className="font-heading text-sm font-medium tracking-[0.09em] uppercase text-arctic/45 hover:text-signal transition-colors duration-200 focus-visible:outline-none focus-visible:text-signal"
          >
            View Capabilities ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-11 bg-gradient-to-b from-transparent to-brass/55 animate-scroll-bounce" />
        <span className="font-code text-[9px] text-arctic/25 tracking-[0.25em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
