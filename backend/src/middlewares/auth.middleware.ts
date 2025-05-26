import { Elysia } from "elysia"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"

interface user {
  id: number;
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"

export const authMiddleware = new Elysia().derive(({ cookie, set }): { user: user | null } => {
  const token = cookie?.accessToken?.value

  if (!token) {
    set.status = 401
    return { user: null }
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken

    if (!decoded?.userId) {
      set.status = 401
      return { user: null }
    }

    return {
      user: { id: Number(decoded.userId) },
    }
  } catch (err) {
    set.status = 401
    return { user: null }
  }
})
