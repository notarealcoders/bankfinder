import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted">
      <Hero />
      <Features />
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Access to over 1.5 lakh bank branches across India</p>
      </div>
    </div>
  );
}