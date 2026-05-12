import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

/* ── Animated stat counter ── */
function StatItem({ value, suffix, label, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (value === 0) { setCount(0); return }
    let current = 0
    const step  = value / (2000 / 16)
    const id    = setInterval(() => {
      current = Math.min(current + step, value)
      setCount(Math.floor(current))
      if (current >= value) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [inView, value])

  return (
    <div className="text-center">
      <div className="font-code text-2xl font-medium text-arctic tracking-wider">
        <span className="text-brass">{count}</span>
        {suffix}
      </div>
      <div className="stat-label mt-1.5">{label}</div>
    </div>
  )
}

/* ── 3-D tilt card (skill rule: 3D card tilt on hover) ── */
function TiltCard({ icon, title, body, link, delay }) {
  const cardRef  = useRef(null)
  const wrapRef  = useRef(null)
  const inView   = useInView(wrapRef, { once: true, margin: '-60px' })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useTransform(my, [-0.5, 0.5], [ 7, -7])
  const rotY = useTransform(mx, [-0.5, 0.5], [-7,  7])
  const sRX  = useSpring(rotX, { damping: 22, stiffness: 220 })
  const sRY  = useSpring(rotY, { damping: 22, stiffness: 220 })

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: sRX, rotateY: sRY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="glass-card rounded-sm p-8 h-full group hover:-translate-y-1.5 transition-transform duration-300 cursor-default"
      >
        {/* Icon */}
        <div className="w-9 h-9 mb-6 text-signal" aria-hidden="true">
          {icon}
        </div>

        {/* Heading */}
        <h3 className="font-heading font-bold text-xl text-arctic mb-3 tracking-wide">
          {title}
        </h3>

        {/* Body */}
        <p className="font-body text-arctic/52 text-sm leading-[1.9] mb-7">
          {body}
        </p>

        {/* Link */}
        <a
          href="#"
          className="inline-block font-heading text-xs font-medium tracking-[0.18em] uppercase text-signal/65 hover:text-signal transition-all duration-200 group-hover:translate-x-1 focus-visible:outline-none focus-visible:text-signal"
        >
          {link} →
        </a>
      </motion.div>
    </motion.div>
  )
}

/* ── Icon SVGs (line-art, consistent 1.5 stroke) ── */
const IconNetwork = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="4"  cy="6"  r="1.5" />
    <circle cx="20" cy="6"  r="1.5" />
    <circle cx="4"  cy="18" r="1.5" />
    <circle cx="20" cy="18" r="1.5" />
    <line x1="9.8"  y1="10.7" x2="5.4"  y2="7.2" />
    <line x1="14.2" y1="10.7" x2="18.6" y2="7.2" />
    <line x1="9.8"  y1="13.3" x2="5.4"  y2="16.8" />
    <line x1="14.2" y1="13.3" x2="18.6" y2="16.8" />
  </svg>
)

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconIntegrate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
  </svg>
)

const CAPABILITIES = [
  {
    icon: <IconNetwork />,
    title: 'INTELLIGENCE AT SCALE',
    body: "We extract decisive insight from complex, high-volume data environments. Our analysts don't just process information — they weaponize it into operational clarity.",
    link: 'Deep Dive',
  },
  {
    icon: <IconBolt />,
    title: 'BUILT FAST. BUILT RIGHT.',
    body: "When the mission can't wait for a three-year cycle, AELIUS deploys proven rapid-prototyping methodologies to deliver production-grade technology — on timeline, on target.",
    link: 'See Our Process',
  },
  {
    icon: <IconIntegrate />,
    title: 'SEAMLESS. LETHAL. INTEGRATED.',
    body: 'We specialize in fusing cutting-edge commercial technology into existing government and enterprise ecosystems — eliminating the friction between what exists and what\'s needed.',
    link: 'View Portfolio',
  },
]

const STATS = [
  { value: 12,  suffix: '+',  label: 'Years Operational'   },
  { value: 100, suffix: '%',  label: 'SDVOSB Certified'    },
  { value: 0,   suffix: '',   label: 'Failed Deliveries'   },
]

export default function Capabilities() {
  const sectionRef = useRef(null)
  const statsRef   = useRef(null)
  const sectionIn  = useInView(sectionRef, { once: true, margin: '-80px' })
  const statsIn    = useInView(statsRef,   { once: true, margin: '-40px' })

  return (
    <section id="capabilities" className="relative py-16 lg:py-36">
      {/* Subtle navy tint */}
      <div className="absolute inset-0 bg-navy/20" aria-hidden="true" />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-10 sm:mb-20"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-0 sm:gap-0">
              <StatItem {...s} inView={statsIn} />
              {i < STATS.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-brass/25 mx-10" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={sectionIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="label-tag tracking-[0.25em] mb-5 block"
          >
            // Capability Architecture
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={sectionIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.93] text-arctic"
          >
            WHERE INTELLIGENCE
            <br />
            <span className="text-brass">MEETS EXECUTION.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-body text-arctic/52 text-base md:text-lg max-w-2xl mx-auto mt-7 leading-[1.85]"
          >
            We don't consult. We solve. AELIUS delivers specialized big data
            analysis, rapid-cycle development, and seamless integration —
            directly to the teams who cannot afford to wait.
          </motion.p>
        </div>

        <div className="brass-divider mb-14 opacity-35" />

        {/* Capability cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CAPABILITIES.map((cap, i) => (
            <TiltCard key={cap.title} {...cap} delay={i * 0.11} />
          ))}
        </div>
      </div>
    </section>
  )
}
