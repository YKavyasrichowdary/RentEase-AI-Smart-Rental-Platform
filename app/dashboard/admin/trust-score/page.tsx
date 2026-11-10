
export const metadata = {
  title: "Trust Score Management | RentEase Admin",
};

export default function AdminTrustScorePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div>
        <p className="label-eyebrow">Admin workspace</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">
          Trust Score Management
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Monitor property risk assessments and identify listings that may
          require additional verification.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-border p-6">
        <h3 className="font-semibold">Trust assessment monitoring</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The actual trust-scoring logic and database-backed assessment
          records will be integrated here. No artificial scores are displayed.
        </p>
      </section>
    </main>
  );
}
