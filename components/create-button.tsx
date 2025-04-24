import React from "react";
import { Button } from "./ui/button";

import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNotesStore } from "@/store/useNotesStore";

const CreateButton = () => {
  const { addNote } = useNotesStore();
  const notesRef = collection(db, "notes");

  const handleNoteCreate = async () => {
    // Create the note in firebase
    const title = "Untitled Note";
    const doc = await addDoc(notesRef, {
      title,
      createdAt: serverTimestamp(),
    });

    // Create it in state
    addNote({
      id: doc.id,
      title,
    });

    toast("Note has been created successfully");
    // Show toast
    try {
    } catch (error) {
      console.log("handleNoteCreate error", error);
    }
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
