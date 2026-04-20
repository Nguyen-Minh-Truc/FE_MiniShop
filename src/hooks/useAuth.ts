"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types";
import { clearAccessToken, getAccessToken } from "@/lib/authToken";

export const getAccount = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/account");
  return response.data.data;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getAccount();
        setUser(data);
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  return { user, loading, logout };
};
