<template>
  <RouterView />
</template>

<script>

// import { RouterLink, RouterView } from 'vue-router'
export default {
  name: "App",
  metainfo: {
    title: "Kompi",
    meta: [
      { charset: 'urf-8' },
      { name: 'description', content: 'El portal de confianza para la adopción gratuita de animales en España. Busca el más próximo a ti y adopta fácilmente a tu nueva mascota.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  },
  components: {
  }
}
</script>

<style lang="scss">
/* Para importar las fuentes de google */
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
/* Para importar el CSS global */
@import './assets/base.css';
@import './assets/base.scss';
</style>
