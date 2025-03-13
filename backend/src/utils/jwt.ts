import jwt from "jsonwebtoken";

const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET!;

const token = jwt.sign({ userId: "12345" }, SECRET_KEY, { expiresIn: "1h" });


export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
