import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TaskTable from "@/components/Tables/TaskTable/index";

export default function TablesPage() {
  return (
    <>
      <Breadcrumb pageName="Tabel Tugas" />
      <div className="space-y-10">
        <TaskTable />
      </div>
    </>
  );
}
