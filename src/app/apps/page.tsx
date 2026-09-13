import type { Metadata } from "next";
import Link from "next/link";
import AppCarousel from "../components/AppCarousel";
export const metadata: Metadata = {
  title: "Our apps",
  description:
    "Discover apps made by Donamus and find their official download links.",
};
export default function Apps() {
  return (
    <>
      <section className="shell page-intro">
        <p className="eyebrow">Made by Donamus</p>
        <h1>
          Small tools.
          <br />
          <em>Real possibilities.</em>
        </h1>
        <p className="intro-description">
          Software is something we make, too. This is the home for our apps:
          thoughtful tools built around the people who use them.
        </p>
      </section>
      <section
        className="shell section-space section-topless"
        aria-label="App collection"
      >
        <AppCarousel />
      </section>
      <section className="shell compact-cta">
        <div>
          <p className="eyebrow">Have an idea of your own?</p>
          <h2>Let’s explore it together.</h2>
        </div>
        <Link href="/consultations" className="button">
          Explore consultations <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
