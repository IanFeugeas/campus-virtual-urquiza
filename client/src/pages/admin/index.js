import ProtectedAdminRoute from '../../components/Auth/ProtectedAdminRoute';
import { useAuth } from '../../context/Auth/AuthContext';
import Link from 'next/link';


function AdminDashboardBase() {
  const { user } = useAuth();
  
  const stats = [
    { title: 'Usuarios Pendientes', value: '5', link: '/admin/aprobacion', color: 'bg-yellow-500' },
    { title: 'Posts Reportados', value: '1', link: '/admin/reports', color: 'bg-red-500' },
    { title: 'Usuarios Totales', value: '120', link: '/admin/users', color: 'bg-blue-500' },
    { title: 'Categorías de Posts', value: '8', link: '/admin/settings', color: 'bg-green-500' },
  ];

  return (
    <>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Bienvenido, {user?.nombre || 'Administrador'}
        </h1>
        <p className="text-gray-600">
          Este es el panel central de administración del Campus Virtual. Aquí puedes monitorear y gestionar el estado de la plataforma.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link 
            key={stat.title} 
            href={stat.link}
            className={`block p-5 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl text-white ${stat.color}`}
          >
            <p className="text-sm font-medium opacity-90">{stat.title}</p>
            <p className="text-4xl font-bold mt-1">{stat.value}</p>
            <span className="text-xs mt-2 block underline">Ver Detalles &rarr;</span>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acciones Prioritarias</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">La tarea más urgente es la **aprobación de nuevos usuarios** que han solicitado acceso.</p>
        <Link 
          href="/admin/aprobacion" 
          className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
        >
          Ir a Aprobar Usuarios
        </Link>
        
        <p className="mt-4 text-sm text-gray-500">
          Recuerda revisar también los posts reportados para mantener un ambiente seguro.
        </p>
      </div>
    </>
  );
}

export default ProtectedAdminRoute(AdminDashboardBase);