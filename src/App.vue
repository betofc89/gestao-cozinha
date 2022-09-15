<template>
  <router-view/>
</template>

<script setup>

</script>


<style>

:root {
  --cor-laranja-normal: #f07924;
  --cor-laranja-hover: #dd8e56;

  --cor-verde-normal: #6fd826;
  --cor-verde-hover: #7cff1e;

  --cor-verde-pill-pedido: green;
  --cor-laranja-pill-pedido: orangered;
}

body {
  background: #fafafa;
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: Tahoma, Geneva, Verdana, sans-serif;
  /* font-family: Verdana, Tahoma, Geneva, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #707070; */
  color: #505050;
  background: #fafafa;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 0 0 2000px #202020;
}

::-webkit-scrollbar {
  display: none;
}

a {
  text-decoration: none;
  color: unset;
}

::selection {
  color: white;
  background: var(--cor-laranja-normal);
}
</style>
