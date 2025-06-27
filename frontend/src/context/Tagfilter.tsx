"use client";

import { useTaskContext } from "@/context/TaskContext";
import { useEffect, useState } from "react";

type Tag = {
  id: string;
  name: string;
};

export default function TagFilter() {
  const { selectedTags, setSelectedTags } = useTaskContext();
  const [tags, setTags] = useState<Tag[]>([]); // <-- ini diperbaiki

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data: Tag[]) => setTags(data)); // <-- beri tipe hasil response
  }, []);

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <label key={tag.id} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selectedTags.includes(tag.id)}
            onChange={() => toggleTag(tag.id)}
          />
          {tag.name}
        </label>
      ))}
    </div>
  );
}
