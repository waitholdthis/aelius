import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Secure Transmission from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:info@aeliustech.com?subject=${subject}&body=${body}`
    setSent(true)
  }

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
        className="relative z-10 w-full max-w-xl bg-navy/70 border border-white/[0.07] p-8 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
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

        <h3 id="contact-modal-title" className="font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] text-arctic mb-2">
          SEND SECURE<br />TRANSMISSION
        </h3>

        <div className="w-16 h-px bg-brass/40 mb-8 mt-4" />

        {sent ? (
          <div className="text-center py-6">
            <div className="font-heading text-brass text-sm tracking-[0.14em] uppercase mb-2">Transmission Ready</div>
            <p className="font-body text-arctic/55 text-sm leading-[1.85]">
              Your email client has been opened with your message pre-filled.<br />
              Send it from there to complete your transmission.
            </p>
            <button
              onClick={onClose}
              className="mt-6 font-heading text-[0.78rem] font-medium tracking-[0.1em] uppercase text-arctic/40 hover:text-brass transition-colors duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="contact-name" className="block font-code text-[0.62rem] text-brass/60 tracking-[0.2em] uppercase mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="w-full bg-white/[0.04] border border-white/[0.08] text-arctic placeholder:text-arctic/25 font-body text-sm px-4 py-3 focus:outline-none focus:border-brass/50 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-code text-[0.62rem] text-brass/60 tracking-[0.2em] uppercase mb-2">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@organization.com"
                className="w-full bg-white/[0.04] border border-white/[0.08] text-arctic placeholder:text-arctic/25 font-body text-sm px-4 py-3 focus:outline-none focus:border-brass/50 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-code text-[0.62rem] text-brass/60 tracking-[0.2em] uppercase mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Describe your mission or requirement..."
                className="w-full bg-white/[0.04] border border-white/[0.08] text-arctic placeholder:text-arctic/25 font-body text-sm px-4 py-3 focus:outline-none focus:border-brass/50 transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full font-heading text-sm font-semibold tracking-[0.1em] uppercase px-10 py-4 bg-brass text-void border border-brass hover:bg-transparent hover:text-brass transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass mt-1"
            >
              Send Secure Message
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function ContactModalWrapper({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && <ContactModal onClose={onClose} />}
    </AnimatePresence>
  )
}
