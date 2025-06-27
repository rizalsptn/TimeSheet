'use client';

import { useEffect, useState } from "react";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { TaskChartsWrapper } from "@/components/Charts/task-chart-wrapper";
import { compactFormat } from "@/lib/format-number";

export function OverviewCardsGroup() {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    if (userId && accessToken) {
      getOverviewData(userId, accessToken).then(setOverview);
    }
  }, []);

  if (!overview) return <div>Loading...</div>;

  const { tasks } = overview; // ❗ Hapus tasktags

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <OverviewCard
          label={tasks.label}
          data={{
            value: compactFormat(tasks.value),
            growthRate: tasks.growthRate,
          }}
          Icon={icons.Views}
        />
      </div>
      
        <TaskChartsWrapper />
    </>
  );
}
