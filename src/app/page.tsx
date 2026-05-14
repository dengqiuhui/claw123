import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen dark-gradient text-white font-outfit">
      <nav className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold tracking-tight">Openclaw</h1>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-32 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-sm text-violet-300 mb-8 font-medium">
            加载中...
          </div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 glow-text">OpenClaw</h1>
        </section>
      </main>
    </div>
  ),
});

export default function Page() {
  return <HomeClient />;
}
