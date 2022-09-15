<template>
  <div class="pedido-card">
    
    <div class="pedido-card-esq">
      <div class="foto-receita">                
        <img id="img-foto-receita" :src="fotoReceita" >
      </div>
    </div>

    <div class="pedido-card-meio">
      <span class="pedido-pill">Ped. #{{ pedido.id }}</span>
      <h4>{{ receita.nome }}</h4>
      <p>{{ descricaoReceita }}</p>
    </div>

    <div class="pedido-card-dir">
      <div class="circulo prato-finalizado">
        <span v-if="pedido.status=='Prato Finalizado'">{{ pedido.status }}</span>
      </div>
      <div class="circulo horario-finalizado">
        <span>Hoje <br> {{pedido.hora}}</span>
      </div>
      <router-link :to="{ name: 'detalhes_pedido', params: {id: pedido.id } }">
        <div class="circulo ver-receita">
          <span>Ver <br> pedido</span>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { ref, watch } from '@vue/runtime-core'
import getArrayObj from '../composables/getArrayObj.js'

export default {
  props: ['pedido'],

  setup(props) {   
    const descricaoReceita = ref('')
    const fotoReceita = ref('')
    
    const {arrayObj: receita, error: errorReceita, loadArrayObj: loadReceita} = getArrayObj('receitas', props.pedido.ref_receita_id)
    loadReceita()

    
    watch(receita, () => {
        gerarDescricaoReceita()

        fotoReceita.value = '/img/photos/' + receita.value.foto + '-peq.jpg'
    })

    const gerarDescricaoReceita = () => {
      let textoResult = ''
        receita.value.descricao.split(" ").forEach((element, index) => {
          if(index < 20) {
            textoResult += element + " "
          }
        })
        textoResult += " (...)"
        descricaoReceita.value = textoResult
    }

    return { receita, descricaoReceita, fotoReceita }
  }
}
</script>

<style scoped>
.pedido-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid rgb(221, 221, 221);
  user-select: none;
}

.pedido-card-esq {
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

.pedido-card-meio {
  width: 40%;
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 30px;
}

.pedido-pill { 
  margin: 0; 
  padding: 0.25rem;
  color: var(--cor-laranja-normal);
  font-size: small;
  font-weight: normal;
  border: 1px solid var(--cor-laranja-normal);
  border-left: 6px solid var(--cor-laranja-normal);
}

.pedido-card-meio p {
  font-size: 8pt;
}

.pedido-card-dir {
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
}

.circulo.horario-finalizado {
  background: #f0f0f0;
  color: unset;
  font-weight: normal;
}

</style>