import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-col items-center w-full m-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookText className="h-6 w-6" />
          <span className="text-xl font-bold">Bliss</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Log in
          </Link>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
