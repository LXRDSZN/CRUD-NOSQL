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
