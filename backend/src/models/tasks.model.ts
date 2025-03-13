import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Ambil semua tugas
export const getTasks = async () => {
  return await prisma.tasks.findMany();
};

// ✅ Ambil tugas berdasarkan ID
export const getTaskById = async (id: number) => {
  return await prisma.tasks.findUnique({ where: { id } });
};

// ✅ Tambahkan tugas baru dengan validasi tipe data
export const createTask = async (data: any) => {
  return await prisma.tasks.create({
    data: {
      user_id: Number(data.user_id), // Pastikan user_id bertipe number
      name: data.name,
      task_date: new Date(data.task_date), // Konversi ke Date agar sesuai dengan database
      from_time: new Date(`1970-01-01T${data.from_time}:00Z`), // Format waktu yang valid
      until_time: new Date(`1970-01-01T${data.until_time}:00Z`), // Format waktu yang valid
      description: data.description || "", // Jika tidak ada deskripsi, set default ""
      created: new Date(), // Waktu pembuatan otomatis
      modified: new Date(), // Waktu terakhir diperbarui otomatis
    },
  });
};

// ✅ Update tugas berdasarkan ID
export const updateTask = async (id: number, data: any) => {
  return await prisma.tasks.update({
    where: { id },
    data: {
      name: data.name,
      task_date: new Date(data.task_date),
      from_time: new Date(`1970-01-01T${data.from_time}:00Z`),
      until_time: new Date(`1970-01-01T${data.until_time}:00Z`),
      description: data.description || "",
      modified: new Date(), // Update waktu terakhir diperbarui
    },
  });
};

// ✅ Hapus tugas berdasarkan ID
export const deleteTask = async (id: number) => {
  return await prisma.tasks.delete({ where: { id } });
};
