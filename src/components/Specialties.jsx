import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Icons ── */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
)

const IconAtom = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="1.5" />
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
  </svg>
)

const IconGear = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const IconBulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
)

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

const SPECIALTIES = [
  {
    index: '01',
    title: 'SECURE ARCHITECTURES & DEVICES',
    body: 'Unified security solutions from point-to-point comms to complex secure networks. Device-agnostic across LAN, WAN, cellular, satellite, and IoT — globally.',
    icon: <IconShield />,
    modal: [
      `Our team of professionals has advanced expertise in unified security solutions ranging from small point to point communications to complex secure networks. We focus on providing specialized design and integration services that incorporate the protection of high value systems and information. We accomplish this by customizing network architectures to fit the target. This includes incorporating physical and logical network environments across multiple platforms.`,
      `AELIUS engineers' support and design skills are device agnostic and provide a seamless, customized experience based on requirements. Our diverse background enables the team to rapidly determine the best device solution to support the requirements. If there isn't a device available to meet the requirements, our team has the ability, based on requirements, to engineer specialized devices within our lab environment. Our skills cover LAN, WAN, cellular, satellite, IoT, sensors, and computing devices across platforms or within standalone environments around the world.`,
    ],
  },
  {
    index: '02',
    title: 'PROFESSIONAL SERVICES & SME',
    body: 'User-defined development under complex conditions. Cross-functional teams serving Special Operations, Intelligence, and law enforcement communities.',
    icon: <IconUsers />,
    modal: [
      `AELIUS' professional services are intrinsically tied to our core as a company. Our SMEs and engineers utilize their knowledge, skills, abilities, and experience to provide a wide array of technical solutions.`,
      `Our approach to this is a user-defined developmental process to satisfy unique customer requirements under complex conditions, to achieve time-sensitive, mission-driven objectives. Using this methodology in a cross-functional team, working as closely as possible with the end user, allows AELIUS to effectively and rapidly leverage our collective knowledge base to ensure customer satisfaction and mission success.`,
      `AELIUS has an unwavering commitment to provide world-class professional services to our brethren in Special Operations, the Intelligence professions, and law enforcement. Every day, we bring our best efforts and abilities to bear for these communities to not only protect their operations but also to ensure the survivability of their personnel.`,
    ],
  },
  {
    index: '03',
    title: 'ADVANCED TECH INTEGRATION',
    body: 'Concept to prototype at the speed of combat. Off-the-shelf solutions fused with custom development through rapid iteration and MVP delivery.',
    icon: <IconLayers />,
    modal: [
      `AELIUS' cross-functional team leverages past experience in engineering, computer science, machine learning, autonomy, and 3D visualization to rapidly identify off-the-shelf solutions combined with past technical development and performance to target and resolve the technical endstate. The team continues to directly involve the operator during each phase of the development resulting in a rapid iteration over minimal viable product (MVP) solutions that increasingly meet user needs and can be transitioned to other industry partners.`,
      `This process allows the team to go from concept to prototype at the speed of combat, resulting in viable government-owned solutions in days — not months or years.`,
    ],
  },
  {
    index: '04',
    title: 'CYBER SECURITY & TRAINING',
    body: 'Recognized experts in digital forensics and computer security. Training covers operating anonymously online — and precisely how to breach that anonymity.',
    icon: <IconLock />,
    modal: [
      `AELIUS's staff includes known experts in the computer security and digital forensics fields. We have been actively involved with anonymity communities and have assisted organizations that use these technologies for both online anonymity and adversarial identification. Our background spans the entire network architecture, from application security to networking, and includes human biometrics and profiling.`,
      `We have developed multiple courses that teach users about their cyber presence in the online and real world. One of them, Cyber Security Awareness (CSA), teaches analysts how to be anonymous online and how to breach online anonymity. This hands-on course demonstrates the different ways of covering your online digital trail and explores techniques that are used for following people who do not want to be tracked. CSA is a flexible course and can be tuned to your specific organization's needs.`,
    ],
  },
  {
    index: '05',
    title: 'RESEARCH & DEVELOPMENT',
    body: 'Trusted R&D partner for big data and advanced manufacturing. Bridging the contracting and integration gap for technologies at the edge of the achievable.',
    icon: <IconAtom />,
    modal: [
      `AELIUS is a trusted partner for conducting Research and Development for our clients. Ranging from big data down to the smallest low power processors, or the latest in application of advanced manufacturing, AELIUS specializes in bringing cutting edge computer science and engineering R&D concepts through prototypes to practical applications.`,
      `For new external capabilities, AELIUS brings years of unique experience in finding, evaluating and onboarding new technologies into existing enterprises. When a startup or lab concept is not able to bridge the contracting, legal, or manufacturing gap into integration with larger efforts, AELIUS can step in as a guide and protector of the nascent efforts until they reach fruition.`,
    ],
  },
  {
    index: '06',
    title: 'ENGINEERING DEVELOPMENT & DESIGN',
    body: 'Custom solutions through end-user collaboration. CAD, FEA analysis, and VR models for iterative refinement — concept to field-ready hardware.',
    icon: <IconGear />,
    modal: [
      `The AELIUS team of diverse engineers and industrial designers start with the end-use customer in mind. We research the problem and work with the end user to create a problem statement. The problem statement guides the project's timeline to manage expectations for a successful implementation of the solution.`,
      `Talking to the end user, the team creates custom solutions utilizing digital sketches and descriptions of potential design aspects. AELIUS then uses a diverse collection of CAD packages to build models for use in FEA and other analytic approaches. Finally all of this is combined in a hands-on or VR model so the end user can examine the use and give feedback to improve the next iteration.`,
    ],
  },
  {
    index: '07',
    title: 'INNOVATIVE SOLUTIONS',
    body: 'Novel, existing, or previously out-dated technologies applied to unsolvable problems — including autonomous ground vehicles with LiDAR and machine vision.',
    icon: <IconBulb />,
    modal: [
      `AELIUS's team of experts approaches problem solving from far outside normal use practices. Our solutions focus on what is available and what the customer's challenges are.`,
      `Our team pushes the industry boundaries by identifying unique ways to use novel, existing, or even previously thought of as out-dated technologies to get the job done in the most efficient manner. The AELIUS team has implemented IoT sensors with technology as diverse as LiDAR and Raspi based Cameras. By combining these together, projects like unmanned ground vehicles (UGVs) can determine the safest routes for underground workers.`,
    ],
  },
  {
    index: '08',
    title: 'COMPUTER SCIENCE & DATA ANALYSIS',
    body: 'Advanced data science on massive, complex datasets. Specialists in secure network design and spatially-aware systems — raw signal into decisive clarity.',
    icon: <IconChart />,
    modal: [
      `AELIUS's team of expert computer scientists solves problems ranging from secure network design and implementation to the creation and deployment of spatially-aware, small form-factor, remotely-piloted vehicles. We take on the most challenging problems and help craft elegant and meaningful solutions.`,
      `Our data science professionals employ leading-edge techniques to transform and manipulate data, often billions of records per day, for a better understanding of its implications and to create actionable knowledge.`,
    ],
  },
]

const COLLABORATORS = [
  { name: 'HackerFactor', logo: `${import.meta.env.BASE_URL}hackerfactor.png`, href: 'https://hackerfactor.com/' },
  { name: 'HackRod Studio Manufacturing', logo: `${import.meta.env.BASE_URL}hackrod.png` },
  { name: 'NCMS', logo: `${import.meta.env.BASE_URL}ncms.png`, href: 'https://ncms.org/' },
]

const ORIGIN_MODAL = {
  label: 'Aelius Origin',
  content: [
    `Finding a name for a new technology company is never easy. The founders are big movie buffs; both are also US Army Veterans and of Italian heritage. Various movie quotes and imagery shaped how they wanted to kick off their new company: as high-tech bleeding edge technologists, forward-thinking, actively helping our government and warfighters, and with a solid ethical backbone, the name had to mean something and not just sound cool.`,
    `While watching the Ridley Scott movie Gladiator, starring Russell Crowe as a once great Roman General Maximus Decimus Meridius who becomes a slave / gladiator to avenge his family, he is referred to as Aelius Meridius as he is announced on the Coliseum arena. Aelius, it turns out, means "family of" in Latin – so "of the Family of Meridius" – perfect. As Joe was explaining it all to his partner, Guy Filippelli, Guy's response was an email from GoDaddy having just bought domain rights to "Aelius Exploitation Technologies". Our name therefore stands for "Family of Exploitation Technologies" and has ties both to the founders' Italian culture and honoring their military service and our nation's sacrifices.`,
  ],
}

function OriginModal({ onClose }) {
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
      <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-navy/70 border border-white/[0.07] p-8 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="origin-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-arctic/35 hover:text-arctic transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="font-code text-[0.58rem] text-brass/55 tracking-[0.28em] uppercase mb-4">// AELIUS</div>

        <div className="flex items-start gap-6 mb-6">
          <img
            src={`${import.meta.env.BASE_URL}origin-story.png`}
            alt="Aelius Origin"
            className="w-20 h-20 object-cover flex-shrink-0 border border-white/[0.07]"
            style={{ filter: 'brightness(0.9) contrast(1.05)' }}
          />
          <h3
            id="origin-modal-title"
            className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] text-arctic"
          >
            {ORIGIN_MODAL.label.toUpperCase()}
          </h3>
        </div>

        <div className="w-16 h-px bg-brass/40 mb-7" />

        <div className="flex flex-col gap-5">
          {ORIGIN_MODAL.content.map((para, i) => (
            <p key={i} className="font-body text-arctic/60 text-[0.9375rem] leading-[1.95]">
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function SpecialtyModal({ specialty, onClose }) {
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
      <div className="absolute inset-0 bg-void/80 backdrop-blur-xl" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-navy/70 border border-white/[0.07] p-8 md:p-12 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="specialty-modal-title"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-arctic/35 hover:text-arctic transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="font-code text-[0.58rem] text-brass/55 tracking-[0.28em] uppercase mb-4">
          // {specialty.index}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-7 h-7 text-signal shrink-0" aria-hidden="true">
            {specialty.icon}
          </div>
          <h3
            id="specialty-modal-title"
            className="font-display text-[clamp(1.4rem,4vw,2.2rem)] leading-[0.95] text-arctic"
          >
            {specialty.title}
          </h3>
        </div>

        <div className="w-16 h-px bg-brass/40 mb-7" />

        <div className="flex flex-col gap-5">
          {specialty.modal.map((para, i) => (
            <p key={i} className="font-body text-arctic/60 text-[0.9375rem] leading-[1.95]">
              {para}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function SpecialtyCard({ index, title, body, icon, modal, delay, inView, onClick }) {
  const hasModal = Boolean(modal)
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative glass-card p-6 hover:-translate-y-1.5 transition-transform duration-300 overflow-hidden ${hasModal ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={hasModal ? onClick : undefined}
      role={hasModal ? 'button' : undefined}
      tabIndex={hasModal ? 0 : undefined}
      onKeyDown={hasModal ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      aria-label={hasModal ? `Learn more about ${title}` : undefined}
    >
      {/* Top accent bar: brass → signal on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brass/38 group-hover:bg-signal/55 transition-colors duration-300" />

      {/* Ghost index watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 right-3 font-display text-[4rem] leading-none text-arctic/[0.04] select-none pointer-events-none"
      >
        {index}
      </div>

      {/* Icon */}
      <div className="w-6 h-6 mb-4 text-signal" aria-hidden="true">
        {icon}
      </div>

      {/* Index label */}
      <div className="font-code text-[0.58rem] text-brass/52 tracking-[0.26em] uppercase mb-2">
        {index}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-[0.78rem] text-arctic tracking-[0.07em] uppercase leading-snug mb-3">
        {title}
      </h3>

      {/* Body */}
      <p className="font-body text-arctic/48 text-xs leading-[1.88]">
        {body}
      </p>

      {/* Learn more hint */}
      {hasModal && (
        <div className="mt-4 flex items-center gap-1.5 font-heading text-[0.65rem] text-brass/50 tracking-[0.12em] uppercase group-hover:text-brass/80 transition-colors duration-200">
          Learn More
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
            <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

export default function Specialties() {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })
  const [showOriginModal, setShowOriginModal] = useState(false)
  const [activeSpecialty, setActiveSpecialty] = useState(null)

  return (
    <section id="specialties" className="relative pt-28 lg:pt-36 pb-0 overflow-hidden">
      {/* Ghost "FOCUS." atmospheric display text */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display whitespace-nowrap leading-none text-arctic/[0.018] pl-[4%]"
          style={{ fontSize: 'clamp(7rem, 26vw, 28rem)' }}
        >
          FOCUS.
        </span>
      </div>

      {/* Soft gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/60"
      />

      <div ref={headRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="label-tag tracking-[0.25em] mb-12 block"
        >
          // Focus & Specialties
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 44 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.93] text-arctic mb-6"
        >
          BUILT FOR THE
          <br />
          <span className="text-brass">HARDEST PROBLEMS.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-body text-arctic/52 text-base md:text-lg max-w-2xl leading-[1.85] mb-14"
        >
          Eight specialized disciplines. One uncompromising mandate: deliver
          what no one else will commit to — on timeline, on target, at the
          speed of the mission.
        </motion.p>

        <div className="brass-divider mb-14 opacity-35" />

        {/* 4×2 card grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-20"
        >
          {SPECIALTIES.map((s, i) => (
            <SpecialtyCard
              key={s.index}
              {...s}
              delay={i * 0.07}
              inView={gridInView}
              onClick={() => setActiveSpecialty(s)}
            />
          ))}
        </div>

        {/* Strategic partners strip */}
        <div className="border-t border-white/[0.05] pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.62, duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-heading text-[2rem] font-bold text-arctic tracking-[0.22em] uppercase">
              Strategic Partners
            </span>
            <div className="flex items-center gap-12 flex-wrap justify-center">
              {COLLABORATORS.map(({ name, logo, href }) => {
                const inner = (
                  <>
                    {logo && (
                      <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="h-12 w-auto"
                        style={{ filter: 'brightness(0) invert(1) opacity(0.45)' }}
                      />
                    )}
                    <span className="font-heading text-[1.1rem] font-medium text-arctic/40 tracking-[0.08em]">
                      {name}
                    </span>
                  </>
                )
                return href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:opacity-70 transition-opacity duration-200"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={name} className="flex items-center gap-2.5">{inner}</div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Aelius Origin strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-14 border-t border-white/[0.05] pt-12 flex flex-col items-center text-center gap-5"
        >
          <img
            src={`${import.meta.env.BASE_URL}origin-story.png`}
            alt="Aelius Origin"
            className="w-20 h-20 object-contain"
            style={{ filter: 'drop-shadow(0 0 6px rgba(200,169,110,0.55)) drop-shadow(0 0 18px rgba(200,169,110,0.25)) brightness(1.05)' }}
          />
          <div>
            <div className="font-code text-[0.58rem] text-brass/55 tracking-[0.28em] uppercase mb-2">// The Name</div>
            <h3 className="font-display text-[clamp(1.4rem,3vw,2rem)] text-arctic leading-[0.95] mb-3">
              AELIUS ORIGIN
            </h3>
            <p className="font-body text-arctic/45 text-sm leading-[1.85] max-w-lg mx-auto mb-4">
              How two US Army Veterans — movie buffs of Italian heritage — found the perfect name while watching Gladiator.
            </p>
            <button
              onClick={() => setShowOriginModal(true)}
              className="group inline-flex items-center gap-2 font-heading text-[0.78rem] font-medium text-brass/70 tracking-[0.1em] uppercase hover:text-brass transition-colors duration-200 focus-visible:outline-none focus-visible:text-brass"
            >
              Read the Story
              <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showOriginModal && <OriginModal onClose={() => setShowOriginModal(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {activeSpecialty && (
          <SpecialtyModal specialty={activeSpecialty} onClose={() => setActiveSpecialty(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
