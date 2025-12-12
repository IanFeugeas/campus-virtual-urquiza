import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { apiClient } from '../services/apiClient';

const CARRERAS = [
    'Desarrollo de Software', 
    'Analista Funcional', 
    'Infraestructura de Software'
];

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('alumno');
  const [carrera, setCarrera] = useState(CARRERAS[0]);
  
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Enviando solicitud de registro...');
    
    const body = { nombre, email, password, rol };

    if (rol === 'alumno') {
        body.carrera = carrera;
    }
    
    try {
      const data = await apiClient('auth/register', {
          method: 'POST',
          body: body
      });
      
      setStatusMessage(`✅ ${data.mensaje} Ahora puedes intentar iniciar sesión. Estarás habilitado cuando un administrador apruebe tu cuenta.`);
      
      setEmail('');
      setPassword('');
      
    } catch (error) {
      setStatusMessage(error.message || 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Registro de Usuario</h1>
        
        {statusMessage && (
          <p className={`mb-4 p-3 rounded text-sm ${
            statusMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {statusMessage}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" disabled={loading}/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Institucional (@terciariourquiza.edu.ar)</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" disabled={loading}/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" disabled={loading}/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
            <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" disabled={loading}>
              <option value="alumno">Alumno</option>
              <option value="docente">Docente</option>
            </select>
          </div>

          {rol === 'alumno' && (
            <div className="mb-6">
              <label htmlFor="carrera" className="block text-sm font-medium text-gray-700">Carrera</label>
              <select id="carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" disabled={loading}>
                {CARRERAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Solicitar Registro'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}