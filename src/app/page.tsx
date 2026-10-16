import type { Metadata } from "next";
import Image from "next/image";
import ConsultationOverview from "./components/ConsultationOverview";
import SectionNavigation from "./components/SectionNavigation";
import AppCarousel from "./components/AppCarousel";
import PrinciplesTimeline from "./components/PrinciplesTimeline";
import styles from "./page.module.css";

const mission =
  "We enable customer-focused innovation for organizations by taking care of their software and product needs.";

export const metadata: Metadata = {
  description: mission,
};

const softwarePrinciples = [
  {
    title: "Pain points",
    description: "Well-thought-out pain points that the software will solve.",
  },
  {
    title: "Customer touchpoints",
    description: "Well-thought-out touchpoints along the journey of the customer whose pain points are being solved.",
  },
  {
    title: "System architecture",
    description: "Well-thought-out software system architecture based on the pain points being solved and the touchpoints in a customer’s journey.",
  },
  {
    title: "Availability & scale",
    description: "Well-thought-out plans and design choices to ensure high availability, scalability, and efficiency.",
  },
  {
    title: "Maintainable code",
    description: "Well-written code designed with a holistic, long-term view to keep maintenance costs low and make changes and additions easier.",
  },
  {
    title: "Infrastructure",
    description: "Well-designed infrastructure that runs the software.",
  },
  {
    title: "Security & privacy",
    description: "Well-thought-out and implemented cybersecurity, user privacy, and data protection policies.",
  },
];

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
          <p className={styles.mission}>{mission}</p>
        </div>
      </section>
      <section
        id="why"
        data-section-label="Why"
        className={`${styles.section} ${styles.purpose}`}
        aria-labelledby="why-title"
        tabIndex={-1}
      >
        <div className={`shell ${styles.content} ${styles.split}`}>
          <h2 id="why-title">Why?</h2>
          <p className={styles.belief}>
            Because we believe that well-written software has the power to
            accelerate industries in doing good for humanity.
          </p>
        </div>
      </section>
      <section
        id="well-written-software"
        data-section-label="Well-written software"
        className={styles.section}
        aria-labelledby="software-title"
        tabIndex={-1}
      >
        <div className={`shell ${styles.content}`}>
          <div className={styles.heading}>
            <h2 id="software-title">What do we mean by “well-written software”?</h2>
            <p>There are a few things that make software well written:</p>
          </div>
          <PrinciplesTimeline>
            <ol className={styles.principles} role="list">
              {softwarePrinciples.map((principle, index) => (
                <li key={principle.title}>
                  <span className={styles.timelinePoint} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </li>
              ))}
            </ol>
          </PrinciplesTimeline>
        </div>
      </section>
      <section
        id="our-values"
        data-section-label="Our values"
        className={`${styles.section} ${styles.values}`}
        aria-labelledby="values-title"
        tabIndex={-1}
      >
        <div className={`shell ${styles.content} ${styles.split}`}>
          <div>
            <p className="eyebrow">Our internal north star</p>
            <h2 id="values-title">What guides us in writing well-written software?</h2>
          </div>
          <div className={styles.valueCopy}>
            <p>
              Our cultural values are woven into the fabric of our organization
              and our team, and reflected in everything we do.
            </p>
            <h3>Stay humble</h3>
          </div>
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
