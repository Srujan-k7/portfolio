import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.fullName} — ${profile.roles[0]}`;

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${profile.fullName}` },
  description: profile.tagline,
  keywords: [
    "portfolio",
    "full-stack engineer",
    "React",
    "Next.js",
    "TypeScript",
    profile.fullName,
  ],
  authors: [{ name: profile.fullName }],
  openGraph: {
    title,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
    siteName: profile.fullName,
  },
  twitter: { card: "summary_large_image", title, description: profile.tagline },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-accent-1 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <GradientBackdrop />
          <Cursor />
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
