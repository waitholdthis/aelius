import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DISCIPLINES = [
  'Data Scientists',
  'Computer Engineers',
  'Subject Matter Experts',
]

const SME_TAGS = [
  'Virtual Reality',
  '3D Mapping',
  'Autonomy',
  'Digital Communications',
  'Software Development',
]

const BENEFITS = [
  'Competitive compensation',
  'Relocation assistance',
  'Health, dental & vision — company-paid',
  'Life, disability & accident coverage — company-paid',
  '401(k) with employer matching',
  'Tuition assistance program',
  'Employee Assistance Program',
  'Paid time off & federal holidays',
  'Employee referral bonuses',
  'Performance bonuses & raises',
  'Company events and outings',
  'Internship opportunities',
]

const EEO = `AELIUS Exploitation Technologies, LLC is an equal opportunity employer. Qualified applicants are considered for positions without regard to race, color, religion, sex, sexual orientation, gender identity or expression, pregnancy, age, national origin, marital or disability status, genetic information, protected veteran status, or any other characteristics protected by federal, state, or local law.`

export default function Careers() {
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' })

  return (
    <section id="careers" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Ghost "SERVE." atmospheric display text */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display whitespace-nowrap leading-none text-arctic/[0.018] pl-[4%]"
          style={{ fontSize: 'clamp(7rem, 26vw, 28rem)' }}
        >
          SERVE.
        </span>
      </div>

      {/* Navy tint + gradient overlay */}
      <div className="absolute inset-0 bg-navy/25" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/55 via-transparent to-void/55"
      />

      <div ref={headRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="label-tag tracking-[0.25em] mb-12 block"
        >
          // Join Our Team
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 44 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.93] text-arctic mb-6"
        >
          WE SELECT
          <br />
          <span className="text-brass">THE EXCEPTIONAL.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-body text-arctic/52 text-base md:text-lg max-w-2xl leading-[1.85] mb-14"
        >
          AELIUS runs on high-trust teams with radical ownership and an
          unconditional bias toward action. We don't fill seats — we build
          squads. If that sounds like you, we want to hear from you.
        </motion.p>

        <div className="brass-divider mb-14 opacity-35" />

        {/* Two-column body */}
        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 mb-16">

          {/* Left: What we're looking for */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div className="font-code text-[0.62rem] text-brass/60 tracking-[0.24em] uppercase mb-7">
                We're looking for
              </div>

              {/* Primary disciplines */}
              <ul className="space-y-4 mb-10" aria-label="Disciplines we hire">
                {DISCIPLINES.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -16 }}
                    animate={bodyInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.08 + i * 0.09, duration: 0.45, ease: 'easeOut' }}
                    className="flex items-center gap-4"
                  >
                    <span className="flex-shrink-0 w-5 h-px bg-signal/60" aria-hidden="true" />
                    <span className="font-heading font-semibold text-base text-arctic tracking-[0.06em]">
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* SME specialty tags */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.38, duration: 0.48 }}
              >
                <div className="font-code text-[0.58rem] text-arctic/30 tracking-[0.2em] uppercase mb-4">
                  SME specializations
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {SME_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="font-heading text-[0.68rem] font-medium tracking-[0.08em] uppercase px-3.5 py-1.5 border border-signal/22 text-signal/70 bg-signal/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Benefits */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.55, ease: 'easeOut' }}
            >
              <div className="font-code text-[0.62rem] text-brass/60 tracking-[0.24em] uppercase mb-7">
                What you get
              </div>

              <ul className="grid grid-cols-1 gap-3" aria-label="Benefits">
                {BENEFITS.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0 }}
                    animate={bodyInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.28 + i * 0.04, duration: 0.38 }}
                    className="flex items-start gap-3"
                  >
                    {/* Brass tick */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="flex-shrink-0 mt-[3px] w-3 h-3 text-brass/65"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="1.5 6 4.5 9 10.5 3" />
                    </svg>
                    <span className="font-body text-arctic/52 text-sm leading-[1.7]">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-5 mb-14"
        >
          <a
            href="mailto:contact@aeliustech.com"
            className="font-heading text-sm font-semibold tracking-[0.1em] uppercase px-10 py-4 bg-brass text-void border border-brass hover:bg-transparent hover:text-brass transition-all duration-200 w-full sm:w-auto text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Submit Your Resume
          </a>
          <a
            href="mailto:contact@aeliustech.com"
            className="font-heading text-sm font-medium tracking-[0.09em] uppercase text-arctic/42 hover:text-signal transition-colors duration-200 focus-visible:outline-none focus-visible:text-signal"
          >
            General Inquiries →
          </a>
        </motion.div>

        {/* EEO statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={bodyInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="border-t border-white/[0.05] pt-8"
        >
          <p className="font-code text-[0.58rem] text-arctic/22 tracking-[0.1em] leading-[1.85] max-w-4xl">
            {EEO}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
