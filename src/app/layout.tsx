import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gabsen - Service de Transport Premium à Dakar",
  description: "Service de transport VTC premium à Dakar. Transferts aéroport et chauffeur privé disponibles 24/7. Confort, sécurité et ponctualité garantis pour tous vos déplacements.",
  keywords: "VTC Dakar, transport premium, chauffeur privé, transfert aéroport, transport professionnel, taxi Dakar, service VTC",
  authors: [{ name: "Gabsen" }],
  creator: "Gabsen",
  publisher: "Gabsen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://Gabsen.com",
    title: "Gabsen - Service de Transport Premium à Dakar",
    description: "Service de transport VTC premium à Dakar. Transferts aéroport et chauffeur privé disponibles 24/7. Confort, sécurité et ponctualité garantis.",
    siteName: "Gabsen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabsen VTC - Service de Transport Premium à Dakar",
    description: "Service de transport VTC premium à Dakar. Transferts aéroport et chauffeur privé disponibles 24/7.",
    creator: "@Gabsen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "https://Gabsen.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
