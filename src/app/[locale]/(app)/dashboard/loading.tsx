/** Instant shell while the dashboard's server render completes. */
export default function DashboardLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="h-9 w-48 rounded bg-border" />
      <div className="h-64 rounded-card bg-border/60" />
    </div>
  )
}
