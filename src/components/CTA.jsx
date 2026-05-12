import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useParticles } from '../hooks/useParticles'

const LINES = ['THE MISSION', "DOESN'T WAIT."]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const line = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function CTA() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  useParticles(canvasRef, { count: 32, rgb: '200,169,110', linkDist: 110 })
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-28 overflow-hidden bg-void"
    >
      {/* Sparse particle canvas (meditative pace vs hero density) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-55"
      />

      {/* Radial darkening vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, rgba(4,10,15,0.92) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="label-tag tracking-[0.28em] mb-8 block"
        >
          // Initiate Contact
        </motion.span>

        <h2 className="sr-only">The Mission Doesn't Wait — Contact AELIUS</h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          aria-hidden="true"
          className="font-display text-[clamp(3.2rem,11vw,11rem)] leading-[0.92] text-arctic mb-8"
        >
          {LINES.map((l, i) => (
            <motion.span key={i} variants={line} className="block">
              {l}
            </motion.span>
          ))}
        </motion.div>

        <div className="brass-divider max-w-[14rem] mx-auto mb-8 opacity-45" />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="font-body text-arctic/52 text-base md:text-lg max-w-xl mx-auto leading-[1.85] mb-12"
        >
          Whether you're facing an unsolvable data challenge, a technology
          integration gap, or a development timeline that no one else will
          commit to — AELIUS is ready. Tell us yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.52, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
        >
          <a
            href="mailto:info@aeliustech.com"
            className="font-heading text-sm font-semibold tracking-[0.1em] uppercase px-10 py-4 bg-brass text-void border border-brass hover:bg-transparent hover:text-brass transition-all duration-200 w-full sm:w-auto text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Send Secure Transmission
          </a>
          <a
            href="#careers"
            className="font-heading text-sm font-medium tracking-[0.09em] uppercase text-arctic/42 hover:text-signal transition-colors duration-200 focus-visible:outline-none focus-visible:text-signal"
          >
            Explore Careers at AELIUS →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.68, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-code text-[0.62rem] text-arctic/28 tracking-[0.14em] uppercase"
        >
          <a href="mailto:info@aeliustech.com" className="hover:text-brass/60 transition-colors duration-200">
            info@aeliustech.com
          </a>
          <span className="hidden sm:block text-brass/20" aria-hidden="true">|</span>
          <a href="mailto:media@aeliustech.com" className="hover:text-brass/60 transition-colors duration-200">
            media@aeliustech.com
          </a>
          <span className="hidden sm:block text-brass/20" aria-hidden="true">|</span>
          <span>8150 Leesburg Pike, Ste. 810 · Vienna, VA 22182</span>
        </motion.div>
      </div>
    </section>
  )
}
