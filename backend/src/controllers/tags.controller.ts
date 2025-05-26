import prisma from "../config/db";
import type { Tag } from "../models/tags.model";

export const getAllTags = async () => {
  return await prisma.tags.findMany();
};

export const getSingleTag = async ({ params }: { params: { id: string } }) => {
  return await prisma.tags.findUnique({ where: { id: Number(params.id) } });
};

// Tambah tag baru
export const addTag = async ({ body }: { body: Tag }) => {
  return await prisma.tags.create({ data: body });
};

// Ubah tag berdasarkan ID
export const modifyTag = async ({
  params,
  body,
}: {
  params: { id: string };
  body: Partial<Tag>;
}) => {
  return await prisma.tags.update({ where: { id: Number(params.id) }, data: body });
};

// Hapus tag berdasarkan ID
export const removeTag = async ({ params }: { params: { id: string } }) => {
  return await prisma.tags.delete({ where: { id: Number(params.id) } });
};