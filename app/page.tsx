import HeroSection from "./_components/hero-section";
import Navbar from "./_components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      <HeroSection />
    </div>
  );
}
