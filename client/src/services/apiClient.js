const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


/**
 * Función genérica para realizar solicitudes HTTP a la API.
 * * @param {string} endpoint - La ruta específica de la API (ej: 'auth/login', 'admin/usuarios').
 * @param {object} options - Opciones de la solicitud (method, body, headers, etc.).
 * @returns {Promise<object>} - La respuesta parseada como JSON.
 */

export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  // Obtiene el token para incluirlo automáticamente en solicitudes protegidas
  const token = localStorage.getItem('token');
  
  const headers = { 
    'Content-Type': 'application/json',
    ...customConfig.headers, // Permite sobrescribir o añadir headers
  };

  if (token) {
    // Añade el token si está disponible
    headers.Authorization = `Bearer ${token}`; 
  }

  const config = {
    method: body ? 'POST' : 'GET', // Default: POST si hay body, GET si no hay
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  
  // Construye la URL completa
  const url = `${BASE_URL}/${endpoint}`;

  let data;
  try {
    const response = await fetch(url, config);
    data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(data.mensaje || 'Error desconocido del servidor'); 
  } catch (error) {
    if (error.message.includes('token')) {
    }
    return Promise.reject(error.message ? { message: error.message } : error);
  }
}