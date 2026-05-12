import Intro        from './components/Intro'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import Capabilities from './components/Capabilities'
import Specialties  from './components/Specialties'
import Origin       from './components/Origin'
import Careers      from './components/Careers'
import CTA          from './components/CTA'
import Footer       from './components/Footer'
import CursorSpot   from './components/CursorSpotlight'

export default function App() {
  return (
    <div className="relative bg-void">
      <Intro />
      <CursorSpot />
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Specialties />
        <Origin />
        <Careers />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
