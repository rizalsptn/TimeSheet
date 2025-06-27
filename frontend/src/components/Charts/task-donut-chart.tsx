"use client";

import Select from "react-select";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

type TaskData = {
  label: string;
  value: number;
};

export function TaskDonutChart({
  data,
}: {
  data: TaskData[];
}) {
  const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const tagOptions = data.map((d) => ({
    label: d.label,
    value: d.label,
  }));

  const filteredData = selectedOptions.length
    ? data.filter((d) => selectedOptions.map((s) => s.value).includes(d.label))
    : data;

  return (
    <div className="space-y-4">
<Select
  isMulti
  options={tagOptions}
  value={selectedOptions}
  onChange={(selected) => setSelectedOptions(selected as any)}
  placeholder="Pilih tag..."
  className="text-sm"
  styles={{
    control: (base) => ({
      ...base,
      minHeight: 'auto',
      maxHeight: 48, // biar tetap pendek
      overflowX: 'auto',
      flexWrap: 'nowrap', // jangan wrap ke bawah
    }),
    valueContainer: (base) => ({
      ...base,
      display: 'flex',
      flexWrap: 'nowrap', // force horizontal scroll
      overflowX: 'auto',
      scrollbarWidth: 'thin',
    }),
    multiValue: (base) => ({
      ...base,
      marginRight: 4,
    }),
  }}
/>


      <Doughnut
        data={{
          labels: filteredData.map((d) => d.label),
          datasets: [
            {
              label: "Jumlah Task",
              data: filteredData.map((d) => d.value),
              backgroundColor: [
                "#6366F1",
                "#10B981",
                "#F59E0B",
                "#EF4444",
                "#3B82F6",
                "#8B5CF6",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
