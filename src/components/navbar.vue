<template>
    <div class="container">
        <!-- Barra de navegación -->
        <nav class="navbar">
            <h2>Dashboard </h2>
            <div class="divider"></div>

            <!-- Menú hamburguesa para pantallas pequeñas -->
            <button class="hamburger" @click="toggleSidebar">☰</button>

            <ul v-show="!isSidebarCollapsed">
                <li>
                    <RouterLink to="/Dashboard">
                        <span class="material-icons">home</span> Panel de control
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Alumnos"><span class="material-icons">person</span>Alumno</RouterLink>
                </li>
                <li>
                    <RouterLink to="/Docentes"><span class="material-icons">school</span>Docentes</RouterLink>
                </li>
                <li>
                    <RouterLink to="/Materias">
                        <span class="material-icons">book</span>Materias</RouterLink>
                </li>
                <li>
                    <RouterLink to="/Horarios">
                        <span class="material-icons">access_time</span>Horarios</RouterLink>
                </li>
                <li>
                    <RouterLink to="/Grupos">
                        <span class="material-icons">group</span>Grupos</RouterLink>
                </li>
                <li>
                    <RouterLink to="/Kardex">
                       <span class="material-icons">app_registration</span>Kardex</RouterLink> 
                </li>
            </ul>

            <!-- Opciones  de Soporte y Salir -->
            <ul class="additional-options">
                <!--
                 <li>
                    <RouterLink to="/soporte">
                        <span class="material-icons">headset_mic</span> Soporte
                    </RouterLink>
                </li>
                -->
               
                <li>
                    <RouterLink to="/">
                        <span class="material-icons">logout</span> Salir
                    </RouterLink>
                </li>
            </ul>
        </nav>

        <!-- Contenido principal -->
        <main class="main-content">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarCollapsed = ref(false);

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}
</script>

<style scoped>
/* Contenedor principal que abarca toda la estructura */
.container {
    display: flex;
    flex-direction: row;
}

/* Barra de navegación fija */
.navbar {
    background-color: #041d38;
    color: #fff;
    width: 250px;
    height: 100vh;
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
    transition: width 0.3s;
}

/* Estilos del título y barra de separación */
h1 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;
}

/* Línea divisoria debajo del título */
.divider {
    height: 2px;
    background-color: #fff;
    margin-bottom: 1rem;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

ul.additional-options {
    margin-top: auto;
}

li {
    margin: 0.5rem 0;
}

a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem;
}

a .material-icons {
    margin-right: 0.5rem;
}

a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Contenido principal con margen para no superponerse con la barra de navegación */
.main-content {
    margin-left: 250px; 
    width: calc(100% - 250px); 
    transition: margin-left 0.3s;
}

/* Estilos para el menú hamburguesa en pantallas pequeñas */
.hamburger {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 1rem;
    text-align: left;
    width: 100%;
}

@media (max-width: 768px) {
    /* Barra lateral se colapsa en pantallas pequeñas */
    .navbar {
        width: 80px;
    }

    .main-content {
        margin-left: 80px;
    }

    /* Estilo para el menú hamburguesa */
    .hamburger {
        display: block;
    }

    /* Ocultar el menú de navegación en pantallas pequeñas, que se abre con el hamburguesa */
    ul {
        display: none;
        flex-direction: column;
    }

    ul.additional-options {
        display: none;
    }

    ul.v-show {
        display: flex;
    }

    .navbar ul {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
