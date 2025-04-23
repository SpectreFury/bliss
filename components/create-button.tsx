import React from "react";
import { Button } from "./ui/button";

import { FilePlus2 } from "lucide-react";

import { Note, useNotesStore } from "@/store/useNotesStore";
import { v4 as uuidv4 } from "uuid";

const CreateButton = () => {
  const createNewNote = useNotesStore((state) => state.createNewNote);

  const handleNoteCreate = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
    } as Note;

    createNewNote(newNote);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={handleNoteCreate}
    >
      <FilePlus2 />
    </Button>
  );
};

export default CreateButton;
