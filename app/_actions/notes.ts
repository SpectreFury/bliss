"use server";

import { prisma } from "@/utils/prisma";

export async function createNoteOnServer(data: {
  title: string;
  document: string;
}) {
  return prisma.note.create({ data });
}

export async function getNotesFromDb() {
  const data = await prisma.note.findMany();

  return data;
}

export async function getNoteFromDb(id: string) {
  const data = await prisma.note.findUnique({ where: { id: id } });

  return data;
}

export async function setNoteDocument(document: string, id: string) {
  const data = await prisma.note.update({
    where: { id: id },
    data: { document: document },
  });

  return data;
}
