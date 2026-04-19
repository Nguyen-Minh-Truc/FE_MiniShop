"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, UserRound } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authApi } from "./api";
import type { LoginFormValues } from "./types";

const defaultFormValues: LoginFormValues = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const router = useRouter();
  const [formValues, setFormValues] =
    useState<LoginFormValues>(defaultFormValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!formValues.password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await authApi.login({
        username: formValues.username.trim(),
        password: formValues.password,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your dashboard.
          </p>
        </div>

        <Card className="border border-border bg-card p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="login-username">Username</Label>
              <div className="relative">
                <UserRound className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="login-username"
                  value={formValues.username}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                  className="pl-9"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="login-password"
                  type="password"
                  value={formValues.password}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="pl-9"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              className="w-full justify-center"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Secure access for MiniShop management modules.
        </p>
      </div>
    </div>
  );
};
