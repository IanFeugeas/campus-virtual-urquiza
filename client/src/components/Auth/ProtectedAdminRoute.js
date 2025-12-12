import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/Auth/AuthContext';
import AdminLayout from '../Layout/AdminLayout';

/**
 * HOC (Higher-Order Component) para proteger rutas de administración.
 * Redirige si el usuario no está logueado o no tiene rol 'admin'.
 * * @param {Component} WrappedComponent - El componente de página a proteger.
 */
export default function ProtectedAdminRoute(WrappedComponent) {
  
  const ComponentWithProtection = (props) => {
    const { user, loading, logout, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
      
      if (!loading && user && !isAdmin) {
        router.push('/');
      }
    }, [user, loading, isAdmin, router, logout]);

    if (loading || !user || !isAdmin) {
      return (
        <AdminLayout>
          <div className="text-center py-10">
            <h1 className="text-xl font-semibold">Verificando permisos...</h1>
            {error && <p className="text-red-500 mt-2">Acceso denegado.</p>}
          </div>
        </AdminLayout>
      );
    }
    
    return <WrappedComponent {...props} />;
  };

  return ComponentWithProtection;
}