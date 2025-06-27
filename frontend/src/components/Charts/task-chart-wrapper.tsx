"use client";

import { useEffect, useState } from "react";
import { TaskLineChart } from "./task-line-chart";
import { TaskDonutChart } from "./task-donut-chart";
import { subMonths, addMonths, format, isSameMonth, parseISO } from "date-fns";

export function TaskChartsWrapper() {
  const [lineData, setLineData] = useState<{ label: string; value: number }[]>([]);
  const [donutData, setDonutData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const [resTasks, resTaskTags, resTags] = await Promise.all([
          fetch(`http://localhost:3001/tasks/${userId}`),
          fetch("http://localhost:3001/tasktags/"),
          fetch("http://localhost:3001/tags/"),
        ]);

        const [dataTasks, dataTaskTags, dataTags] = await Promise.all([
          resTasks.json(),
          resTaskTags.json(),
          resTags.json(),
        ]);

        // === LINE CHART: Task per bulan ===
        const today = new Date();
        const start = subMonths(today, 4);
        const months: { label: string; date: Date }[] = [];

        for (let i = 0; i <= 6; i++) {
          const date = addMonths(start, i);
          months.push({
            label: format(date, "MMMM"),
            date,
          });
        }

        const counts = months.map((month) => {
          const count = dataTasks.filter((task: any) =>
            isSameMonth(parseISO(task.task_date), month.date)
          ).length;

          return {
            label: month.label,
            value: count,
          };
        });

        // === DONUT CHART: Task per tag ===
        const tagCountMap: Record<string, number> = {};

        dataTasks.forEach((task: any) => {
          const relatedTagIds = dataTaskTags
            .filter((tt: any) => tt.task_id === task.id)
            .map((tt: any) => tt.tag_id);

          const relatedTags = dataTags.filter((tag: any) => relatedTagIds.includes(tag.id));

          relatedTags.forEach((tag: any) => {
            tagCountMap[tag.name] = (tagCountMap[tag.name] || 0) + 1;
          });
        });

        const tagData = Object.entries(tagCountMap).map(([label, value]) => ({ label, value }));

        setLineData(counts);
        setDonutData(tagData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Memuat chart...</p>;

  return (
<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
<div className="lg:col-span-2 bg-white p-4 shadow rounded dark:bg-gray-800">
  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
    Jumlah Task per Bulan
  </h2>
  <TaskLineChart data={lineData} />
</div>

<div className="lg:col-span-1 bg-white p-4 shadow rounded dark:bg-gray-800">
  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
    Task berdasarkan Tag
  </h2>
  <TaskDonutChart data={donutData} />
</div>
    </div>
  );
}