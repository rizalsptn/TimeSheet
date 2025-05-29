// context/TaskContext.tsx
import { createContext, useContext, useState } from "react";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <TaskContext.Provider value={{ searchTerm, setSearchTerm, selectedTags, setSelectedTags }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
