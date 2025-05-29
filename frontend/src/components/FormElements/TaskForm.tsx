"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePopup } from "@/context/PopupContext";
import TaskFormFields from "@/context/TaskFormFields";

const TaskForm = () => {
  const { showPopup } = usePopup();
  const router = useRouter();

  const [tagOptions, setTagOptions] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    task_date: "",
    from_time: "",
    until_time: "",
    description: "",
    tag_ids: [] as number[],
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tags/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTagOptions(data);
        } else {
          console.error("Gagal mengambil data tags");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  
  // ✅ Penyesuaian handleChange
  const handleChange = (
    name: string,
    value: string | number | number[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      task_date: "",
      from_time: "",
      until_time: "",
      description: "",
      tag_ids: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      showPopup({
        variant: "ERROR",
        title: "Tidak Terautentikasi",
        message: "User tidak terautentikasi, harap login terlebih dahulu.",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/tasks/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          task_date: formData.task_date,
          from_time: formData.from_time,
          until_time: formData.until_time,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showPopup({
          variant: "ERROR",
          title: "Gagal",
          message: errorData.error || "Gagal menyimpan tugas.",
        });
        return;
      }

      const responseData = await response.json();
      const taskId = responseData.id;

      await Promise.all(
        formData.tag_ids.map((tagId) =>
          fetch("http://localhost:3001/tasktags/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              tag_id: tagId,
              task_id: taskId,
            }),
          })
        )
      ).then(async (responses) => {
        for (const response of responses) {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Gagal menyimpan tag tugas.");
          }
        }
      }).catch((e) => {
        throw new Error(e);
      });      

      showPopup({
        variant: "SUCCESS",
        title: "Berhasil",
        message: "Tugas berhasil ditambahkan!",
        onConfirm: () => router.push("/tables"),
      });

      resetForm();

      setTimeout(() => {
        router.push("/tables");
      }, 2600);
    } catch (error) {
      console.error(error);
      showPopup({
        variant: "ERROR",
        title: "Kesalahan",
        message: "Terjadi kesalahan saat menyimpan tugas : " + error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <TaskFormFields
        formData={formData}
        onChange={handleChange}
        onReset={resetForm}
        selectionData={tagOptions}
      />
    </form>
  );
};

export default TaskForm;