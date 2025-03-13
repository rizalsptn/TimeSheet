import jwt, { type JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const registerController = async ({ request, set }: any) => {
    let data;
    try {
        data = await request.json();
    } catch (error) {
        return { error: "Invalid JSON format" };
    }

    if (!data?.username || !data?.password || !data?.name) {
        return { error: "Name, username, and password are required" };
    }

    const existingUser = await prisma.users.findUnique({ where: { username: data.username } });
    if (existingUser) {
        return { error: "Username already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.users.create({
        data: { name: data.name, username: data.username, password: hashedPassword },
    });

    const accessToken = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: newUser.id }, REFRESH_SECRET, { expiresIn: "7d" });

    await prisma.logins.create({
        data: {
            user_id: newUser.id,
            token: accessToken,
            refresh_token: refreshToken,
            user_agent: "unknown",
        },
    });

    // ✅ Simpan refresh token di HTTP-only cookie
    set.headers["Set-Cookie"] = `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}`;

    return { accessToken, message: "Registration successful" };
};


export const loginController = async ({ request, set }: any) => {
    let data;
    try {
        data = await request.json();
    } catch (error) {
        return { error: "Invalid JSON format" };
    }

    if (!data?.username || !data?.password) {
        return { error: "Username and password are required" };
    }

    const user = await prisma.users.findUnique({ where: { username: data.username } });
    if (!user) {
        return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return { error: "Invalid password" };
    }

    const accessToken = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

    await prisma.logins.create({
        data: {
            user_id: user.id,
            token: accessToken,
            refresh_token: refreshToken,
            user_agent: "unknown",
        },
    });

    // ✅ Simpan refresh token di HTTP-only cookie
    set.headers["Set-Cookie"] = `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}`;

    return { accessToken, message: "Login successful" };
};

export const refreshTokenController = async ({ request, set }: any) => {

    const cookieHeader = request.headers.get("Cookie");

 
    if (!cookieHeader) return { error: "No cookies found" };

    const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c: string) => c.split("=") as [string, string])
    );    
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return { error: "Refresh token is required" };


    const storedToken = await prisma.logins.findFirst({
        where: { refresh_token: refreshToken },
    });

    if (!storedToken) return { error: "Invalid refresh token" };

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;
        if (!decoded.userId) return { error: "Invalid token payload" };

        const newAccessToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, { expiresIn: "1h" });

        return { accessToken: newAccessToken };
    } catch {
        return { error: "Invalid refresh token" };
    }
};

export const logoutController = async ({ request, cookie, setCookie }: any) => {
    const refreshToken = cookie.refreshToken;

    if (!refreshToken) {
        return { error: "Refresh token is required" };
    }

    await prisma.logins.deleteMany({ where: { refresh_token: refreshToken } });

    setCookie("refreshToken", "", { httpOnly: true, secure: true, path: "/", maxAge: 0 });

    return { message: "Logout successful" };
};
