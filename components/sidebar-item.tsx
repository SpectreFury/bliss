import React from "react";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronRight } from "lucide-react";

import { useNotesStore } from "@/store/useNotesStore";

type SidebarProps = {
  item: {
    id: number;
    title: string;
  };
};

const SidebarItem = ({ item }: SidebarProps) => {
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const setSelectedNote = useNotesStore((state) => state.setSelectedNote);

  const handleItemClick = () => {
    setSelectedNote(item.id);
  };

  return (
    <SidebarMenuItem
      className={`flex items-center gap-2 ${
        selectedNote === item.id ? "bg-gray-200 dark:bg-gray-800" : ""
      }`}
    >
      <SidebarMenuButton
        onClick={handleItemClick}
        className={
          selectedNote ? "hover:bg-gray-200 hover:dark:bg-gray-800" : ""
        }
      >
        <div className="flex items-center gap-2">
          <ChevronRight size={16} />
          <span className="font-medium">{item.title}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarItem;
