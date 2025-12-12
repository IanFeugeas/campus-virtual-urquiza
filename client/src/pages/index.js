import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-semibold mb-4">Campus Virtual — IES J.J. Urquiza N°49</h1>

        <p className="text-gray-600 mb-6">
          Plataforma colaborativa para estudiantes y docentes: preguntas, respuestas, materiales y comunicación institucional.
        </p>

        <div className="flex gap-4">
          <Link href="/login">
            <a className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Iniciar sesión</a>
          </Link>
          <Link href="/register">
            <a className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Registrarme</a>
          </Link>
        </div>

        <section className="mt-8 text-sm text-gray-500">
          <p>Si sos docente, registrate con tu correo institucional para validar tu rol.</p>
        </section>
      </div>
    </div>
  );
}