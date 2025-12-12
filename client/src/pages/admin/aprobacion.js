import { useState, useEffect, useCallback } from 'react';
import ProtectedAdminRoute from '../../components/Auth/ProtectedAdminRoute';
import { apiClient } from '../../services/apiClient';

function AprobacionUsuariosBase() {
  const [usuariosPendientes, setUsuariosPendientes] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuariosPendientes = useCallback(async () => {
    try {
      setCargandoUsuarios(true);
      setError(null);
      
      
      const data = await apiClient('admin/usuarios/pendientes');

      setUsuariosPendientes(data);
    } catch (err) {
      console.error("Error al cargar pendientes:", err);
      setError(err.message || "Fallo al conectar con el servidor.");
    } finally {
      setCargandoUsuarios(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuariosPendientes();
  }, [fetchUsuariosPendientes]);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      
      setUsuariosPendientes(prev => prev.filter(u => u._id !== id)); 
      
      await apiClient(`admin/usuarios/${id}`, {
        method: 'PATCH',
        body: { estado: nuevoEstado },
      });

      
    } catch (err) {
      alert(`Error al cambiar el estado: ${err.message}. Recargando lista.`);
      fetchUsuariosPendientes(); 
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Aprobación de Usuarios Pendientes</h1>

      {cargandoUsuarios && <p>Cargando lista de solicitudes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!cargandoUsuarios && usuariosPendientes.length === 0 && !error && (
        <p className="text-green-600">🎉 No hay usuarios pendientes de aprobación. Todo en orden.</p>
      )}

      {!cargandoUsuarios && usuariosPendientes.length > 0 && (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol Solicitado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosPendientes.map((usuario) => (
                <tr key={usuario._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{usuario.rol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuario.carrera || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleCambiarEstado(usuario._id, 'aprobado')}
                      className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded-md"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleCambiarEstado(usuario._id, 'rechazado')}
                      className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ProtectedAdminRoute(AprobacionUsuariosBase);