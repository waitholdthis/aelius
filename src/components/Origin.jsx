import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const MODALS = [
  {
    label: 'Leadership Vision',
    content: `AELIUS leverages decades of unique expertise, methodologies, and processes that anticipate the complexity and constant evolution of information age technologies and rapidly integrates them into user-defined tailored solutions that ensures our customers' and war fighters' continued dominance and technological competitive edge. Our products and services combine and rapidly integrate breakthrough technologies that are tailored, flexible, and survivable – exactly what you would expect from a hand-picked team of world-class technologists, operators, and specialized engineers.`,
  },
  {
    label: 'Mission Statement',
    content: `Be the most trusted "go-to" partner that rapidly delivers specialized products, integrated solutions, and professional services focused on niche, secure, and deployable cutting-edge technologies. When others say it can't be done, we prove otherwise.`,
  },
  {
    label: 'Company History',
    content: `AELIUS is a Service-Disabled Veteran-Owned Small Business (SDVOSB) established in 2012 to fill a gap in defense contracting – that of niche specialized research, rapid development, and advanced technology integration. In the past, there have been few vendors / companies positioned well enough to understand the inner workings and core tasks of combatant commands at the unit and operator level, to be able to simultaneously translate that accurately to a uniquely-skilled set of engineers, and then direct and manage the same group of hand-picked engineers and computer scientists in the research and development of the new capability. AELIUS does exactly that. We work directly with the end-user operators, manage the core development teams and partners, and further provide the subject matter expertise and training to ensure delivery, integration with legacy capabilities, and customer satisfaction.`,
  },
  {
    label: 'Company Values',
    content: `The AELIUS team members come with extensive experience either as senior Defense Program Managers, Engineers, or as Operators within our most coveted specialized mission units. Our personnel are at the top of their field. AELIUS is formed around the ethos of trust, integrity, and a high energy, can-do-anything Special Operations mentality. The AELIUS team possesses rare, highly-valued expertise in transitioning sensitive technologies from research and development to deployed operations (from the cradle to the grave). Furthermore, we provide expert program management and technology integrators to customers who require cutting-edge technologies that must be tailored to match their distinctive mission requirements and specific operating environments. We accomplish this with world-class engineering teams and vetted partners, creating solutions for our customers' hardest problems. We are well known and trusted partners within this unique community. Where failure is not an option or when the odds are against us, AELIUS is there to solve our customer's toughest problems.`,
  },
  {
    label: 'Company Culture',
    content: `AELIUS fosters an inclusive, collaborative, and agile workspace focused on innovative solutions to solve our customers' most challenging and complex problem sets. Our strength is in our motivated and highly skilled team who come from all walks of life. As a member of our team, we inspire creativity, ingenuity, and hard work and empower individual potential in a dream job atmosphere. There are no limitations to what you can achieve at AELIUS, only unlimited possibilities.`,
  },
  {
    label: 'Community',
    content: `With team members and their families living and working across the country, AELIUS recognizes the value of building continuity between small businesses and local communities. AELIUS fosters and strengthens those community relationships by supporting local school programs in athletics, STEM, and the performing arts.`,
  },
]

function Modal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[150] flex items-center justify-center px-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" aria-hidden="true" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-navy/70 border border-white/[0.07] p-8 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-arctic/35 hover:text-arctic transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        {/* Label */}
        <div className="font-code text-[0.58rem] text-brass/55 tracking-[0.28em] uppercase mb-4">
          // AELIUS
        </div>

        {/* Title */}
        <h3
          id="modal-title"
          className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] text-arctic mb-6"
        >
          {item.label.toUpperCase()}
        </h3>

        <div className="w-16 h-px bg-brass/40 mb-7" />

        {/* Body */}
        <p className="font-body text-arctic/60 text-[0.9375rem] leading-[1.95]">
          {item.content}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Origin() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeModal, setActiveModal] = useState(null)

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

          {/* Right: timeline + modal links */}
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

              {/* Divider inside the timeline column */}
              <div className="w-12 h-px bg-brass/20 my-10" />

              {/* Modal link items */}
              <div className="flex flex-col gap-1">
                {MODALS.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.72 + i * 0.07, duration: 0.42 }}
                    onClick={() => setActiveModal(item)}
                    className="group flex items-center justify-between w-full text-left py-2.5 border-b border-white/[0.05] last:border-0 focus-visible:outline-none focus-visible:text-brass"
                  >
                    <span className="font-heading text-[0.78rem] font-medium text-arctic/50 tracking-[0.08em] uppercase group-hover:text-brass transition-colors duration-200">
                      {item.label}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 text-brass/30 group-hover:text-brass group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                    >
                      <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
                    </svg>
                  </motion.button>
                ))}
              </div>
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

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <Modal item={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
