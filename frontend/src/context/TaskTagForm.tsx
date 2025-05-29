"use client";

import { useEffect, useState } from "react";

type Tag = {
  id: number;
  name: string;
};

type Props = {
  selectedTagIds: number[];
  onChange: (tagIds: number[]) => void;
};

const TagSelector = ({ selectedTagIds, onChange }: Props) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch("http://localhost:3001/tags"); 
      const data = await res.json();
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleCheckboxChange = (tagId: number) => {
    const newTagIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    onChange(newTagIds);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Tags</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <label key={tag.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={tag.id}
              checked={selectedTagIds.includes(tag.id)}
              onChange={() => handleCheckboxChange(tag.id)}
            />
            {tag.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
