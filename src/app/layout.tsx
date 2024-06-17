import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { PopupWidget } from "react-calendly";
import CalendlyCustomPopup from "./components/CalendlyCustomPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donamus: Software Meets Humanity",
  description: "A tech shop with personable, passionate, and performant people that create good software which empowers people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-main-html-tag`}>
        <Header />
        <div className="flex h-screen bg-white text-black">
          <NavBar />
          <main className="w-3/4 overflow-auto p-4 root-main-html-tag">
            {children}
          </main>
          <CalendlyCustomPopup />
        </div>
        </body>
    </html>
  );
}
