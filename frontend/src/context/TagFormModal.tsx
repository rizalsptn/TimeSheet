"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { usePopup } from "@/context/PopupContext";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; description: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTagId: number | null;
  setSelectedTagId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Tag {
  id: number;
  name: string;
  description?: string;
}

export default function TagFormModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onChange,
  onSubmit,
  onReset,
  isEditMode,
  setIsEditMode,
  selectedTagId,
  setSelectedTagId,
  setIsOpen,
}: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [showOnlyList, setShowOnlyList] = useState(false);
  const { showPopup } = usePopup();


  useEffect(() => {
    if (isOpen) fetchTags();
  }, [isOpen]);

  const fetchTags = async () => {
    try {
      const res = await fetch("http://localhost:3001/tags");
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error("Gagal mengambil tag:", err);
    }
  };

  const handleDelete = (id: number) => {
    const tag = tags.find((t) => t.id === id);
    if (!tag) return;
  
    showPopup({
      variant: "CONFIRM",
      title: `Hapus Tag "${tag.name}"?`,
      message: "Tag yang dihapus tidak dapat dikembalikan.",
      onConfirm: async () => {
        try {
          const res = await fetch(`http://localhost:3001/tags/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Gagal menghapus tag");
  
          setTags(tags.filter((tag) => tag.id !== id));
  
          showPopup({
            variant: "WARNING",
            title: "Tag Dihapus",
            message: `Tag "${tag.name}" telah dihapus.`,
            autoClose: true,
          });
        } catch (err) {
          showPopup({
            variant: "ERROR",
            title: "Gagal",
            message: "Terjadi kesalahan saat menghapus tag.",
          });
          console.error("Error saat menghapus tag:", err);
        }
      },
      onCancel: () => console.log("Batal hapus tag"),
    });
  };
  

  const handleEdit = (tag: Tag) => {
    setFormData({ name: tag.name, description: tag.description || "" });
    setSelectedTagId(tag.id);
    setIsEditMode(true);
    setIsOpen(true);
    setShowOnlyList(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {showOnlyList ? "Daftar Tag" : isEditMode ? "Edit Tag" : "Tambah Tag"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        {/* Toggle List/Form */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowOnlyList(!showOnlyList)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showOnlyList ? "Kembali ke Form" : "Lihat Daftar Tag"}
          </button>
        </div>

        {/* Form */}
        {!showOnlyList && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="w-full border rounded p-2"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onReset}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditMode ? "Simpan Perubahan" : "Tambah"}
              </button>
            </div>
          </form>
        )}

        {/* Tag List */}
        {showOnlyList && (
          <>
            <hr className="my-6" />
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="flex justify-between items-center border p-2 rounded hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{tag.name}</p>
                    <p className="text-sm text-gray-500">
                      {tag.description || "-"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tag)}
                      title="Edit Tag"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      title="Hapus Tag"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
