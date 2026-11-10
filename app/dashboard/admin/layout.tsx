
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/current-user";
import AdminNavigation from "./AdminNavigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
        <div className="border-b border-border">
          <p className="label-eyebrow">
            Admin workspace
          </p>

          <h1 className="mt-2 font-display text-2xl font-semibold">
            Platform review
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Monitor listing quality, review risk signals and manage property verification.
          </p>
        </div>

        <AdminNavigation />
      </div>

      {children}
    </>
  );
}
