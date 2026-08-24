import Link from "next/link";

import { Logo } from "@/components/auth/Logo";

const PRODUCT = [
  { label: "Properties", href: "/properties" },
  { label: "Search", href: "/search" },
  { label: "Rent Estimator", href: "/rent-estimator" },
  { label: "Trust Score", href: "/trust-score" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const USER = [
  { label: "Tenant", href: "/dashboard/tenant" },
  { label: "Landlord", href: "/dashboard/landlord" },
  { label: "Admin", href: "/dashboard/admin" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        {/* Brand */}
        <div>
          <Logo />

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A Secure Rental Property Management System —
            rental discovery, listing trust assessment
            and rent price intelligence in one place.
          </p>
        </div>

        {/* Navigation */}
        <FooterColumn
          title="Product"
          links={PRODUCT}
        />

        <FooterColumn
          title="Company"
          links={COMPANY}
        />

        <FooterColumn
          title="User"
          links={USER}
        />
      </div>

      {/* Copyright */}
      <div className="border-t border-border px-5 py-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} RentEase.
            All rights reserved.
          </span>

          <span>
            Trust Score is an AI-assisted risk
            indicator, not proof of ownership or
            legal verification.
          </span>
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-widest text-foreground">
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}