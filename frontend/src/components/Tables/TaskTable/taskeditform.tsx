// components/TaskEditForm.tsx

import React from "react";

type TaskFormProps = {
  form: {
    name: string;
    task_date: string;
    from_time: string;
    until_time: string;
    description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const taskeditform = ({ form, onChange }: TaskFormProps) => {
  return (
    <>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={onChange}
        className="w-full border p-2 rounded"
        placeholder="Nama tugas"
      />
      <input
        type="date"
        name="task_date"
        value={form.task_date}
        onChange={onChange}
        className="w-full border p-2 rounded"
      />
      <div className="flex space-x-2">
        <input
          type="time"
          name="from_time"
          value={form.from_time}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="time"
          name="until_time"
          value={form.until_time}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        className="w-full border p-2 rounded"
        placeholder="Deskripsi tugas (opsional)"
      />
    </>
  );
};

export default taskeditform;
