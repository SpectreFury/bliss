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
import Editor from "../_components/editor";
import { ModeToggle } from "@/components/dark-mode-button";
import { useNotesStore } from "@/store/useNotesStore";
import CreateButton from "@/components/create-button";
import React, { useCallback } from "react";
import { useParams } from "next/navigation";

export default function NotePage() {
  const { noteId } = useParams();

  return (
    <div>
      <Editor noteId={noteId as string} />
    </div>
  );
}
