const API_BASE_URL = "http://localhost:3001"; // Sesuaikan dengan backend-mu

export const registerUser = async (userData: { name: string; username: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Agar refreshToken tersimpan di cookie
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const refreshToken = async () => {
  const response = await fetch(`${API_BASE_URL}/refresh-token`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};
