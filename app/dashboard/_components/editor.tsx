"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

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
  const editor = useCreateBlockNote();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { resolvedTheme } = useTheme();

  const handleChange = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const doc = editor.document;
    }, 1000);
  }, [editor]);

  useEffect(() => {}, [noteId]);

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
