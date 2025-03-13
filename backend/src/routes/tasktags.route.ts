import { Elysia } from "elysia";
import { getAllTaskTags, getSingleTaskTag, addTaskTag, modifyTaskTag, removeTaskTag } from "../controllers/tasktags.controller";

export const taskTagRoutes = new Elysia()
  .get("/tasktags", getAllTaskTags)
  .get("/tasktags/:id", getSingleTaskTag)
  .post("/tasktags", addTaskTag)
  .put("/tasktags/:id", modifyTaskTag)
  .delete("/tasktags/:id", removeTaskTag)
  .get("/tasktags/task/:task_id/tag/:tag_id", getSingleTaskTag); // Ubah rute yang bentrok
