import { companyTagline } from "./data/site";
import Image from "next/image";
import ConsultationOverview from "./components/ConsultationOverview";
import SectionNavigation from "./components/SectionNavigation";
import AppCarousel from "./components/AppCarousel";

export default function Home() {
  return (
    <>
      <SectionNavigation />
      <section id="home" className="landing-hero" aria-labelledby="hero-title" data-section-label="Introduction" tabIndex={-1}>
        <div className="shell landing-hero-copy">
          <h1 id="hero-title">
            <Image
              src="/brand/donamus-logo.svg"
              alt="Donamus"
              width={1080}
              height={237}
              className="hero-brand-logo"
              priority
            />
          </h1>
          <p>{companyTagline}</p>
        </div>
      </section>
      <section
        id="consultations"
        data-section-label="Consultations"
        className="home-consultations"
        aria-labelledby="consultations-title"
        tabIndex={-1}
      >
        <ConsultationOverview />
      </section>
      <section
        id="our-apps"
        data-section-label="Our apps"
        className="home-apps app-showcase"
        aria-labelledby="apps-title"
        tabIndex={-1}
      >
        <div className="shell app-showcase-inner">
          <div className="app-showcase-heading">
            <p className="eyebrow">Our applications</p>
            <h2 id="apps-title">Made by Donamus.</h2>
          </div>
          <AppCarousel />
        </div>
      </section>
    </>
  );
}
