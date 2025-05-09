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

import { Note, useNotesStore } from "@/store/useNotesStore";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { notes, setNotes } = useNotesStore();
  const notesRef = collection(db, "notes");
  const [user] = useAuthState(auth);

  const getNotes = async () => {
    if (!user) return;

    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("user", "==", user.uid));

    // Get notes from firebase
    const snapshot = await getDocs(q);

    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(notes as Note[]);
  };

  useEffect(() => {
    getNotes();
  }, [user]);

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
