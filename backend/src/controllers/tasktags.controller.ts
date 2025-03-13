import { createTaskTag, deleteTaskTag, getTaskTagById, getTaskTags, updateTaskTag } from "../models/tasktags.model";

export const getAllTaskTags = async () => {
  return getTaskTags();
};

export const getSingleTaskTag = async ({ params }: { params: { task_id: string; tag_id: string } }) => {
  return getTaskTagById(Number(params.task_id), Number(params.tag_id));
};

export const addTaskTag = async ({ body }: { body: { task_id: number; tag_id: number } }) => {
  return createTaskTag(body);
};

export const modifyTaskTag = async ({ params, body }: { params: { id: string }; body: any }) => {
  return updateTaskTag(Number(params.id), body);
};

export const removeTaskTag = async ({ params }: { params: { task_id: string; tag_id: string } }) => {
  return deleteTaskTag(Number(params.task_id), Number(params.tag_id));
};