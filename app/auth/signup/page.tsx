"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AuthShell,
  RoleToggle,
} from "@/components/auth/AuthShell";

type Role = "tenant" | "landlord";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  terms?: string;
};

export default function SignUpPage() {
  const router = useRouter();

  const [role, setRole] =
    useState<Role>("tenant");

  const [form, setForm] =
    useState<FormData>({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

  const [terms, setTerms] =
    useState(false);

  const [errors, setErrors] =
    useState<Errors>({});

  const [loading, setLoading] =
    useState(false);

  const set =
    (key: keyof FormData) =>
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setForm((current) => ({
        ...current,
        [key]: event.target.value,
      }));

      // Clear the field error while typing.
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    };

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const next: Errors = {};

    if (form.name.trim().length < 3) {
      next.name =
        "Enter your full name.";
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        form.email,
      )
    ) {
      next.email =
        "Enter a valid email address.";
    }

    if (
      !/^[0-9]{10}$/.test(
        form.phone,
      )
    ) {
      next.phone =
        "Enter a 10-digit mobile number.";
    }

    if (form.password.length < 8) {
      next.password =
        "Use at least 8 characters.";
    }

    if (!terms) {
      next.terms =
        "Please accept the terms to continue.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);

      toast.success("Account created", {
        description: `Your ${role} workspace is ready.`,
      });

      router.push(
        role === "tenant"
          ? "/dashboard/tenant"
          : "/dashboard/landlord",
      );
    }, 900);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Tell us how you'll use RentEase and we'll set up the right workspace."
      footer={
        <>
          Already registered?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary"
          >
            Sign in
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

        {/* Full name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name
          </Label>

          <Input
            id="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Aarav Sharma"
            autoComplete="name"
          />

          {errors.name ? (
            <p className="text-xs text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Email + Mobile */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
            />

            {errors.email ? (
              <p className="text-xs text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Mobile
            </Label>

            <Input
              id="phone"
              inputMode="numeric"
              value={form.phone}
              onChange={(event) => {
                setForm((current) => ({
                  ...current,
                  phone: event.target.value
                    .replace(
                      /[^0-9]/g,
                      "",
                    )
                    .slice(0, 10),
                }));

                setErrors((current) => ({
                  ...current,
                  phone: undefined,
                }));
              }}
              placeholder="9876543210"
              autoComplete="tel"
            />

            {errors.phone ? (
              <p className="text-xs text-destructive">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={set("password")}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />

          {errors.password ? (
            <p className="text-xs text-destructive">
              {errors.password}
            </p>
          ) : null}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Checkbox
              checked={terms}
              onCheckedChange={(checked) => {
                setTerms(checked === true);

                if (checked) {
                  setErrors((current) => ({
                    ...current,
                    terms: undefined,
                  }));
                }
              }}
              className="mt-0.5"
            />

            <span>
              I agree to the RentEase terms
              and understand that Trust Scores
              are AI-assisted risk indicators,
              not ownership verification.
            </span>
          </label>

          {errors.terms ? (
            <p className="mt-2 text-xs text-destructive">
              {errors.terms}
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
            ? "Creating account…"
            : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}