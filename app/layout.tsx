import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Rachel & Carter | June 2027", description: "A timeless wedding celebration" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
