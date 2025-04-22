import { Button } from "@/components/ui/button";
import { CheckCircle2, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Introducing Bliss
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Capture your thoughts, organize your life
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Bliss helps you capture ideas, organize tasks, and stay
                productive with a beautiful, intuitive note-taking experience.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1.5">
                    Get Started <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=1080&width=1920"
                  width={1920}
                  height={1080}
                  alt="App screenshot"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
