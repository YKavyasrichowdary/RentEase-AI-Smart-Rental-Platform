
export const metadata = {
  title: "Property Management | RentEase Admin",
};

export default function AdminPropertiesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div>
        <p className="label-eyebrow">Admin workspace</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">
          Property Management
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Review property listings, monitor their verification status, and
          manage properties submitted by landlords.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-border p-6">
        <h3 className="font-semibold">Property review</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The database-backed property review queue will be connected here
          next. No listing data or review actions are being simulated.
        </p>
      </section>
    </main>
  );
}
