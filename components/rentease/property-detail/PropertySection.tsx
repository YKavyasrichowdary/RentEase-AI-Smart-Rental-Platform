import type { ReactNode } from "react";

export function PropertySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-base font-semibold">
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}