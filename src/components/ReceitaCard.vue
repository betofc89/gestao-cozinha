<template>
  <div class="receita-card">
    
    <div class="receita-card-esq">
      <div class="foto-receita">
        <img :src="getImgUrl(receita.foto, 'peq')">
      </div>
    </div>

    <div class="receita-card-meio">
      <h4>{{ receita.nome }}</h4>
      <p>{{ receita.descricao }}</p>
    </div>

    <div class="receita-card-dir">
      <div class="circulo prato-finalizado">
        <span>Prato <br> Finalizado</span>
      </div>
      <div class="circulo horario-finalizado">
        <span>Hoje <br> 19:32</span>
      </div>
      <router-link :to="{ name: 'detalhes_receita', params: {id: receita.id } }">
        <div class="circulo ver-receita">
          <span>Ver <br> receita</span>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  props: ['receita'],

  setup(props) {   

    const getImgUrl = (img, tam) => {
      return require('/public/img/photos/' + img + '-' + tam + '.jpg');
    }

    return { getImgUrl }
  }
}
</script>

<style scoped>
.receita-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
  user-select: none;
}

.receita-card-esq {
  width: 160px;
  height: 160px;
  min-width: 160px;
  min-height: 160px;
}

.foto-receita {
  max-width: 160px;
  display: block;
  position: relative;
}

.foto-receita img {
  width: 100%;
}

.receita-card-meio {
  width: 40%;
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 30px;
}

.receita-card-meio p {
  font-size: 8pt;
}

.receita-card-dir {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: right;
}

.circulo {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
  color: white;
  font-weight: bold;
  font-size: medium;
  background-color: var(--cor-laranja-normal);
}

.circulo:hover {
  background: var(--cor-laranja-hover);
}

.circulo span {
  display: inline-block;
  vertical-align: middle;
  line-height: 22px;
  text-align: center;
}

.circulo.prato-finalizado {
  background: transparent;
  color: var(--cor-verde-normal);
  font-weight: normal;

  visibility: hidden;
}

.circulo.horario-finalizado {
  background: #f0f0f0;
  color: unset;
  font-weight: normal;

  visibility: hidden;
}


</style>