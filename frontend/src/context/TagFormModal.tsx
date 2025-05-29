"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TagFormFields from "@/context/TagFormFields";

interface TagFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; description: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export default function TagFormModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  onReset
}: TagFormModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tambah Tag</h2>
        <form onSubmit={onSubmit}>
          <TagFormFields
            formData={formData}
            onChange={onChange}
            onReset={onReset}
          />
        </form>
      </div>
    </div>,
    document.body
  );
}
