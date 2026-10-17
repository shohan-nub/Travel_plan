import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khadi Trip — Unforgettable Travel Moments",
  description: "Thoughtful escapes to places that stay with you. Discover the world with Khadi Trip.",
  openGraph: {
    title: "Khadi Trip — Unforgettable Travel Moments",
    description: "Thoughtful escapes to places that stay with you. Discover the world with Khadi Trip.",
    siteName: "Khadi Trip",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
