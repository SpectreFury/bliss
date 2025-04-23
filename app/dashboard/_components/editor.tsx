"use client";

import React, { useCallback } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

type EditorProps = {
  noteId: string;
};

const Editor = ({}: EditorProps) => {
  const editor = useCreateBlockNote({});

  const { resolvedTheme } = useTheme();

  const handleChange = useCallback(() => {
    const document = editor.document;

    console.log("Editor content changed", document);
  }, [editor]);

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
