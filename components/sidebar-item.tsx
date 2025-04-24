import React from "react";

import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ChevronRight, Trash } from "lucide-react";

import { Note, useNotesStore } from "@/store/useNotesStore";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

type SidebarProps = {
  item: Note;
};

const SidebarItem = ({ item }: SidebarProps) => {
  const router = useRouter();

  const { selectedNote, setSelectedNote, removeNote } = useNotesStore();

  const handleItemClick = () => {
    setSelectedNote(item.id);
    router.push(`/dashboard/${item.id}`);
  };

  const deleteNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const docRef = doc(db, "notes", item.id);
      await deleteDoc(docRef);

      removeNote(item.id);

      toast("Note has been deleted successfully");
    } catch (error) {
      console.log(error);
    }
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
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <ChevronRight size={16} />
            <span className="font-medium">{item.title}</span>
          </div>
          <Button variant="outline" className="w-4 h-7" onClick={deleteNote}>
            <Trash className="text-red-500" />
          </Button>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarItem;
