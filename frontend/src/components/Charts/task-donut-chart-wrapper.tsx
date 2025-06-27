"use client";

import { useEffect, useState } from "react";
import { TaskDonutChart } from "./task-donut-chart";

export function TaskDonutChartWrapper() {
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

        const tagCountMap: Record<string, number> = {};

        dataTasks.forEach((task: any) => {
          const relatedTagIds = dataTaskTags
            .filter((tt: any) => tt.task_id === task.id)
            .map((tt: any) => tt.tag_id);

          const relatedTags = dataTags.filter((tag: any) =>
            relatedTagIds.includes(tag.id)
          );

          relatedTags.forEach((tag: any) => {
            tagCountMap[tag.name] = (tagCountMap[tag.name] || 0) + 1;
          });
        });

        const tagData = Object.entries(tagCountMap).map(([label, value]) => ({ label, value }));
        setDonutData(tagData);
      } catch (err) {
        console.error("Gagal ambil data donut chart:", err);
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
        Task berdasarkan Tag
      </h2>
      <TaskDonutChart data={donutData} />
    </div>
  );
}
