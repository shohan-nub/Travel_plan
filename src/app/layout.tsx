import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOYARE — The World Is Yours to Feel",
  description: "Thoughtful escapes to places that stay with you. Discover the world with VOYARE.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
