import { Elysia } from "elysia";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const authMiddleware = new Elysia().derive(({ request, cookie }) => {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return { user: null };
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        return { user: decoded };
    } catch {
        return { user: null };
    }
});
