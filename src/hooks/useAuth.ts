"use client";

import { useCallback } from "react";
import { User } from "@/types";

const defaultUser: User = {
  id: "local-user",
  name: "Guest User",
  email: "guest@example.com",
  role: "user",
  joinDate: new Date(0),
};

export const useAuth = () => {
  const getUser = useCallback((): User => {
    return defaultUser;
  }, []);

  const logout = useCallback(() => {
    // Mock logout logic
    console.log("User logged out");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    // Mock update logic
    console.log("Profile updated:", data);
  }, []);

  return {
    user: getUser(),
    logout,
    updateProfile,
  };
};
