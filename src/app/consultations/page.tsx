import type { Metadata } from "next";
import { bookingUrl, consultations } from "../data/site";

export const metadata: Metadata = {
  title: "Consultations",
  description:
    "Plan a new product, improve existing software, or choose the right technology with Donamus. Start with a 30-minute introduction.",
};

function BookingLink() {
  return (
    <div className="consultation-booking-action">
      <a href={bookingUrl} className="button" target="_blank" rel="noopener noreferrer">
        Book a 30-minute introduction <span aria-hidden="true">↗</span>
      </a>
      <p>Choose a time on Calendly. Opens in a new tab.</p>
    </div>
  );
}

export default function Consultations() {
  return (
    <div className="consultations-page">
      <section className="consultation-hero" aria-labelledby="consultation-heading">
        <div className="shell consultation-hero-grid">
          <div>
            <p className="eyebrow">Consultations / From questions to a plan</p>
            <h1 id="consultation-heading">Your ideas.<br />Our technical perspective.</h1>
            <p className="intro-description">
              A new product, software that needs attention, or a technical decision
              you want to get right. We help you work through the options and
              decide where to put your time and effort.
            </p>
            <a href="#consultation-services" className="text-link">Explore how we can help</a>
          </div>
          <aside className="consultation-start" aria-labelledby="start-heading">
            <p className="eyebrow">A first conversation</p>
            <h2 id="start-heading">Tell us what you’re working on.</h2>
            <p>Start with a 30-minute introduction to your idea, your goals, and what’s getting in the way. We’ll discuss where we can help.</p>
            <BookingLink />
            <p className="consultation-start-note">An early idea is enough. You don’t need a project brief to start.</p>
          </aside>
        </div>
      </section>

      <section id="consultation-services" className="shell consultation-services" aria-labelledby="services-heading">
        <div className="consultation-section-heading">
          <p className="eyebrow">Where we can help</p>
          <h2 id="services-heading">What’s your next decision?</h2>
          <p>Start with the challenge that feels familiar. We can work across these areas as your needs become clearer.</p>
        </div>
        {consultations.map((service) => (
          <article className="consultation-detail" key={service.number}>
            <div>
              <p className="eyebrow">{service.number} / {service.question}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className="consultation-detail-topics">
              <h4>What we can work through</h4>
              <ul>{service.topics.split(" · ").map((topic) => <li key={topic}>{topic}</li>)}</ul>
            </div>
            <div className="consultation-outcome">
              <h4>What we work toward</h4>
              <p>{service.outcome}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="consultation-process" aria-labelledby="process-heading">
        <div className="shell">
          <p className="eyebrow">How consultations work</p>
          <h2 id="process-heading">A conversation first.<br />A practical plan next.</h2>
          <div className="steps-grid">
            <article>
              <span>01</span><h3>Share the context</h3>
              <p>In our introduction, tell us what you want to achieve, what you’ve tried, and any timing or budget constraints. We’ll ask questions and explore whether we’re a fit.</p>
            </article>
            <article>
              <span>02</span><h3>Agree on the focus</h3>
              <p>If working together makes sense, we’ll define the questions to tackle, the expected outputs, and the scope, timing, and fees before further work begins.</p>
            </article>
            <article>
              <span>03</span><h3>Work through the decisions</h3>
              <p>During the consultation work, we’ll explore the options together and develop recommendations around your users, your team, and your constraints.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="shell consultation-faq" aria-labelledby="faq-heading">
        <div><p className="eyebrow">Before we talk</p><h2 id="faq-heading">A few useful details.</h2></div>
        <div className="consultation-questions">
          <details>
            <summary>Do I need a technical background?</summary>
            <p>No. Bring the problem in your own words. We’ll explain technical options in terms of what they mean for your goals, your users, and the work involved.</p>
          </details>
          <details>
            <summary>What should I bring to the introduction?</summary>
            <p>An idea of what you want to achieve and what’s making it difficult. Existing software, sketches, or a list of questions can help, but a polished presentation isn’t necessary.</p>
          </details>
          <details>
            <summary>What happens after the 30-minute introduction?</summary>
            <p>We’ll decide together whether further consultation would be useful. If so, we’ll agree on the scope and fees before starting. The introduction is a chance to understand your needs; a detailed review or plan would be part of that follow-up work.</p>
          </details>
        </div>
      </section>

      <section className="consultation-closing" aria-labelledby="closing-heading">
        <div className="shell">
          <div><p className="eyebrow">Let’s talk about your project</p><h2 id="closing-heading">Make your next move<br />with a clearer perspective.</h2><p>Tell us where you are. We’ll figure out a useful next step together.</p></div>
          <BookingLink />
        </div>
      </section>
    </div>
  );
}
