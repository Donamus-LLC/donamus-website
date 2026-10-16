"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../page.module.css";

export default function PrinciplesTimeline({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState({ left: false, right: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateArrows = () => {
      const left = track.scrollLeft > 1;
      const right = track.scrollWidth - track.clientWidth - track.scrollLeft > 1;
      setAvailable(previous =>
        previous.left === left && previous.right === right ? previous : { left, right }
      );
    };
    const frame = requestAnimationFrame(updateArrows);
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    if (track.firstElementChild) observer.observe(track.firstElementChild);
    track.addEventListener("scroll", updateArrows, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", updateArrows);
    };
  }, []);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const point = track.querySelector("li");
    const distance = point?.getBoundingClientRect().width ?? track.clientWidth;
    track.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <>
      <p id="timeline-hint" className={styles.timelineHint}>
        Seven principles, from the problem to protection.
      </p>
      <div className={styles.timelineLayout}>
        <button
          type="button"
          className={styles.timelineArrow}
          aria-label="Scroll timeline left"
          aria-controls="principles-timeline"
          disabled={!available.left}
          onClick={() => scroll(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M19 12H5m6-6-6 6 6 6" />
          </svg>
        </button>
        <div
          id="principles-timeline"
          ref={trackRef}
          className={styles.timeline}
          role="region"
          aria-label="Well-written software principles timeline"
          aria-describedby="timeline-hint"
          tabIndex={0}
        >
          {children}
        </div>
        <button
          type="button"
          className={styles.timelineArrow}
          aria-label="Scroll timeline right"
          aria-controls="principles-timeline"
          disabled={!available.right}
          onClick={() => scroll(1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
