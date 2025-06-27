export async function getOverviewData(userId: string, accessToken: string) {
  let totalTasksCount = 0;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const tasksRes = await fetch(`http://localhost:3001/tasks/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });    

    if (!tasksRes.ok) {
      const text = await tasksRes.text();
      throw new Error(`Gagal fetch tasks: ${tasksRes.status} - ${text}`);
    }

    const tasksData = await tasksRes.json();
    totalTasksCount = tasksData.length;

  } catch (error: any) {
    console.error("Gagal fetch data overview:", error.message);
  }

  return {
    tasks: {
      label: "Total Tasks",
      value: totalTasksCount,
      growthRate: 0,
    },
  };
}
