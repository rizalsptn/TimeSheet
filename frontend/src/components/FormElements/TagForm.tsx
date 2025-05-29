"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePopup } from "@/context/PopupContext";
import TagFormFields from "@/context/TagFormFields";

const TagForm = () => {
  const { showPopup } = usePopup();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/tags/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showPopup({
          variant: "ERROR",
          title: "Gagal",
          message: errorData.error || "Gagal menyimpan Tag.",
        });
        showPopup({
            variant: "ERROR",
            title: "Kesalahan",
            message: "Terjadi kesalahan saat menyimpan : " + errorData.error,
          });
        return;
      }

      showPopup({
        variant: "SUCCESS",
        title: "Berhasil",
        message: "Tag berhasil ditambahkan!",
        onConfirm: () => router.push("/tables"),
      });

      resetForm();

      setTimeout(() => {
        router.push("/tags");
      }, 2600);
    } catch (error) {
      console.error(error);
      showPopup({
        variant: "ERROR",
        title: "Kesalahan",
        message: "Terjadi kesalahan saat menyimpan tag.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <TagFormFields formData={formData} onChange={handleChange} onReset={resetForm} />
    </form>
  );
};

export default TagForm;