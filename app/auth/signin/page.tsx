"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthShell,
  RoleToggle,
} from "@/components/auth/AuthShell";

type Role = "tenant" | "landlord" | "admin";

type Errors = {
  email?: string;
  password?: string;
};

export default function SignInPage() {
  const router = useRouter();

  const [role, setRole] =
    useState<Role>("tenant");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState<Errors>({});

  const [authError, setAuthError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const submit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setAuthError(null);

    const next: Errors = {};

    if (
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      next.email =
        "Enter a valid email address.";
    }

    if (password.length < 6) {
      next.password =
        "Password must be at least 6 characters.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: role.toUpperCase(),
        }),
      });

      let data: any = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          data = {};
        }
      }

      if (!res.ok) {
        if (
          res.status === 401 ||
          res.status === 403 ||
          data?.message?.toLowerCase().includes("invalid email or password") ||
          data?.message?.toLowerCase().includes("unauthorized")
        ) {
          const unauthorizedMsg = "Invalid email or password";
          setAuthError(unauthorizedMsg);
          toast.error("Sign in failed", {
            description: unauthorizedMsg,
          });
        } else if (res.status === 404) {
          const notFoundMsg = "Authentication service endpoint not found (404).";
          setAuthError(notFoundMsg);
          toast.error("Sign in failed", {
            description: notFoundMsg,
          });
        } else {
          const errorMsg = data?.message || data?.error || `Failed to sign in (${res.status}).`;
          toast.error("Sign in failed", {
            description: errorMsg,
          });
        }
        setLoading(false);
        return;
      }

      toast.success("Signed in", {
        description: `Welcome back, ${data.user?.name || email}!`,
      });

      const targetRole = (
        data.user?.role || role.toUpperCase()
      ).toLowerCase();

      const dashboardRoutes: Record<string, string> = {
        tenant: "/dashboard/tenant",
        landlord: "/dashboard/landlord",
        admin: "/dashboard/admin",
      };

      router.push(
        dashboardRoutes[targetRole] || "/auth/signin",
      );
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Sign in failed", {
        description: "An unexpected error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Sign in to RentEase"
      subtitle="Pick up where you left off — saved listings, requests and trust assessments."
      footer={
        <>
          New to RentEase?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-primary"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        {/* Role */}
        <RoleToggle
  value={role}
  onChange={setRole}
  includeAdmin
/>

        {/* Email */}
        <div className="space-y-2">
          {authError ? (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
            >
              <AlertCircle className="size-4 shrink-0" />
              <p>{authError}</p>
            </div>
          ) : null}

          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setAuthError(null);

              setErrors((current) => ({
                ...current,
                email: undefined,
              }));
            }}
            placeholder="you@example.com"
            aria-invalid={!!errors.email || !!authError}
          />

          {errors.email ? (
            <p className="text-xs text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(
                event.target.value,
              );
              setAuthError(null);

              setErrors((current) => ({
                ...current,
                password: undefined,
              }));
            }}
            placeholder="••••••••"
            aria-invalid={!!errors.password || !!authError}
          />

          {errors.password ? (
            <p className="text-xs text-destructive">
              {errors.password}
            </p>
          ) : null}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}

          {loading
            ? "Signing in…"
            : "Sign In"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Secure authentication powered by RentEase.
        </p>
      </form>
    </AuthShell>
  );
}