export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-96 bg-muted rounded" />
      </div>
    </div>
  )
}
