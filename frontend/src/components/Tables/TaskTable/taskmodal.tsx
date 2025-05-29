// components/TaskModal.tsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { usePopup } from "@/context/PopupContext";
import TaskFormFields from "@/context/TaskFormFields";
import  Tag  from "@/context/TaskTagForm";

interface Tag {
  id: number;
  name: string;
}
interface Task {
  id: number;
  user_id: number;
  name: string;
  task_date: string;
  from_time: string;
  until_time: string;
  description: string;
  tag_ids?: number[];
  tags: Tag[];
  created: string;
  modified: string;
}



interface TaskModalProps {
  taskId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TaskModal({ taskId, onClose, onSuccess }: TaskModalProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    task_date: "",
    from_time: "",
    until_time: "",
    description: "",
    tag_ids: [] as number[],
  });

  const { showPopup } = usePopup();

  const [tagOptions, setTagOptions] = useState<{ id: number; name: string }[]>([]);

useEffect(() => {
  const fetchTags = async () => {
    try {
      const res = await fetch("http://localhost:3001/tags/", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Gagal fetch tags");
      const data = await res.json();
      setTagOptions(data);
    } catch (err) {
      
      console.error("Gagal mengambil tags:", err);
    }
  };

  fetchTags();
}, []);


  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/tasks_single/${taskId}`);
        const data = await response.json();
        setTask(data);
        setForm({
          name: data.name,
          task_date: data.task_date.slice(0, 10),
          from_time: data.from_time,
          until_time: data.until_time,
          description: data.description || "",
          tag_ids: data.tag_ids ?? [],
        });
      } catch (error) {
        console.error("Gagal mengambil data tugas:", error);
      }
      setLoading(false);
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (
    name: string,
    value: string | number | number[]
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleUpdate = async () => {
    try {
      // 1. Update data utama
      const res = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          task_date: new Date(form.task_date).toISOString(),
          from_time: form.from_time,
          until_time: form.until_time,
          description: form.description,
        }),
      });
  
      if (!res.ok) throw new Error("Update data tugas gagal");
  
      // 2. Update tags
      // Hapus tag sebelumnya
      const deleteRes = await fetch(`http://localhost:3001/tasktags/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!deleteRes.ok) throw new Error("Gagal menghapus tag lama");
  
      // Tambah tag baru
      const tagResults = await Promise.all(
        form.tag_ids.map((tagId) =>
          fetch("http://localhost:3001/tasktags/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ task_id: taskId, tag_id: tagId }),
          })
        )
      );
  
      const failedTag = tagResults.find((res) => !res.ok);
      if (failedTag) throw new Error("Gagal menambahkan tag baru");
  
      // ✅ Semua berhasil
      showPopup({
        variant: "SUCCESS",
        title: "Berhasil",
        message: "Tugas dan tag berhasil diperbarui.",
        autoClose: false,
      });
  
      onSuccess();
      setIsEditing(false);
    } catch (err) {
      showPopup({
        variant: "ERROR",
        title: "Gagal",
        message: "Terjadi kesalahan saat memperbarui data tugas atau tag.",
      });
      console.error(err);
    }
  };
  

  const handleDelete = () => {
    if (!task) return;

    showPopup({
      variant: "CONFIRM",
      title: "Yakin ingin menghapus?",
      message: "Data yang dihapus tidak bisa dikembalikan.",
      onConfirm: async () => {
        try {
          const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) throw new Error("Gagal hapus");

          showPopup({
            variant: "WARNING",
            title: "Berhasil",
            message: "Tugas berhasil dihapus.",
          });

          onSuccess();
        } catch (err) {
          showPopup({
            variant: "ERROR",
            title: "Gagal",
            message: "Terjadi kesalahan saat menghapus tugas.",
          });
        }
      },
      onCancel: () => console.log("User batal hapus"),
    });
  };

  if (!taskId || !task) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Detail Tugas</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {loading ? (
          <p className="mt-4">Memuat data...</p>
        ) : (
          <div className="mt-4 space-y-2">
            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
<TaskFormFields
  formData={form}
  onChange={handleChange}
  onReset={() => {
    setIsEditing(false);
    if (task) {
      setForm({
        name: task.name,
        task_date: task.task_date.slice(0, 10),
        from_time: task.from_time,
        until_time: task.until_time,
        description: task.description || "",
        tag_ids: task.tag_ids || [],
      });
    }
  }}
  selectionData={tagOptions}
/>

              </form>
            ) : (
<div className="grid grid-cols-[max-content_10px_1fr] gap-y-2 items-start">
  <p className="font-semibold text-left">Nama</p>
  <p className="text-right">:</p>
  <p>{task.name}</p>

  <p className="font-semibold text-left">Tanggal</p>
  <p className="text-right">:</p>
  <p>
    {new Date(task.task_date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  <p className="font-semibold text-left">Waktu Mulai</p>
  <p className="text-right">:</p>
  <p>{task.from_time}</p>

  <p className="font-semibold text-left">Waktu Selesai</p>
  <p className="text-right">:</p>
  <p>{task.until_time}</p>

  <p className="font-semibold text-left">Deskripsi</p>
  <p className="text-right">:</p>
  <p>{task.description || "Tidak ada deskripsi"}</p>

  <p className="font-semibold text-left">Tags</p>
  <p className="text-right">:</p>
  <p>
  {task.tags && task.tags.length > 0
    ? task.tags.map((tag) => tag.name).join(", ")
    : "Tidak ada tag"}
</p>

  <p className="font-semibold text-left">Dibuat</p>
  <p className="text-right">:</p>
  <p>
    {new Date(task.created).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  <p className="font-semibold text-left">Diubah</p>
  <p className="text-right">:</p>
  <p>
    {new Date(task.modified).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>
</div>

            )}
          </div>
        )}

        {!isEditing && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
