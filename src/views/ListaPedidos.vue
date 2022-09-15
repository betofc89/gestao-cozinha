<template>
  <Navbar :txtLabel="'Buscar pedido...'" @emitNavBar="filtrar"/>
  <div id="wrapper">
    <h4>Últimos pedidos</h4>

    <div v-if="!stringBusca" class="lista-items" >
      <div v-if="arrayObj.length">
        <div v-for="pedido in arrayObj" :key="pedido.id">
          <PedidoCard :pedido="pedido" />
        </div>
      </div>
      <div v-else>
        Carregando pedidos...
        <Spinner />
      </div>
    </div>
    <div v-else class="lista-items"> <!-- stringBusca tem conteúdo -->
      <div v-if="pedFilt.length">
        <div v-for="pedido in pedFilt" :key="pedido.id">
          <PedidoCard :pedido="pedido" />
        </div>
      </div>
      <div v-else>
        <p>Não há pedidos cadastrados para o termo buscado <b>"{{ stringBusca }}"</b>.</p>
        <p>Tente buscar por outro termo, p. ex.: "moqueca".</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import getArrayObj from '../composables/getArrayObj.js'
import PedidoCard from '../components/PedidoCard.vue'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import { computed, onUpdated, ref, watch } from '@vue/runtime-core'

export default {
  name: 'ListaPedidos',
  components: { Navbar, PedidoCard, Spinner },
  setup() {
    const stringBusca = ref('')

    const {arrayObj, errorArrayObj, loadArrayObj} = getArrayObj('pedidos')
    loadArrayObj()
    
    watch(arrayObj, () => {
      // Se inverte a ordem de arrayObj porque se deseja
      // que os pedidos mais recentes apareçam primeiro.
      arrayObj.value = arrayObj.value.reverse()
    })

    const pedFilt = computed(() => {
      return arrayObj.value.filter((ped) => 
        ped.ref_receita[1].toLowerCase().includes(stringBusca.value.toLowerCase().trim()))
    })
    
    const filtrar = (e) => {
      stringBusca.value = e
    }

    return { pedFilt, filtrar, stringBusca, arrayObj }
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