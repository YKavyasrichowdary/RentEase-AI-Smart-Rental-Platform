"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthShell,
  RoleToggle,
} from "@/components/auth/AuthShell";

type Role = "tenant" | "landlord";

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

  const [loading, setLoading] =
    useState(false);

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

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

    window.setTimeout(() => {
      setLoading(false);

      toast.success("Signed in", {
        description: `Welcome back to your ${role} workspace.`,
      });

      router.push(
        role === "tenant"
          ? "/dashboard/tenant"
          : "/dashboard/landlord",
      );
    }, 800);
  };

  return (
    <AuthShell
      title="Sign in to RentEase"
      subtitle="Pick up where you left off — saved listings, requests and trust assessments."
      footer={
        <>
          New to RentEase?{" "}
          <Link
            href="/signup"
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
        />

        {/* Email */}
        <div className="space-y-2">
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

              setErrors((current) => ({
                ...current,
                email: undefined,
              }));
            }}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
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

              setErrors((current) => ({
                ...current,
                password: undefined,
              }));
            }}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
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
          Demo build — no credentials are
          stored or transmitted.
        </p>
      </form>
    </AuthShell>
  );
}