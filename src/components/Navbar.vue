<template>

  <nav>
    <img src="/img/logos/logo-coco-bambu-mini.png" id="logo-coco">
    
    <div id="busca-div">
      <TextInput class="inputBuscarReceita"
          :inputlabel="txtLabel" 
          :viconname="'gi-magnifying-glass'" 
          :viconpos="'right'"
          :tipoCampo="'text'"
          :src="'img/icons/lupa.svg'"
          @emitTextInput="buscar" />
    </div>
    
    <div class="botoes-nav">

      <router-link :to="{name: 'lista_pedidos'}" class="botao-nav" >
        <img :src="'img/icons/chef-hat.svg'" class="icone"  />
        <span>Pedidos</span>
      </router-link>

      <router-link :to="{name: 'lista_receitas'}" class="botao-nav">
        <img :src="'img/icons/newspaper.svg'" class="icone"  />
        <span>Receitas</span>
      </router-link>

      <div class="botao-nav sair" @click="mostrarModalSair">
        <img :src="'img/icons/user-circle.svg'" class="icone"  />
        <span>Sair</span>
      </div>

      <Modal v-if="modalActive"
        :mensagem="'Tem certeza de que deseja sair?'" 
        :headerMensagem="'Sair da sessão atual?'" 
        :textoBotaoModal="null" 
        :simNao="true"
        :centerMensagem="true"
        @fecharModal="perguntarSair" />
      
    </div>

  </nav>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import { ref } from '@vue/reactivity';
import Modal from '../components/Modal.vue'
import { useRouter } from 'vue-router';
import sessionstorage from 'sessionstorage'

export default {
  name: 'Navbar',
  props: ['txtLabel'],
  emit: ['emitNavBar'],
  components: {TextInput, Modal },
  setup(props, {emit}) {
    const stringBusca = ref('')
    const receitasBusca = ref()
    const modalActive = ref(false)
    const router = useRouter()

    const buscar = (e) => {
      emit('emitNavBar', e)
    }

    const mostrarModalSair = () => {
      modalActive.value = true
    }

    const perguntarSair = (e) => {
      if(e == 'buttonSim') {
        modalActive.value = false
        sessionstorage.clear()
        router.push('/')
      }
      modalActive.value = false
    }

    return { buscar, mostrarModalSair, modalActive, perguntarSair }
  }
};
</script>

<style scoped>
nav {
  z-index: 1;
  position: sticky;
  top: 0;
  width: 100%;
  height: 65px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  background: #393939;
}

#logo-coco {
  margin-left: 1rem;
}

#busca-div {
  flex-grow: 0.75;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  z-index: 1;
}

.inputBuscarReceita {
  width: 100%;
  margin-bottom: 0;
}

.botoes-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  user-select: none;
}

.botoes-nav .botao-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: smaller;
  width: 50px;
  text-align: center;
  padding: 0 10px;
  height: 65px;

  color: #fafafa;
  background: transparent;
}

.botao-nav .icone {
  filter: invert(99%) sepia(100%) saturate(3%) hue-rotate(200deg) brightness(107%) contrast(100%);
  width: 24px;
  height: 24px;
  margin-bottom: 4px;

  user-select: none;
}

.botao-nav:hover > .icone {
  filter: invert(59%) sepia(64%) saturate(3726%) hue-rotate(349deg) brightness(103%) contrast(88%);
}

.router-link-active.botao-nav > .icone, 
.router-link-exact-active.botao-nav > .icone {
  filter: invert(59%) sepia(64%) saturate(3726%) hue-rotate(349deg) brightness(103%) contrast(88%);
} 

.router-link-active.botao-nav, 
.router-link-exact-active.botao-nav, 
.botao-nav:hover {
  color: var(--cor-laranja-normal);
  background: #fafafa;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: smaller;
  width: 50px;
  text-align: center;
  padding: 0 10px;
  height: 65px;
}

.botoes-nav .sair {
  cursor: pointer;
}


</style>