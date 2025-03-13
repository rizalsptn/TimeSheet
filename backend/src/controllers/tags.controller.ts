import { createTag, deleteTag, getTagById, getTags, updateTag } from "../models/tags.model";

export const getAllTags = async () => {
  return getTags();
};

export const getSingleTag = async ({ params }: { params: { id: string } }) => {
  return getTagById(Number(params.id));
};

export const addTag = async ({ body }: { body: any }) => {
  return createTag(body);
};

export const modifyTag = async ({ params, body }: { params: { id: string }; body: any }) => {
  return updateTag(Number(params.id), body);
};

export const removeTag = async ({ params }: { params: { id: string } }) => {
  return deleteTag(Number(params.id));
};
