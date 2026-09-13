import Link from "next/link";
import { consultations } from "../data/site";

const serviceSymbols = [
  <g key="plan"><rect x="5" y="5" width="18" height="22" rx="2" /><path d="M10 11h8M10 16h5M22 21l5-5 3 3-5 5-4 1z" /></g>,
  <g key="improve"><path d="M5 23V9h22v14H5zM5 13h22M10 9v4M14 9v4M11 28h10M16 23v5" /><path d="m11 19 3-3 3 3 4-4" /></g>,
  <g key="decide"><circle cx="16" cy="16" r="12" /><path d="m21 11-3 7-7 3 3-7 7-3zM16 2v2M16 28v2M2 16h2M28 16h2" /></g>,
];

export default function ConsultationOverview() {
  return (
    <div className="shell consultation-overview">
      <div className="consulting-intro">
        <div>
          <p className="eyebrow">Consultations / From questions to a plan</p>
          <h2 id="consultations-title">Your ideas.<br />Our technical perspective.</h2>
        </div>
        <div className="consulting-intro-copy">
          <p>Building something new or figuring out what comes next? We help you make sense of the options and decide where to put your time and effort.</p>
          <Link href="/contact-us" className="button">Talk about your project <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="consulting-cards">
        {consultations.map((service, index) => (
          <article className="consulting-card" key={service.number}>
            <span className="service-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{serviceSymbols[index]}</svg></span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-topics">
              <h4>What we can work through</h4>
              <ul>{service.topics.split(" · ").map(topic => <li key={topic}>{topic}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
      <div className="consulting-next-step">
        <p><strong>Start with a 30-minute introduction.</strong> Tell us what you’re working on. We’ll discuss where we can help.</p>
        <Link href="/consultations" className="text-link">How consultations work <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
