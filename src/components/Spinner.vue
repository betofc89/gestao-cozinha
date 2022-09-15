<template>
  <div class="wrapper">
    <div class="backdrop">
      <div class="meuSpinner"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  
  background-color: rgba(20, 11, 0, 0.65);
  z-index: 3;
  margin: 0 auto;
}

.meuSpinner {
  --spinner-border-width: 10px;
  --spinner-size: 150px;

  box-sizing: border-box;
  position: relative;
  margin: 150px auto 0 auto;

  display: block;
  width: var(--spinner-size);
  height: var(--spinner-size);
  border: var(--spinner-border-width) solid transparent;
  border-radius: 50%;
  border-top: var(--spinner-border-width) solid var(--cor-laranja-normal);
  border-left: var(--spinner-border-width) solid var(--cor-laranja-normal);

  animation: girar infinite 0.5s ease-in-out;
}

@keyframes girar {

  to {
    transform: rotateZ(360deg);
  }
}
</style>