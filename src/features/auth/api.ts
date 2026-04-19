import type { ApiResponse, AuthTokens, LoginRequest } from "@/types";

import type { LoginSuccessResult } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const LOGIN_PATHS = ["/auth/login", "/login"] as const;

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${raw}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("Server not running or returned HTML instead of JSON");
  }

  return JSON.parse(raw) as T;
};

const requestWithFallback = async <T>(
  execute: (path: (typeof LOGIN_PATHS)[number]) => Promise<T>,
): Promise<T> => {
  let lastError: unknown;

  for (const path of LOGIN_PATHS) {
    try {
      return await execute(path);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Login request failed.");
};

const normalizeLoginResult = (
  response: ApiResponse<AuthTokens> | AuthTokens,
): LoginSuccessResult => {
  if ("data" in response) {
    return {
      accessToken: response.data?.accessToken,
    };
  }

  return {
    accessToken: response.accessToken,
  };
};

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginSuccessResult> {
    const response = await requestWithFallback((path) =>
      requestJson<ApiResponse<AuthTokens> | AuthTokens>(path, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );

    return normalizeLoginResult(response);
  },
};
