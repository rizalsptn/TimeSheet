import { Elysia } from "elysia";
import { getAllTaskTags, getSingleTaskTag, addTaskTag, modifyTaskTag, removeTaskTag, getTasksTagsByTaskId, removeAllTagsByTaskId } from "../controllers/tasktags.controller";

export const taskTagRoutes = new Elysia()
  .get("/tasktags", getAllTaskTags)
  .get("/tasktags/task/:task_id", getTasksTagsByTaskId)
  .get("/tasktags/tag/:id", getSingleTaskTag)
  .post("/tasktags", addTaskTag)
  .put("/tasktags/:id", modifyTaskTag)
  .delete("/tasktags/:id", removeTaskTag)
  .delete("/tasktags/task/:task_id", removeAllTagsByTaskId);
