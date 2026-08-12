import Nav from './components/Nav.jsx'
import CtaBars from './components/CtaBars.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import TrustBar from './sections/TrustBar.jsx'
import Services from './sections/Services.jsx'
import Work from './sections/Work.jsx'
import WhyUs from './sections/WhyUs.jsx'
import Process from './sections/Process.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'
import FinalCta from './sections/FinalCta.jsx'

/**
 * Section order is the sales argument in sequence: what we do → proof we are
 * real → what we make → what it looks like → why us → what happens next →
 * objections → where we are → ask for the call.
 */
export default function App() {
  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-red focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Work />
        <WhyUs />
        <Process />
        <Faq />
        <Contact />
        <FinalCta />
      </main>

      <Footer />
      <CtaBars />
    </>
  )
}
