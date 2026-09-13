import type { Metadata } from "next";
import { companyTagline } from "./data/site";
import { Cabin, Montserrat } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const cabin = Cabin({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-heading" });
export const metadata: Metadata = {
  title: {
    default: "Donamus — Consultations & Apps",
    template: "%s | Donamus",
  },
  description:
    `${companyTagline}. Explore consultations and apps from Donamus.`,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} ${montserrat.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
