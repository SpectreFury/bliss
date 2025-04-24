"use client";

import React, { useEffect } from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import SidebarProfile from "@/app/dashboard/_components/sidebar-profile";
import SidebarItem from "./sidebar-item";

import { useNotesStore } from "@/store/useNotesStore";
import { getNotesFromDb } from "@/app/_actions/notes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notes = useNotesStore((state) => state.notes);
  const setNotes = useNotesStore((state) => state.setNotes);

  // Fetch all notes from the user

  const getUsers = async () => {
    const notesFromDb = await getNotesFromDb();

    setNotes(notesFromDb);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SearchForm />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">All Notes</span>
                    </div>
                    <div className="text-muted-foreground">{notes.length}</div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarProfile />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
