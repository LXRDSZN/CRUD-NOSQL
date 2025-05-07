<template>
    <div class="login-container">
      <section class="user">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Ingrese su Usuario" />
      </section>
  
      <section class="password">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" />
      </section>
  
      <button class="login-button" @click="login">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Para redirigir entre rutas
  import axios from 'axios';
  import { useToast } from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  
  // Variables reactivas
  const username = ref('');
  const password = ref('');
  
  // Inicializa el toast
  const toast = useToast();
  const router = useRouter(); // Router para redirigir
  
  const login = async () => {
  if (!username.value || !password.value) {
    toast.error('Por favor, ingresa ambos campos', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      usuario: username.value,
      contrasena: password.value,
    }, {
      withCredentials: true, // Permite enviar y recibir cookies
    });

    if (response.data.message === 'Login exitoso') {
      // Muestra un mensaje de éxito
      toast.success('Inicio de sesión exitoso. Bienvenido!', {
        position: 'top-right',
        duration: 2000, //duracion de la animacion
        dismissible: true,
      });

      // Redirige a la página de Dashboard
      setTimeout(() => {
        router.push('/Dashboard'); // Redirigir al panel
      }, 750);
    }
  } catch (error) {
    const message =
      error.response?.data?.message || 'Hubo un problema con la conexión';
    toast.error(message, {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};

  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .user,
  .password {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: rgb(93, 95, 93);
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: rgb(10, 149, 255);
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: rgb(42, 124, 186);
  }
  
  .error {
    color: red;
    margin-top: 1rem;
    font-size: 0.9rem;
    text-align: center;
    
  }
  
  /* Aumentar el tamaño de los campos para pantallas que no sean celulares */
  @media (min-width: 769px) {
    .login-container {
      max-width: 900px; /* Hacemos más largo el contenedor */
    }
  
    input {
      padding: 1rem;
      font-size: 1.1rem;
    }
  
    .login-button {
      padding: 1rem;
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 768px) {
    .login-container {
      padding: 1rem;
    }
  
    input {
      padding: 0.5rem;
    }
  
    .login-button {
      padding: 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .login-container {
      padding: 1rem;
    }
  
    input {
      padding: 0.5rem;
      font-size: 0.9rem;
    }
  
    .login-button {
      padding: 0.5rem;
      font-size: 0.9rem;
    }
  }
  </style>
  