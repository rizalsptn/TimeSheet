"use client";

import { useEffect, useState } from "react";
import { usePopup } from "@/context/PopupContext";
import TagFormModal from "@/context/TagFormModal"; 

export default function PopupManager() {
  const { popup, closePopup } = usePopup();
  const [isTagFormOpen, setTagFormOpen] = useState(false);

  const [tagFormData, setTagFormData] = useState({
    name: "",
    description: ""
  });

  const handleTagFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTagFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/tags/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagFormData),
      });
      handleTagFormReset();
      closePopup();
    } catch (err) {
      console.error("Gagal menyimpan tag:", err);
    }
  };

  const handleTagFormReset = () => {
    setTagFormData({ name: "", description: "" });
    setTagFormOpen(false);
  };

  useEffect(() => {
    if (popup.isOpened && popup.autoClose) {
      const timer = setTimeout(() => closePopup(), 2000);
      return () => clearTimeout(timer);
    }
  }, [popup.isOpened, popup.autoClose, closePopup]);

  if (!popup.isOpened) return null;

  return (
    <>
      {/* TagFormModal jika dibutuhkan */}
      {isTagFormOpen && (
        <TagFormModal
          isOpen={true}
          onClose={handleTagFormReset}
          formData={tagFormData}
          onChange={handleTagFormChange}
          onSubmit={handleTagFormSubmit}
          onReset={handleTagFormReset}
        />
      )}

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-lg font-bold mb-2">{popup.title}</h2>
          <p className="mb-4">{popup.message}</p>

          <div className="flex justify-end gap-2">
            {popup.variant === "CONFIRM" ? (
              <>
                {popup.onCancel && (
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => {
                      popup.onCancel?.();
                      closePopup();
                    }}
                  >
                    Batal
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => {
                    popup.onConfirm?.();
                    closePopup();
                  }}
                >
                  Hapus
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={closePopup}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
