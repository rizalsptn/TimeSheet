import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth.route";
import { userRoutes } from "./routes/users.route";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = new Elysia()
  .use(authRoutes)
  .use(userRoutes.use(authMiddleware)) // Proteksi route user dengan JWT
  .get("/", () => "🚀 Server is running!");

app.listen(3001, () => {
  console.log("✅ Server running at http://localhost:3001");
});
