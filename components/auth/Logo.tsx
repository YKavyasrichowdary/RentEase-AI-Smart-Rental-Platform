import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({
  className,
}: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-[0.7rem] bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
      >
        <path
          d="M3.6 10.6 12 4l8.4 6.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M5.6 10.9V19a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1v-8.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        <path
          d="M12 10.4a2.1 2.1 0 0 1 2.1 2.1c0 1.5-2.1 3.9-2.1 3.9s-2.1-2.4-2.1-3.9A2.1 2.1 0 0 1 12 10.4Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

interface LogoProps {
  className?: string;
}

export function Logo({
  className,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />

      <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-foreground">
        Rent
        <span className="text-primary">
          Ease
        </span>
      </span>
    </Link>
  );
}