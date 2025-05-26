import prisma from "../config/db";
import type { TaskTag } from "../models/tasktags.model";

export const getAllTaskTags = async () => {
  return await prisma.task_tags.findMany();
};

export const getSingleTaskTag = async ({
  params,
}: {
  params: { id: string };
}) => await prisma.task_tags.findUnique({ where: { id: Number(params.id) } });

export const getTasksTagsByTaskId = async ({
  params,
}: {
  params: { task_id: string };
}) =>
  await prisma.task_tags.findMany({
    where: { task_id: Number(params.task_id) },
  });

export const addTaskTag = async ({ body }: { body: TaskTag }) => {
  try {
    const created = await prisma.task_tags.create({ data: body });
    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gagal menambahkan task tag:", error);
    return new Response(
      JSON.stringify({ error: "Gagal menambahkan task tag" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const modifyTaskTag = async ({
  params,
  body,
}: {
  params: { id: string };
  body: TaskTag;
}) => {
  return await prisma.task_tags.update({
    where: { id: Number(params.id) },
    data: body,
  });
};

export const removeTaskTag = async ({
  params,
}: {
  params: { task_id: string; tag_id: string };
}) => {
  return await prisma.task_tags.delete({
    where: { id: Number(params.task_id) },
  });
};

export const removeAllTagsByTaskId = async ({ params }: { params: { task_id: string } }) => {
  try {
    const result = await prisma.task_tags.deleteMany({
      where: { task_id: Number(params.task_id) },
    });

    return new Response(
      JSON.stringify({ message: "Berhasil menghapus semua tag", count: result.count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Gagal menghapus tag lama:", error);
    return new Response(
      JSON.stringify({ error: "Gagal menghapus tag lama." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

