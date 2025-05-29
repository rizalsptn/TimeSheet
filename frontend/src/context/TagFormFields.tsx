// components/TaskFormFields.tsx

import React from "react";

interface TagFormFieldsProps {
  formData: {
    name: string;
    description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
}

const TagFormFields: React.FC<TagFormFieldsProps> = ({ formData, onChange, onReset }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nama Tag</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Keterangan</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Simpan
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Batal
        </button>
      </div>
    </>
  );
};

export default TagFormFields;
