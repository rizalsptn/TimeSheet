import { Elysia } from "elysia";
import { userRoutes } from "./routes/users.route";
import { taskRoutes } from "./routes/tasks.route";
import { tagRoutes } from "./routes/tags.route";
import { taskTagRoutes } from "./routes/tasktags.route";
import { authRoutes } from "./routes/auth.route"; // Tambahkan ini
import { cors } from "@elysiajs/cors";
import { cookie } from "@elysiajs/cookie";


const app = new Elysia()
.use(cors({
  origin: "http://localhost:3000", // asal frontend kamu
  credentials: true                // penting supaya cookie bisa ikut
}))
  .use(cookie())
  .use(userRoutes)
  .use(taskRoutes)
  .use(tagRoutes)
  .use(taskTagRoutes)
  .use(authRoutes) // Pastikan rute auth dipakai di server
  .get("/", () => "🚀 Server is running!");

app.listen(3001, () => {
  console.log("✅ Server running at http://localhost:3001");
});