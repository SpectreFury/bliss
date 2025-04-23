import { create } from "zustand";

interface Note {
  id: string;
  title: string;
}

interface NotesState {
  selectedNote: string;
  notes: Note[];
  setSelectedNote: (id: string) => void;
  updateTitle: (newTitle: string, id: string) => void;
  createNewNote: (note: Note) => void;
}

const useNotesStore = create<NotesState>((set) => ({
  selectedNote: "1",
  notes: [
    {
      id: "1",
      title: "Game dev guide",
    },
    {
      id: "2",
      title: "How to improve",
    },
  ],
  setSelectedNote: (id: string) => set((state) => ({ selectedNote: id })),
  updateTitle: (newTitle: string, id: string) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      ),
    })),
  createNewNote: (note: Note) =>
    set((state) => ({ notes: [...state.notes, note] })),
}));

export { useNotesStore, type Note };
