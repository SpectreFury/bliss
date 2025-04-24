"use client";

import Editor from "../_components/editor";
import React from "react";
import { useParams } from "next/navigation";
import { AiDialog } from "@/components/ai-dialog";

export default function NotePage() {
  const { noteId } = useParams();

  return (
    <div>
      {/* <Editor noteId={noteId as string} /> */}
    </div>
  );
}
