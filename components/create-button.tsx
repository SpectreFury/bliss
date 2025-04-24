import React from "react";
import { Button } from "./ui/button";

import { FilePlus2 } from "lucide-react";

import { Note, useNotesStore } from "@/store/useNotesStore";
import { v4 as uuidv4 } from "uuid";
import { createNoteOnServer } from "@/app/_actions/notes";

const CreateButton = () => {
  const createNewNote = useNotesStore((state) => state.createNewNote);

  const handleNoteCreate = async () => {
    const title = "Untitled Note";
    const document = "Something";

    const notesArray = localStorage.getItem("notesArray");

    // Already notes
    const newNote = {
      id: uuidv4(),
      title: title,
      document: document,
    };

    if (!notesArray) {
      localStorage.setItem("notesArray", JSON.stringify([]));
    } else {
      const parsedNotes = JSON.parse(notesArray);
      console.log("This is the notes array", parsedNotes);

      parsedNotes.push(newNote);

      localStorage.setItem("notesArray", JSON.stringify(parsedNotes));
    }

    // const dbData = await createNoteOnServer({ title, document });

    // Get the idea and update the state
    // const newNote = {
    //   id: dbData.id,
    //   title: dbData.title,
    //   document: dbData.document,
    // } as Note;

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
