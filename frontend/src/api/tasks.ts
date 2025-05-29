import type { NextApiRequest, NextApiResponse } from "next";
import { useAuth } from "@/context/AuthContext";

const BASE_URL = "http://localhost:3001/tasks";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = useAuth();
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      // 🔹 Ambil tugas berdasarkan userId
      console.log("userId :", user.userId);
      const response = await fetch(`${BASE_URL}?userId=${user.userId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      // 🔹 Tambah tugas baru
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` },
        body: JSON.stringify({ ...req.body, userId: user.userId }),
      });

      if (!response.ok) throw new Error("Gagal menambahkan tugas");
      const data = await response.json();
      return res.status(201).json(data);
    }

    if (req.method === "PUT") {
      // 🔹 Edit tugas berdasarkan ID
      const { id, ...body } = req.body;
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Gagal memperbarui tugas");
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      // 🔹 Hapus tugas berdasarkan ID
      const { id } = req.query;
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      if (!response.ok) throw new Error("Gagal menghapus tugas");
      return res.status(200).json({ message: "Tugas berhasil dihapus" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Terjadi kesalahan server" });
  }
}