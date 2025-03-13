import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../models/users.model";

export const getAllUsers = async () => {
  return getUsers();
};

export const getSingleUser = async ({ params }: { params: { id: string } }) => {
  return getUserById(params.id);
};

export const addUser = async ({ body }: { body: any }) => {
  return createUser(body);
};

export const modifyUser = async ({ params, body }: { params: { id: string }; body: any }) => {
  return updateUser(params.id, body);
};

export const removeUser = async ({ params }: { params: { id: string } }) => {
  return deleteUser(params.id);
};
