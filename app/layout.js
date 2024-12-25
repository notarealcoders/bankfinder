import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryProvider } from "@/lib/providers";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bank Finder - Locate Bank Branches",
  description: "Find bank branches across India using IFSC codes",
  keywords: ["bank", "branch", "finder", "IFSC", "India"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <QueryProvider>
            <Header />
            <main className="flex-1 bg-background">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}