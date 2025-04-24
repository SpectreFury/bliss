"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    router.push("/");
    return;
  }

  async function logOut() {
    await signOut();
    router.push("/");
  }

  return (
    <div className="flex items-center justify-between p-4 shadow-sm rounded text-slate-800 dark:text-slate-200 bg-neutral-800 dark:bg-neutral-200">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={"#"} alt="User Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium text-white dark:text-black">
          {session.user.name}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer bg-neutral-300">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="https://github.com/SpectreFury">GitHub</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
