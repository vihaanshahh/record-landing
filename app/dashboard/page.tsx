export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold" data-testid="dashboard-title">
          RecordLoop Dashboard
        </h1>
        <span className="text-sm text-white/50" data-testid="user-badge">
          test@recordloop.dev
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5" data-testid="stat-recordings">
            <p className="text-sm text-white/50 mb-1">Recordings</p>
            <p className="text-3xl font-bold">142</p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/5" data-testid="stat-prs">
            <p className="text-sm text-white/50 mb-1">PRs Covered</p>
            <p className="text-3xl font-bold">38</p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/5" data-testid="stat-cost">
            <p className="text-sm text-white/50 mb-1">Total Cost</p>
            <p className="text-3xl font-bold">$0.47</p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4" data-testid="recent-heading">
            Recent Recordings
          </h2>
          <div className="space-y-3">
            {[
              { pr: "#42", flow: "Checkout Button Click", status: "passed", time: "2m ago" },
              { pr: "#41", flow: "Signup Form Fill", status: "passed", time: "1h ago" },
              { pr: "#40", flow: "Nav Menu Hover", status: "failed", time: "3h ago" },
            ].map((rec) => (
              <div
                key={rec.pr}
                className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5"
                data-testid={`recording-${rec.pr.replace("#", "")}`}
              >
                <div>
                  <span className="font-medium">{rec.pr}</span>
                  <span className="text-white/50 ml-2">{rec.flow}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      rec.status === "passed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {rec.status}
                  </span>
                  <span className="text-sm text-white/40">{rec.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
