<template>
  <Navbar :txtLabel="'Buscar receita...'" @emitNavBar="filtrar"/>
  <div id="wrapper">
    <h4>Receitas</h4>

    <div v-if="!stringBusca" class="lista-items" >
      <div v-if="arrayObj.length" >
        <div v-for="receita in arrayObj" :key="receita.id">
          <ReceitaCard :receita="receita" />
        </div>
      </div>
      <div v-else>
        Carregando receitas...
        <Spinner />
      </div>
    </div>
    <div v-else class="lista-items"> <!-- stringBusca tem conteúdo -->
      <div v-if="recFilt.length">
        <div v-for="receita in recFilt" :key="receita.id">
          <ReceitaCard :receita="receita" />
        </div>
      </div>
      <div v-else>
        <p>Não há receitas cadastradas para o termo buscado <b>"{{ stringBusca }}"</b>.</p>
        <p>Tente buscar por outro termo, p. ex.: "moqueca".</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import getArrayObj from '../composables/getArrayObj.js'
import ReceitaCard from '../components/ReceitaCard.vue'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import { computed, ref } from '@vue/runtime-core'

export default {
  name: 'ListaReceitas',
  components: { Navbar, ReceitaCard, Spinner },
  setup() {
    const stringBusca = ref('')

    const {arrayObj, errorArrayObj, loadArrayObj} = getArrayObj('receitas')
    loadArrayObj()

    const recFilt = computed(() => {
      return arrayObj.value.filter((rec) => 
        rec.nome.toLowerCase().includes(stringBusca.value.toLowerCase().trim()))
    })
    
    const filtrar = (e) => {
      stringBusca.value = e
    }

    return { arrayObj, recFilt, errorArrayObj, filtrar, stringBusca }
  }
}
</script>

<style scoped>
#wrapper {
  margin: 0 1rem;
  min-height: 1000px;
}

h4 {
  user-select: none;
}

.lista-items {
  border-top: 1px solid rgb(221, 221, 221);
}
</style>