
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Overview",
    href: "/dashboard/admin",
  },
  {
    label: "Properties",
    href: "/dashboard/admin/properties",
  },
  {
    label: "Trust Score",
    href: "/dashboard/admin/trust-score",
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const active =
          tab.href === "/dashboard/admin"
            ? pathname === tab.href
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
