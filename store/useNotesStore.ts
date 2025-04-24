import { create } from "zustand";

import { type Block } from "@blocknote/core";

interface Note {
  id: string;
  title: string;
}

interface NotesState {
  selectedNote: string | null;
  notes: Note[];
  setSelectedNote: (id: string) => void;
  updateTitle: (newTitle: string, id: string) => void;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
}

const useNotesStore = create<NotesState>((set, get) => ({
  selectedNote: null,
  notes: [],
  setSelectedNote: (id: string) => set((state) => ({ selectedNote: id })),
  updateTitle: (newTitle: string, id: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      ),
    })),
  setNotes: (notes: Note[]) => set((state) => ({ notes: notes })),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
}));

export { useNotesStore, type Note };
