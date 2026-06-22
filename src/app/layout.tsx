import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find My Huddle | Autistic-Friendly Flag Football Clinic",
  description: "A structured, sensory-accommodating, and anxiety-free flag football clinic designed specifically for autistic young adults to play, connect, and find their crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-cyber-dark text-slate-100 selection:bg-cyber-lime selection:text-black">
        {children}
      </body>
    </html>
  );
}
