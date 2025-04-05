import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import ClinicalAssistant from "../components/ClinicalAssitans";
import ContactForm from "../components/ContanctForm";
import VoithAIFeatures from "./features/features";
import HealthcareHero from "../components/HealthCareHero";
import IntegrityTimeline from "../components/TimeLine";


export default function Homepage() {

    return (
        <div className="flex flex-col gap-10 p-5 md:p-0">

            <section id="hero">
                <HeroSection />
            </section>

            <section id="benefits">
                <Benefits />
            </section>

            <section id="features">
                <VoithAIFeatures />
            </section>

            <section id="clinical">
                <ClinicalAssistant />
            </section>

            <section id="research">
                <IntegrityTimeline />
            </section>

            <section id="healthcare">
                <HealthcareHero />
            </section>

            <section id="contact">
                <ContactForm />
            </section>

        </div>
    )
}