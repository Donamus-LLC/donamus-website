"use client";

import Link from "next/link";
import { useRef } from "react";
import { apps } from "../data/site";

export default function AppCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app-carousel">
      <div
        ref={trackRef}
        className="app-carousel-track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Apps by Donamus"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const track = trackRef.current;
          if (!track || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const card = track.querySelector<HTMLElement>(".app-slide");
          const step = (card?.offsetWidth ?? track.clientWidth) + parseFloat(getComputedStyle(track).columnGap || "0");
          const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
          if (event.key === "Home" || event.key === "End") {
            track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth, behavior });
          } else {
            track.scrollBy({ left: event.key === "ArrowRight" ? step : -step, behavior });
          }
        }}
      >
        {apps.map((app, index) => (
          <article className="app-slide" key={app.name} role="group" aria-roledescription="slide" aria-label={`${app.name}, ${index + 1} of ${apps.length}`}>
            <div className="app-slide-copy">
              <p className="eyebrow">{app.category}</p>
              <h3>{app.name}</h3>
              {app.description && <p className="app-slide-description">{app.description}</p>}
              <div className="app-slide-links">
                {app.links.length ? app.links.map(link => <a className="button" href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>) : <Link className="text-link" href="/contact-us">Ask about {app.name}</Link>}
              </div>
            </div>
            <div className="app-slide-art">
              <div className="app-art-circle app-art-circle-one" aria-hidden="true" />
              <div className="app-art-circle app-art-circle-two" aria-hidden="true" />
              <div className="app-logo-group">
                <div className="app-monogram" aria-hidden="true">{app.name.slice(0, 1)}</div>
                {app.status && <p className="app-release-status">{app.status}</p>}
              </div>
            </div>
            <span className="app-slide-position" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(apps.length).padStart(2, "0")}</span>
          </article>
        ))}
      </div>
      {apps.length > 1 && <p className="carousel-hint">Swipe or scroll horizontally to explore. Use the left and right keys when the carousel is focused.</p>}
    </div>
  );
}
