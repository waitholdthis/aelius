const LINKS = ['Capabilities', 'Specialties', 'Origin', 'Careers', 'Contact']

export default function Footer() {
  return (
    <footer className="bg-void border-t border-white/[0.04] py-9 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="font-display text-xl text-brass/55 tracking-[0.2em]" aria-label="AELIUS">
          AELIUS
        </span>

        <p className="font-code text-[0.62rem] text-arctic/22 tracking-[0.15em] uppercase text-center order-last sm:order-none">
          © {new Date().getFullYear()} AELIUS Exploitation Technologies LLC
          &nbsp;·&nbsp; SDVOSB &nbsp;·&nbsp; All Rights Reserved
        </p>

        <nav aria-label="Footer" className="flex items-center gap-6 flex-wrap justify-center">
          {LINKS.map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="font-heading text-[0.68rem] text-arctic/28 hover:text-brass/65 transition-colors duration-200 tracking-[0.12em] uppercase focus-visible:outline-none focus-visible:text-brass"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
