import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s - Perception",
    default: "Perception",
  },
  description:
    "API for extracting text from images encoded in base64 using Optical Character Recognition (OCR).",
  category: "technology",
  metadataBase: new URL(""),
  openGraph: {
    title: "Perception",
    description:
      "API for extracting text from images encoded in base64 using Optical Character Recognition (OCR).",
    url: "",
    siteName: "OCR API",
    locale: "en_AU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className={poppins.className}>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </>
  );
}
