import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseReactiveBackground from '@/components/MouseReactiveBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Umar Farook's Portfolio",
  description: "Backend Developer & Creative Problem Solver. Specializing in Node.js, Python, and modern backend technologies.",
  keywords: "portfolio, developer, backend, node.js, python, javascript, web development",
  authors: [{ name: "Umar Farook" }],
  openGraph: {
    title: "Umar Farook's Portfolio",
    description: "Backend Developer & Creative Problem Solver",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseReactiveBackground />
        {children}
      </body>
    </html>
  );
}
