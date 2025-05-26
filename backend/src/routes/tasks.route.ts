import { Elysia } from "elysia";
import { addTask, getAllTasks, getSingleTask, getTasksByUserId, modifyTask, removeTask } from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import type { Task } from "../models/tasks.model";

export const taskRoutes: Elysia = new Elysia()
  .use(authMiddleware)
  .get("/tasks", getAllTasks)
  .get("/tasks_single/:id", ({ params: { id } }: { params: { id: string } }) => getSingleTask(Number(id)))
  .delete("/tasks/:id", ({params: { id }}: { params: { id: string } }) => removeTask(Number(id)))
  .post("/tasks/:userId", ({ body, params }: { body: Task, params: { userId: string } }) =>
  addTask(body, Number(params.userId)))
  .put("/tasks/:id", ({ params: { id }, body }: { params: { id: string }; body: Task }) =>
  modifyTask(Number(id), body))
  .get("/tasks/:userId", ({params: { userId }}: { params: { userId: string } }) => getTasksByUserId(Number(userId)));
