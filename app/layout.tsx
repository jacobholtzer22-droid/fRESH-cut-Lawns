import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import "./globals.css";

/* Display: Sora — a clean, geometric modern sans with just enough character.
 * Set semibold and tight, it reads sharp, current, and dependable: a young
 * lawn-care company that takes the work seriously. */
const display = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/* Body: Inter — the workhorse modern grotesque. Highly legible at every size,
 * neutral enough to let Sora carry the personality. */
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Default metadata = home page. Each route overrides via its own pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  robots: { index: true, follow: true },
  ...pageMetadata("home"),
};

export const viewport: Viewport = {
  themeColor: "#0C3D19",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-limestone font-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cedar focus:px-4 focus:py-2 focus:font-semibold focus:text-evergreen"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
