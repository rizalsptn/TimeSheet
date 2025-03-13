import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../models/tasks.model";

// ✅ Ambil semua tugas
export const getAllTasks = async () => {
  return getTasks();
};

// ✅ Ambil satu tugas berdasarkan ID
export const getSingleTask = async ({ params }: { params: { id: string } }) => {
  return getTaskById(Number(params.id));
};

// ✅ Tambahkan tugas baru dengan validasi
export const addTask = async ({ body }: { body: any }) => {
  if (!body || !body.user_id || !body.name || !body.task_date || !body.from_time || !body.until_time) {
    throw new Error("Semua field tugas harus diisi!");
  }
  return createTask(body);
};

// ✅ Perbarui tugas berdasarkan ID
export const modifyTask = async ({ params, body }: { params: { id: string }; body: any }) => {
  return updateTask(Number(params.id), body);
};

// ✅ Hapus tugas berdasarkan ID
export const removeTask = async ({ params }: { params: { id: string } }) => {
  return deleteTask(Number(params.id));
};
