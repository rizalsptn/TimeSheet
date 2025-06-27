// context/TaskContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


type TaskContextType = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};


const TaskContext = createContext<TaskContextType | undefined>(undefined);


export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <TaskContext.Provider value={{ searchTerm, setSearchTerm, selectedTags, setSelectedTags }}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
