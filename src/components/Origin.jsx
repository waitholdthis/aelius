import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE = [
  { year: '2012', text: 'Founded by US Army Veterans with one uncompromising mission.' },
  { year: '——',   text: 'SDVOSB Certified. Small team, unlimited mandate.' },
  { year: 'NOW',  text: 'Full-spectrum technology integration at enterprise scale.' },
]

const VALUES = [
  { title: 'TRUST',         body: 'The foundation.' },
  { title: 'INTEGRITY',     body: 'Non-negotiable.' },
  { title: 'MISSION FIRST', body: 'Always. Full stop.' },
]

const BODY_COPY = [
  `AELIUS takes its name from Aelius Meridius — the Roman general of the film Gladiator — a figure synonymous with loyalty, sacrifice, and the refusal to yield. In Latin, it translates to "Family of."`,
  `For our founders — US Army Veterans who brought that same ethos from the battlefield into the boardroom — the name was never a branding exercise. It was a declaration.`,
  `We are a Service-Disabled Veteran-Owned Small Business built on the principle that the hardest problems deserve the most capable people. Our culture is Special Operations by design: high trust, radical ownership, and an unconditional bias toward action.`,
  `We don't outsource accountability. We don't over-promise and under-deliver. And we don't stop when others say it can't be done.`,
]

export default function Origin() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="origin" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      {/* Ghost "FAMILY." display text — purely atmospheric */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-display whitespace-nowrap leading-none text-arctic/[0.022] pl-[4%]"
          style={{ fontSize: 'clamp(7rem, 26vw, 28rem)' }}>
          FAMILY.
        </span>
      </div>

      {/* Soft gradient overlay so ghost text doesn't compete */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="label-tag tracking-[0.25em] mb-12 block"
        >
          // Origin Protocol
        </motion.span>

        {/* Two-column layout: copy (3) + timeline (2) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 items-start">

          {/* Left: copy */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0, y: 44 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.93] text-arctic mb-10"
            >
              MORE THAN A NAME.
              <br />
              <span className="text-brass">A COVENANT.</span>
            </motion.h2>

            {BODY_COPY.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -22 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="font-body text-arctic/55 text-[0.9375rem] leading-[1.95] mb-5 last:mb-0"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right: vertical timeline */}
          <div className="lg:col-span-2 lg:pt-8">
            <div className="relative pl-8 border-l border-brass/28">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 22 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.14, duration: 0.5 }}
                  className="relative mb-10 last:mb-0"
                >
                  {/* Node */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[2.1rem] top-[0.35rem] w-[10px] h-[10px] rounded-full border-2 border-brass bg-void"
                  />
                  <div className="font-code text-[0.65rem] text-brass/65 mb-2 tracking-[0.22em] uppercase">
                    {item.year}
                  </div>
                  <p className="font-body text-arctic/50 text-sm leading-[1.85]">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="brass-divider my-16 opacity-28" />

        {/* Values strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-0">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.62 + i * 0.1, duration: 0.48 }}
              className={`text-center sm:text-left ${i > 0 ? 'sm:pl-12 sm:border-l sm:border-brass/18' : ''}`}
            >
              <div className="font-heading font-bold text-brass text-[0.72rem] tracking-[0.22em] uppercase mb-2">
                {v.title}
              </div>
              <div className="font-body text-arctic/38 text-sm">
                {v.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
