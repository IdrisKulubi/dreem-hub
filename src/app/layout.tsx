import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dreemhub.org'),
  title: "DREEM Hub | Solarizing Agricultural Value Chains Across East Africa",
  description: "The Distributed Renewable Energy Ecosystem Model (DREEM) Hub is a multi-country initiative scaling solar energy adoption in agricultural value chains across Kenya, Uganda, and Tanzania. Supporting youth and women entrepreneurs while driving climate action.",
  keywords: ["solar energy", "agriculture", "East Africa", "Kenya", "Uganda", "Tanzania", "PUSE", "climate action", "entrepreneurship", "renewable energy"],
  authors: [{ name: "DREEM Hub" }],
  openGraph: {
    title: "DREEM Hub | Solarizing Agricultural Value Chains Across East Africa",
    description: "Scaling solar energy adoption in agricultural value chains across Kenya, Uganda, and Tanzania. Supporting entrepreneurs and driving climate action.",
    url: "https://dreemhub.org",
    siteName: "DREEM Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DREEM Hub - Solarizing Agricultural Value Chains",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DREEM Hub | Solarizing Agricultural Value Chains Across East Africa",
    description: "Scaling solar energy adoption in agricultural value chains across Kenya, Uganda, and Tanzania.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Navbar />
          <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
