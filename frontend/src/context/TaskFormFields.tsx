import React, { useEffect, useState } from "react";
import Select from "react-select";
type FormData = {
  name: string;
  task_date: string;
  from_time: string;
  until_time: string;
  description: string;
  tag_ids: number[]; // ✅ Tambahkan field ini
};

type TaskFormFieldsProps = {
  formData: FormData;
  onChange: (
    name: string,
    value: string | number | number[]
  ) => void;
  onReset: () => void;
  selectionData: { id: number; name: string }[];
};

const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  formData,
  onChange,
  onReset,
  selectionData,
}) => {
  // ✅ Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value);
    let updatedTags = [...formData.tag_ids];

    if (e.target.checked) {
      updatedTags.push(id);
    } else {
      updatedTags = updatedTags.filter(tagId => tagId !== id);
    }

    onChange("tag_ids", updatedTags);
  };

  return (
    <>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Nama Pekerjaan
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Tanggal
        </label>
        <input
          type="date"
          name="task_date"
          value={formData.task_date}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          required
        />
      </div>

      <div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-gray-700">
    Tag
  </label>
  <Select
    isMulti
    options={selectionData.map((item) => ({
      value: item.id,
      label: item.name,
    }))}
    value={selectionData
      .filter((item) => formData.tag_ids.includes(item.id))
      .map((item) => ({
        value: item.id,
        label: item.name,
      }))
    }
    onChange={(selectedOptions) => {
      const ids = selectedOptions.map((opt) => opt.value);
      onChange("tag_ids", ids);
    }}
    className="w-full"
  />
</div>

      <div className="mb-4 flex space-x-4">
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Waktu Mulai
          </label>
          <input
            type="time"
            name="from_time"
            value={formData.from_time}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="rounded border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Waktu Selesai
          </label>
          <input
            type="time"
            name="until_time"
            value={formData.until_time}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className="rounded border border-gray-300 p-2"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Keterangan
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
        >
          Batal
        </button>
      </div>
    </>
  );
};

export default TaskFormFields;