import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Amr & Mariam | Our Engagement",
  description: "Join us as we celebrate our engagement on October 3, 2026 at Louvre Heights, New Cairo.",
  openGraph: {
    title: "Amr & Mariam | Our Engagement",
    description: "October 3, 2026 · Louvre Heights, New Cairo",
    type: "website",
    images: [{
      url: `${basePath}/images/engagement-rings.png`,
      width: 1536,
      height: 1024,
      alt: "Amr and Mariam engagement rings",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr & Mariam | Our Engagement",
    description: "October 3, 2026 · Louvre Heights, New Cairo",
    images: [`${basePath}/images/engagement-rings.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
