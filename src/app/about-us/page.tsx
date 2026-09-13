import type { Metadata } from "next";
import Link from "next/link";
import { companyTagline } from "../data/site";
export const metadata: Metadata = {
  title: "About",
  description:
    `Meet the idea behind Donamus: ${companyTagline}.`,
};
export default function About() {
  return (
    <>
      <section className="shell page-intro">
        <p className="eyebrow">Hello. We’re Donamus.</p>
        <h1>{companyTagline}</h1>
        <p className="intro-description">
          We’re a software studio built around a simple belief: good technology
          should make life easier for the people who use it.
        </p>
      </section>
      <section className="soft-section">
        <div className="shell story-section">
          <h2>
            We think.
            <br />
            We build.
            <br />
            We stay curious.
          </h2>
          <div>
            <p>
              Donamus brings together two sides of working with software.
              Through consultations, we help people think through ideas and
              technology decisions. Through our apps, we put our own ideas into
              practice.
            </p>
            <p>
              Both start in the same place: paying attention. What is someone
              trying to do? What is getting in their way? And what would
              actually make a difference?
            </p>
            <p>
              We care about clear conversations, practical choices, and software
              that earns its place in someone’s day.
            </p>
          </div>
        </div>
      </section>
      <section className="shell compact-cta">
        <h2>Something we should talk about?</h2>
        <Link href="/contact-us" className="button">
          Say hello <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
