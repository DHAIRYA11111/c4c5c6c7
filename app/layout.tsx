import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shiv Prem Agencies | Candle Fragrances & Aroma Oils",
  description: "Premium candle fragrances and aroma oils for makers, retailers, and businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
