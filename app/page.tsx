"use client";

import HeroSection from "./_components/hero-section";
import Navbar from "./_components/navbar";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      <HeroSection />
    </div>
  );
}
