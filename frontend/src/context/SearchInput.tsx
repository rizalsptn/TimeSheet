// components/SearchInput.tsx
import { useTaskContext } from "@/context/TaskContext";

export default function SearchInput() {
  const { searchTerm, setSearchTerm } = useTaskContext();

  return (
    <input
      type="text"
      placeholder="Cari nama tugas..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
}
