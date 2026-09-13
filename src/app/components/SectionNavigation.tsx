"use client";

import { useEffect, useState } from "react";

type PageSection = { id: string; label: string };

export default function SectionNavigation() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    let elements: HTMLElement[] = [];
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const midpoint = window.innerHeight / 2;
      let nearest: HTMLElement | undefined;
      let distance = Infinity;
      for (const section of elements) {
        const bounds = section.getBoundingClientRect();
        if (bounds.height === 0) continue;
        const gap = Math.max(bounds.top - midpoint, midpoint - bounds.bottom, 0);
        if (gap < distance) {
          nearest = section;
          distance = gap;
        }
      }
      if (nearest) setActiveId(nearest.id);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const discoverSections = () => {
      elements = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
      const discovered = elements.map((section, index) => {
        if (!section.id) {
          let id = `page-section-${index + 1}`;
          while (document.getElementById(id)) id += "-section";
          section.id = id;
        }
        const headingId = section.getAttribute("aria-labelledby");
        const heading = headingId ? document.getElementById(headingId) : section.querySelector("h1, h2");
        const label = section.dataset.sectionLabel || section.getAttribute("aria-label") || heading?.textContent?.replace(/\s+/g, " ").trim() || heading?.querySelector("img")?.alt || `Section ${index + 1}`;
        return { id: section.id, label };
      });
      setSections(previous => JSON.stringify(previous) === JSON.stringify(discovered) ? previous : discovered);
      resizeObserver.disconnect();
      elements.forEach(section => resizeObserver.observe(section));
      scheduleUpdate();
    };

    // Read the rendered sections, including sections added or removed later.
    const initialFrame = requestAnimationFrame(discoverSections);
    const mutationObserver = new MutationObserver(discoverSections);
    mutationObserver.observe(main, { childList: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  if (!sections.length) return null;
  return (
    <nav className="section-navigation" aria-label="Homepage sections">
      {sections.map(section => (
        <a key={section.id} href={`#${section.id}`} aria-label={`Go to ${section.label}`} aria-current={activeId === section.id ? "location" : undefined}>
          <span className="section-dot" aria-hidden="true" />
          <span className="section-dot-label" aria-hidden="true">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
