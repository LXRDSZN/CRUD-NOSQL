import axios from 'axios';

// Crear instancia de Axios con la configuración básica
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
##################################################################################################
#                          api para login                                                         #
##################################################################################################
*/
// Función para login
export const login = async (username,password) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/login', {
      username,
      password
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer iniciar sesion:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};

/*
##################################################################################################
#                          api para registrar                                                     #
##################################################################################################
*/

// Función para registrar un nuevo usuario
export const signup = async (username, email, password) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/signup', {
      username,
      email,
      password
    });

    // Devuelve los datos del servidor (token, mensaje, etc.)
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    // Reenvía el error al componente que lo llamó
    throw error;
  }
};
