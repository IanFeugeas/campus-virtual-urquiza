import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/Auth/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">Hola, {user.nombre}</h1>
      <p className="text-gray-600">Bienvenido al Campus Virtual.</p>
      <div className="mt-6">
        <a className="text-blue-600" href="/posts">Ir al Foro</a>
      </div>
    </div>
  );
}