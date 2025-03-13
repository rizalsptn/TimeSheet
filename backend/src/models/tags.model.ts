import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTags = async () => {
  return await prisma.tags.findMany();
};

export const getTagById = async (id: number) => {
  return await prisma.tags.findUnique({ where: { id } });
};

export const createTag = async (data: any) => {
  return await prisma.tags.create({ data });
};

export const updateTag = async (id: number, data: any) => {
  return await prisma.tags.update({ where: { id }, data });
};

export const deleteTag = async (id: number) => {
  return await prisma.tags.delete({ where: { id } });
};
