import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shiv Prem Agencies | Fragrance, thoughtfully supplied",
  description: "Candle fragrances and aroma oils for makers, retailers, and growing brands.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
