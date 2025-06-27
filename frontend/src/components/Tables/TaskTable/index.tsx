"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tagColors } from "@/utils/tagcolor";
import TaskModal from "./taskmodal";
import TagFormModal from "@/context/TagFormModal";

interface Task {
  id: number;
  name: string;
  description: string;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
}

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // Tag form modal state
  const [isTagFormOpen, setIsTagFormOpen] = useState(false);
  const [tagFormData, setTagFormData] = useState({ name: "", description: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const [resTasks, resTaskTags, resTags] = await Promise.all([
        fetch(`http://localhost:3001/tasks/${localStorage.getItem("userId")}`),
        fetch("http://localhost:3001/tasktags/"),
        fetch("http://localhost:3001/tags/"),
      ]);

      const [dataTasks, dataTaskTags, dataTags] = await Promise.all([
        resTasks.json(),
        resTaskTags.json(),
        resTags.json(),
      ]);

      const enrichedTasks = dataTasks.map((task: any) => {
        const relatedTagIds = dataTaskTags
          .filter((tt: any) => tt.task_id === task.id)
          .map((tt: any) => tt.tag_id);
        const relatedTags = dataTags.filter((tag: any) =>
          relatedTagIds.includes(tag.id)
        );
        return { ...task, tags: relatedTags };
      });

      setTasks(enrichedTasks);
      setAllTags(dataTags);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
    setLoading(false);
  };

  const handleTagFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTagFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagFormReset = () => {
    setTagFormData({ name: "", description: "" });
    setIsTagFormOpen(false);
    setIsEditMode(false);
    setSelectedTagId(null);
  };

  const handleTagFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode
        ? `http://localhost:3001/tags/${selectedTagId}`
        : "http://localhost:3001/tags";

      const method = isEditMode ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tagFormData),
      });

      fetchTasks();
      handleTagFormReset();
    } catch (err) {
      console.error("Gagal menyimpan tag:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => task.tags.some((t) => t.id === tag.id));
    return matchesSearch && matchesTags;
  });

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (id: number) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== id));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex justify-between items-center gap-4 mb-4">
        <button
          onClick={() => setIsTagFormOpen(true)}
          className="p-2 border rounded hover:bg-gray-100"
          title="Tambah Tag"
        >
          🏷️
        </button>

        <input
          type="text"
          placeholder="Cari nama tugas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          onChange={(e) => {
            const tag = allTags.find((t) => t.id === parseInt(e.target.value));
            if (tag) handleTagSelect(tag);
          }}
          className="border p-2 rounded w-60"
        >
          <option value="">Filter tag...</option>
          {allTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map((tag, index) => (
            <span
              key={tag.id}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${tagColors[index % tagColors.length]}`}
            >
              {tag.name}
              <button onClick={() => handleRemoveTag(tag.id)} className="ml-1 text-white font-bold">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">No</TableHead>
              <TableHead className="text-center">Nama Tugas</TableHead>
              <TableHead className="text-center">Deskripsi</TableHead>
              <TableHead className="text-center">Tags</TableHead>
              <TableHead className="w-24 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task, index) => (
              <TableRow key={task.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{task.name}</TableCell>
                <TableCell className="text-center">{task.description || "Tidak ada deskripsi"}</TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {task.tags.map((tag, idx) => (
                      <span
                        key={tag.id}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${tagColors[idx % tagColors.length]}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => setSelectedTaskId(task.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selectedTaskId && (
        <TaskModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onSuccess={() => {
            setSelectedTaskId(null);
            fetchTasks();
          }}
        />
      )}

      <TagFormModal
        isOpen={isTagFormOpen}
        onClose={handleTagFormReset}
        formData={tagFormData}
        setFormData={setTagFormData}
        onChange={handleTagFormChange}
        onSubmit={handleTagFormSubmit}
        onReset={handleTagFormReset}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        selectedTagId={selectedTagId}
        setSelectedTagId={setSelectedTagId}
        setIsOpen={setIsTagFormOpen}
      />
    </div>
  );
}
