"use client";

import Link from "next/link";
import { Home, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Home className="size-5.5" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Ease</span>
          </span>
        </Link>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-muted/80 p-1.5 border border-border/40 text-base font-medium">
          <Link
            href="/"
            className="rounded-full bg-card px-5 py-2 text-foreground shadow-xs font-semibold"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="rounded-full px-5 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/search"
            className="rounded-full px-5 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Search
          </Link>
          <Link
            href="/rent-estimator"
            className="rounded-full px-5 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            AI Rent Estimator
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            suppressHydrationWarning
            className="relative grid size-10 place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          >
            <Bell className="size-5" />
            <span className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-warm ring-2 ring-background" />
          </button>

          <Link
            href="/signin"
            className="hidden sm:inline-block text-base font-semibold text-foreground hover:text-primary transition-colors px-2 py-1"
          >
            Sign In
          </Link>

          <Button size="lg" className="rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm h-auto">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
