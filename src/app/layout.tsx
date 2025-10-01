import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledComponentsRegistry } from "../lib/styledRegistry";
import { ThemeProviders } from "@/components/providers/ThemeProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Censys Data Summarization Agent",
  description:
    "Explore Censys host data, review normalized signals, and trigger accessible risk summaries secured by server actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <ThemeProviders>
            <a className="skip-link" href="#main">
              Skip to main content
            </a>
            {children}
          </ThemeProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
