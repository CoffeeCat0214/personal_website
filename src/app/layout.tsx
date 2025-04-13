import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kyrstin Kauchak | Portfolio",
  description: "Software Engineer | Data Professional | Agile Leader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="py-8 bg-[var(--background)] border-t border-[var(--border)] text-center text-sm text-[var(--text)]/60">
          <div className="max-w-6xl mx-auto px-4">
            <p>© {new Date().getFullYear()} Kyrstin Kauchak. All rights reserved.</p>
            <p className="mt-2">Built with Next.js, TailwindCSS, and ❤️</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
