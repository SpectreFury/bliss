"use client";

import { getUser, signout } from "@/app/(auth)/login/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function SidebarProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading || !data?.user) {
    return (
      <div className="flex items-center justify-between p-4 bg-muted shadow-sm">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    );
  }

  const avatarUrl = data.user.user_metadata.avatar_url;
  const fullName = data.user.user_metadata.full_name;

  return (
    <div className="flex items-center justify-between p-4 shadow-sm rounded text-slate-800 dark:text-slate-200 bg-neutral-800 dark:bg-neutral-200">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt="User Avatar" />
          <AvatarFallback>{fullName?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium text-white dark:text-black">
          {fullName}
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => signout()}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
