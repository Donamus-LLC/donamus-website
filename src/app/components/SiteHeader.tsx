"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const links = [
  { href: "/consultations", label: "Consultations" },
  { href: "/apps", label: "Our apps" },
  { href: "/about-us", label: "About" },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function hasPassedHero() {
  const hero = document.querySelector(".landing-hero");
  return hero !== null && hero.getBoundingClientRect().bottom <= 1;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pastHero = useSyncExternalStore(subscribeToScroll, hasPassedHero, () => false);
  const isHome = pathname === "/";
  const hidden = isHome && !pastHero;
  return (
    <header className={`site-header${isHome ? " home-header" : ""}${hidden ? " header-hidden" : ""}`} inert={hidden}>
      <div className="shell header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="Donamus home"
          onClick={() => setOpen(false)}
        >
          <Image src="/brand/donamus-logo.svg" alt="Donamus" width={1080} height={237} className="brand-logo" priority />
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact-us"
            className="button button-small"
            onClick={() => setOpen(false)}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
