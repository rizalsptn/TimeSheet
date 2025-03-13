import { Elysia } from "elysia";
import { getAllTasks, getSingleTask, addTask, modifyTask, removeTask } from "../controllers/tasks.controller";

export const taskRoutes = new Elysia()
  .get("/tasks", getAllTasks)
  .get("/tasks/:id", getSingleTask)
  .post("/tasks", addTask)
  .put("/tasks/:id", modifyTask)
  .delete("/tasks/:id", removeTask);
