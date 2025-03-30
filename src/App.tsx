import { Route, Routes } from "react-router-dom"

import Benefits from "./components/Benefits"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import SautiSafiFeatures from "./components/Features"
import ClinicalAssistant from "./components/ClinicalAssitans"
import IntegrityTimeline from "./components/TimeLine"
import HealthcareHero from "./components/HealthCareHero"
import ContactForm from "./components/ContanctForm"
import Footer from "./components/Footer"
import ThankYouPage from "./components/ThankYouPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
      <div className="flex flex-col gap-10 p-5 md:p-0">
        <Header />

        <section id="hero">
          <HeroSection />
        </section>

        <section id="benefits">
          <Benefits />
        </section>

        <section id="features">
          <SautiSafiFeatures />
        </section>

        <section id="clinical">
          <ClinicalAssistant />
        </section>

        <section id="integrity">
          <IntegrityTimeline />
        </section>

        <section id="healthcare">
          <HealthcareHero />
        </section>

        <section id="contact">
          <ContactForm />
        </section>

        <Footer />
      </div>
    </>
  )
}

export default App