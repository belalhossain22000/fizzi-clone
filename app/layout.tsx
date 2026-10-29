import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const alpino = localFont({
  src: "./fonts/alpino.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

const description =
  "Discover the refreshing taste of Belal, focused on gut health, featuring low-calorie, big-flavor drinks made with natural ingredients.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Belal - Soda for Gutsy People",
  description,
  openGraph: {
    title: "Belal - Soda for Gutsy People",
    description,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belal - Soda for Gutsy People",
    description,
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
