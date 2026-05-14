function LoadingBar() {
  return <div className="h-3 animate-pulse rounded-full bg-slate-200/80" />;
}

export default function Loading() {
  return (
    <div className="space-y-6 py-8">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <LoadingBar />
          <div className="mt-6 grid gap-3">
            <LoadingBar />
            <LoadingBar />
            <LoadingBar />
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <LoadingBar />
          <div className="mt-6 grid gap-3">
            <LoadingBar />
            <LoadingBar />
            <LoadingBar />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index: number) => (
          <div key={index} className="glass-panel rounded-[2rem] p-6">
            <LoadingBar />
            <div className="mt-6 grid gap-3">
              <LoadingBar />
              <LoadingBar />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
