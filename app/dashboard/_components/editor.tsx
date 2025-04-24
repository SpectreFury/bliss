"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { getNoteFromDb, setNoteDocument } from "@/app/_actions/notes";
import { useNotesStore } from "@/store/useNotesStore";
import { useDialogStore } from "@/store/useDialogStore";

type NoteDatabase = {
  id: string;
  title: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
};

type EditorProps = {
  noteId: string;
};

const Editor = ({ noteId }: EditorProps) => {
  const savedNote = localStorage.getItem(noteId);
  const setNoteContent = useDialogStore((state) => state.setNoteContent);

  const editor = useCreateBlockNote({
    initialContent: savedNote ? JSON.parse(savedNote) : null,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { resolvedTheme } = useTheme();

  const getNote = async (noteId: string) => {
    try {
      const note = await getNoteFromDb(noteId);

      if (!note) throw new Error("No note found in the DB");
    } catch (error) {
      console.log(error);
    }
  };

  const setNoteInDb = async (doc: string) => {
    const data = await setNoteDocument(JSON.stringify(doc), noteId);

    console.log("Note saved in database", data);
  };

  const handleChange = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const doc = editor.document;

      setNoteInDb(JSON.stringify(doc));
      localStorage.setItem(noteId, JSON.stringify(doc));
      setNoteContent(JSON.stringify(doc));
    }, 1000);
  }, [editor]);

  useEffect(() => {
    console.log("Fetching the note with id: ", noteId);
    getNote(noteId);
  }, [noteId]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  });

  return (
    <section className="mt-10 ml-10">
      <BlockNoteView
        onChange={handleChange}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </section>
  );
};

export default Editor;
