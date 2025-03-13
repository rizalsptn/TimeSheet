import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTaskTags = async () => {
  return await prisma.task_tags.findMany();
};

export const getTaskTagById = async (task_id: number, tag_id: number) => {
  return await prisma.task_tags.findUnique({
    where: { task_id_tag_id: { task_id, tag_id } } // Gunakan composite key
  });
};

export const createTaskTag = async (data: { task_id: number; tag_id: number }) => {
  return await prisma.task_tags.create({ data });
};

export const updateTaskTag = async (id: number, data: any) => {
  return await prisma.task_tags.update({ where: { id }, data });
};

export const deleteTaskTag = async (task_id: number, tag_id: number) => {
  return await prisma.task_tags.delete({
    where: { task_id_tag_id: { task_id, tag_id } } // Gunakan composite key
  });
};
