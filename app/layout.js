import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryProvider } from "@/lib/providers";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bank Finder - Locate Bank Branches",
  description: "Find bank branches across India using IFSC codes",
  keywords: ["bank", "branch", "finder", "IFSC", "India"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
