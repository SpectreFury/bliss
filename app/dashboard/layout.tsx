"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Editor from "./_components/editor";
import { ModeToggle } from "@/components/dark-mode-button";
import { useNotesStore } from "@/store/useNotesStore";
import CreateButton from "@/components/create-button";
import React, { useCallback } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = useNotesStore((state) => state.notes);
  const selectedNoteId = useNotesStore((state) => state.selectedNote);
  const updateTitle = useNotesStore((state) => state.updateTitle);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleTitleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      let newTitle = e.currentTarget.innerText.trim();

      if (newTitle === "") {
        newTitle = "Untitled Note";
      }

      if (selectedNote && newTitle !== selectedNote.title) {
        // update title store
        updateTitle(newTitle, selectedNote.id);
      }
    },
    [selectedNote, selectedNoteId]
  );

  const handleTitleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        e.currentTarget.blur();
      }
    },
    []
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />{" "}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All notes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={handleTitleBlur}
                      onKeyDown={handleTitleKeyDown}
                      className="px-1 py-0.5 rounded hover:bg-gray-100 focus:outline-none"
                    >
                      {selectedNote && selectedNote.title}
                    </div>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <CreateButton />
            <ModeToggle />
          </div>
        </header>
        <section>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
