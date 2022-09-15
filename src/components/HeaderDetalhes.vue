<template>
  <header id="header-detalhes" :style="{backgroundImage: 'url(/img/photos/' + receita.foto + '-grande.jpeg)'}">
      <div class="mascara-header"></div>
      <div class="cont-tit-desc">
        <div v-if="pedido">
          <span v-if="pedido.id" class="pill-info-pedido">Pedido #{{ pedido.id }}</span> 
          <span v-if="pedido.hora" class="pill-info-pedido">Hoje {{ pedido.hora }}</span>
          <span v-if="pedido.status" class="pill-info-pedido" :class="{'concluido' : pedido.status == 'Prato Finalizado'}">{{ pedido.status }}</span>
        </div>
        <h2>{{ receita.nome }}</h2>
        <p>{{ receita.descricao }}</p>
      </div>
    </header> 
</template>

<script>
export default {
  name: 'HeaderDetalhes',
  props: ['receita', 'pedido'],

}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: relative;
  height: 589px;
  color: white;

  background-repeat: no-repeat;
  background-size: cover;

  user-select: none;
}

.mascara-header {
  background: 
    linear-gradient(180deg, rgba(0,0,0,0.5) 5%, transparent 30%),
    linear-gradient(0deg, rgba(0,0,0,0.8) 20%, transparent 40%);
  
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

.cont-tit-desc {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  height: 300px;
  z-index: 1;
}

.pill-info-pedido {
  background: var(--cor-laranja-pill-pedido);
  padding: 0.35rem 0.5rem;
  border-radius: 5px;
  margin-right: 5px;
  font-weight: bold;
}

.pill-info-pedido.concluido {
  background: var(--cor-verde-pill-pedido);
}

.cont-tit-desc p {
  margin-top: 0;
  margin-bottom: 0;
  width: 80%;
  font-size: small;
}
</style>