import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async () => {
    return await prisma.users.findMany();
};

export const getUserById = async (id: string) => {
    return await prisma.users.findUnique({ where: { id: Number(id) } }); // 🔹 Konversi ke number
};

export const createUser = async (data: any) => {
    return await prisma.users.create({ data });
};

export const updateUser = async (id: string, data: any) => {
    return await prisma.users.update({ where: { id: Number(id) }, data }); // 🔹 Konversi ke number
};

export const deleteUser = async (id: string) => {
    return await prisma.users.delete({ where: { id: Number(id) } }); // 🔹 Konversi ke number
};
