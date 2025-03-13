import { Elysia } from "elysia";
import { getAllTags, getSingleTag, addTag, modifyTag, removeTag } from "../controllers/tags.controller";

export const tagRoutes = new Elysia()
  .get("/tags", getAllTags)
  .get("/tags/:id", getSingleTag)
  .post("/tags", addTag)
  .put("/tags/:id", modifyTag)
  .delete("/tags/:id", removeTag);
