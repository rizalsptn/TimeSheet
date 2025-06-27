"use client";

import { useEffect, useState } from "react";
import { TaskLineChart } from "./task-line-chart";
import { subMonths, addMonths, format, isSameMonth, parseISO } from "date-fns";

export function TaskLineChartWrapper() {
  const [lineData, setLineData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await fetch(`http://localhost:3001/tasks/${userId}`);
        const data = await res.json();

        const today = new Date();
        const start = subMonths(today, 4);
        const months: { label: string; date: Date }[] = [];

        for (let i = 0; i <= 6; i++) {
          const date = addMonths(start, i);
          months.push({ label: format(date, "MMMM"), date });
        }

        const counts = months.map((month) => {
          const count = data.filter((task: any) =>
            isSameMonth(parseISO(task.task_date), month.date)
          ).length;

          return { label: month.label, value: count };
        });

        setLineData(counts);
      } catch (err) {
        console.error("Gagal ambil data line chart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Memuat chart...</p>;

  return (
    <div className="bg-white p-4 shadow rounded dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Jumlah Task per Bulan
      </h2>
      <TaskLineChart data={lineData} />
    </div>
  );
}
