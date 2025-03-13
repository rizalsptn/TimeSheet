import { Elysia } from "elysia";
import { getAllUsers, getSingleUser, addUser, modifyUser, removeUser } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRoutes = new Elysia()
  .use(authMiddleware)
  .get("/users", getAllUsers)
  .get("/users/:id", getSingleUser)
  .post("/users", addUser)
  .put("/users/:id", modifyUser)
  .delete("/users/:id", removeUser);
