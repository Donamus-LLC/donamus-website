import type { Metadata } from "next";
import { bookingUrl } from "../data/site";
export const metadata: Metadata = {
  title: "Let’s talk",
  description:
    "Book a 30-minute introduction with Donamus to discuss your idea, technology question, or app.",
};
export default function Contact() {
  return (
    <section className="shell contact-page">
      <div>
        <p className="eyebrow">Let’s talk</p>
        <h1>
          Big idea?
          <br />
          Small question?
          <br />
          <em>Start here.</em>
        </h1>
        <p className="intro-description">
          Tell us what you’re thinking about. We’ll listen, ask a few questions,
          and explore whether we can help.
        </p>
      </div>
      <div className="booking-card">
        <span className="booking-symbol" aria-hidden="true">
          ↗
        </span>
        <p className="eyebrow">A first conversation</p>
        <h2>
          Let’s get
          <br />
          to know your idea.
        </h2>
        <p>
          Book a 30-minute introduction. Choose a time that works for you on our
          Calendly booking page.
        </p>
        <ul>
          <li>Your idea, question, or current challenge</li>
          <li>What you’d like to change or achieve</li>
          <li>Whether working together makes sense</li>
        </ul>
        <a
          href={bookingUrl}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Choose a time <span aria-hidden="true">↗</span>
        </a>
        <span className="booking-note">Opens Calendly in a new tab.</span>
      </div>
    </section>
  );
}
