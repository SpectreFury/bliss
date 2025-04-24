import { create } from "zustand";

interface DialogStore {
  open: boolean;
  noteContent: string;
  setOpen: (value: boolean) => void;
  setNoteContent: (content: string) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  open: false,
  noteContent: "",
  setOpen: (value: boolean) => set((state) => ({ open: value })),
  setNoteContent: (content: string) =>
    set((state) => ({ noteContent: content })),
}));

export { useDialogStore };
