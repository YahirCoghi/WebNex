import type {Metadata, Viewport} from "next";
import {Manrope, Playfair_Display} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["italic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexsystems.org"),
  applicationName: "NexSystems",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {url: "/favicon.svg", type: "image/svg+xml"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicon.ico"},
    ],
    shortcut: ["/favicon.ico"],
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3977",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
