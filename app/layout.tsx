import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Lab — Make content people stop for",
  description: "A free, high-signal toolkit for creators who ship every day.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
