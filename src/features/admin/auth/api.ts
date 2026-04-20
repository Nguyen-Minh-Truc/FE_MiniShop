// services/authService.ts
import axiosInstance from "@/lib/axiosInstance";
import { clearAccessToken, setAccessToken } from "@/lib/authToken";

const resolveAccessToken = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const source = payload as Record<string, unknown>;
  const nested =
    source.data && typeof source.data === "object"
      ? (source.data as Record<string, unknown>)
      : null;

  const candidates = [
    nested?.accessToken,
    nested?.access_token,
    source.accessToken,
    source.access_token,
    source.token,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return null;
};

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });

  const accessToken = resolveAccessToken(response?.data);
  if (!accessToken) {
    throw new Error("Login success but access token is missing from response.");
  }

  setAccessToken(accessToken);

  return response;
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } finally {
    clearAccessToken();
  }
};
