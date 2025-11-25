export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Campus Virtual</h1>

      <div className="flex gap-4">
        <span className="px-4 py-2 rounded-lg bg-desarrollo text-white">Desarrollo</span>
        <span className="px-4 py-2 rounded-lg bg-analista text-white">Analista</span>
        <span className="px-4 py-2 rounded-lg bg-infraestructura text-white">Infraestructura</span>
      </div>
    </main>
  );
}