<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute();

// Función para verificar si estamos en una de las vistas del panel
const isPanelView = () => {
  return route.name === 'Dashboard' ||
  route.name === 'Materias';
};
</script>

<template>
  <header v-if="!isPanelView()">
    <div class="wrapper">
      <HelloWorld msg="Bienvenido Al Sistema!" />
    </div>
  </header>

  <main>
    <!-- Aquí se renderizarán las rutas dinámicamente -->
    <RouterView />
    
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
