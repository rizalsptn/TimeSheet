import prisma from "../config/db"
import type { Task } from "../models/tasks.model";


export const getAllTasks = async function() {
  return await prisma.tasks.findMany();
}

export const getSingleTask = async function (id: number) {
  const task = await prisma.tasks.findUnique({
    where: { id },
    include: {
      task_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!task) return null;

  return {
    ...task,
    tag_ids: task.task_tags.map((tt) => tt.tag_id),
    tags: task.task_tags.map((tt) => tt.tags),
  };
};


export const modifyTask = async function(id: number, body: Task) {
  return await prisma.tasks.update({ where: { id: id }, data: body }); // 🔹 Konversi ke number
}

export const removeTask = async function(id: number) {
  return await prisma.tasks.delete({ where: { id: id } }); // 🔹 Konversi ke number
}

export const addTask = async function(body: Task, user_id: number) {
  const taskDate = new Date(body.task_date);
  if (isNaN(taskDate.getTime())) {
    throw new Error("Invalid task_date: must be a valid date");
  }

  return await prisma.tasks.create({
    data: {
      ...body,
      user_id,
      task_date: taskDate,
    }
  });
}



export const getTasksByUserId = async function(user_id: number) {
  return await prisma.tasks.findMany({ where: { user_id: user_id } }); // 🔹 Konversi ke number
}

export const checkTaskOwnership = async (taskId: number, userId: number) => {
  const task = await prisma.tasks.findUnique({ where: { id: taskId } });
  if (!task || task.user_id !== userId) return null;
  return task;
};
