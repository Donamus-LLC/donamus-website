import Link from "next/link";
import { companyTagline } from "../data/site";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link href="/" className="footer-brand" aria-label="Donamus home">
            <Image src="/brand/donamus-logo.svg" alt="Donamus" width={1080} height={237} className="brand-logo" />
          </Link>
          <p>{companyTagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/consultations">Consultations</Link>
          <Link href="/apps">Our apps</Link>
          <Link href="/contact-us">Get in touch ↗</Link>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Donamus</p>
      </div>
    </footer>
  );
}
