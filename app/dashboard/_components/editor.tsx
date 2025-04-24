"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Block } from "@blocknote/core";

type EditorProps = {
  noteId: string;
};

const Editor = ({ noteId }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getEditorContent = async () => {
    const docRef = doc(db, "notes", noteId);
    const docSnapshot = await getDoc(docRef);

    const data = docSnapshot.data();
    if (!data?.note) return;

    const blocks = JSON.parse(data.note) as Block[];

    if (editor && Array.isArray(blocks)) {
      const existingIds = editor.document.map((b) => b.id);

      editor.replaceBlocks(existingIds, blocks);
    }
  };

  const handleChange = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      const docRef = doc(db, "notes", noteId);

      await updateDoc(docRef, {
        note: JSON.stringify(editor.document),
      });

      toast("Updated the notes to the database");
    }, 1000);
  }, [editor]);

  useEffect(() => {
    getEditorContent();
  }, []);

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
