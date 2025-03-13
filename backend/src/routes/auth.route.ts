import { Elysia } from "elysia";
import { registerController, loginController, refreshTokenController, logoutController } from "../controllers/auth.controller";

export const authRoutes = new Elysia()
    .post("/register", registerController)
    .post("/login", loginController)
    .post("/refresh-token", refreshTokenController)
    .post("/logout", logoutController);
