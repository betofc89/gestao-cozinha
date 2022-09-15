<template>

  <div id="wrapper">
    
    <Modal v-if="mostrarModal" 
      :mensagem="msgModal" 
      :headerMensagem="headerMensagem" 
      :textoBotaoModal="textoBotaoModal" 
      @fecharModal="fecharModal" />
    
    <NavbarDetalhes :receita="{'nome': receita.nome + ' - Ped. #' + pedido.id, 'tempoPreparo': receita.tempoPreparo}" :link-volta="'lista_pedidos'"/>
    
    <HeaderDetalhes :receita="receita" :pedido="pedido" />

    <div class="cont-ingr">
      <section class="ingr-section">
        <h4>Ingredientes</h4>
        <div v-for="(ingrediente, index) in receita.ingredientes"
          :key="ingrediente" class="ingrediente-card"
          @click="mudarIngr(index)">
          <div class="cont-circulo">
            <div class="circulo status"
              :class="{ 'circulo status concluido': arrayIngred[index] }">
            </div>
          </div>
          <div class="desc-ingr">{{ingrediente.qtd}} {{ingrediente.un}} {{ingrediente.ingrediente}} </div>
        </div>
      </section>
    </div>

    <div class="cont-prep">
      <section class="prep-section">
        <h4>Modo de Preparo</h4>
        <div v-for="(passo, index) in receita.modoPreparo"
          :key="passo" class="passo-card"
          @click="mudarPasso(index)">
          <div class="cont-circulo">
            <div class="circulo status"
              :class="{ 'circulo status concluido': arrayPassos[index] }">
            </div>
          </div>
    
          <div class="passo-card-conteudo">
            <h4>Passo {{ passo.passo }}</h4>
            <p>{{ passo.descricaoModo }} </p>
          </div>
        </div>
      </section>
    </div>

    <FooterDetalhes
      :porcPassos="porcPassos"
      :numIngredMarcados="numIngredMarcados"
      :numIngredTotal = "numIngredTotal"
      :numPassosMarcados="numPassosMarcados"
      :numPassosTotal="numPassosTotal"
      @emitFooterDetalhes="emitFooterDetalhes" />
    
  </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import { onUpdated, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import getArrayObj from '../composables/getArrayObj.js'
import Modal from '../components/Modal.vue'
import NavbarDetalhes from '../components/NavbarDetalhes.vue'
import HeaderDetalhes from '../components/HeaderDetalhes.vue'
import FooterDetalhes from '../components/FooterDetalhes.vue'

export default {
  name: 'DetalhesPedido',
  components: { Modal, NavbarDetalhes, HeaderDetalhes, FooterDetalhes },
  setup() {
    const route = useRoute()
    const idReceita = ref()
    const receita = ref([])
    
    const { arrayObj: pedido, error: errorPedido, loadArrayObj: loadPedido } = getArrayObj('pedidos', route.params.id)
    loadPedido();

    watch(pedido, async () => {
      const { arrayObj: receitaWatch, error: errorReceita, loadArrayObj: loadReceita } = getArrayObj('receitas', pedido.value.ref_receita[0])
      await loadReceita()

      receita.value = receitaWatch.value 
    })
    
    /*----------------------------------------------------------------------*/

    const mostrarModal = ref(false)
    const msgModal = ref('')
    const headerMensagem = ref('')
    const textoBotaoModal = ref('')

    const numIngredTotal = ref(0)
    const numPassosTotal = ref(0)
    
    const numIngredMarcados = ref(0)
    const numPassosMarcados = ref(0)
    
    const arrayIngred = ref([])
    const arrayPassos = ref([])
    
    const porcPassos = ref(0)

    let preparacaoIniciada = false

    watch(receita, () => {
        document.getElementById("header-detalhes").style.backgroundImage = "url('/img/photos/" + receita.value.foto + "-grande.jpeg')"

        numIngredTotal.value = receita.value.ingredientes.length
        for (let i = 0; i < numIngredTotal.value; i++) {
          arrayIngred.value.push(false)
        }

        numPassosTotal.value = receita.value.modoPreparo.length
        for (let i = 0; i < numPassosTotal.value; i++) {
          arrayPassos.value.push(false)
        }
    })

    onUpdated(() => {
      numIngredMarcados.value = arrayIngred.value.reduce((partialSum, a) => partialSum + a, 0)
      numPassosMarcados.value = arrayPassos.value.reduce((partialSum, a) => partialSum + a, 0)
      porcPassos.value = Math.ceil((numPassosMarcados.value/numPassosTotal.value)*100)
    })

    const emitFooterDetalhes = (meuObjeto) => {
      preparacaoIniciada = meuObjeto.preparacaoIniciada
      mostrarModal.value = meuObjeto.mostrarModal
      msgModal.value = meuObjeto.msgModal
      headerMensagem.value = meuObjeto.headerMensagem
      textoBotaoModal.value = meuObjeto.textoBotaoModal
    }

    const fecharModal = () => {
      mostrarModal.value = false
      msgModal.value = ''
      headerMensagem.value = ''
    }

    const mudarIngr = (pos) => {
      if(!preparacaoIniciada) {
        arrayIngred.value[pos] = !arrayIngred.value[pos]
      }
    }

    const mudarPasso = (pos) => {
      if(preparacaoIniciada) {
        if(pos != 0 && pos != arrayPassos.value.length-1) {
          if(arrayPassos.value[pos-1] == true) {
            if(arrayPassos.value[pos+1] == false) {
              arrayPassos.value[pos] = !arrayPassos.value[pos]
            } else {
              mostrarModal.value = true
              msgModal.value = "Passos posteriores ao Passo " + Number(pos+1) + " já foram realizados! É necessário que eles sejam desmarcados para que se possa desmarcar o Passo " + Number(pos+1) + "."
            }
          } else {
            mostrarModal.value = true
            msgModal.value = "Para se marcar o Passo " + Number(pos+1) + ", é necessário que todos os passos anteriores estejam marcados."
          }
        } else if(pos == 0) { // pos = 0 --> Caso especial
          if(arrayPassos.value[pos+1] == false) {
            arrayPassos.value[pos] = !arrayPassos.value[pos]
          } else {
            mostrarModal.value = true
            msgModal.value = "Passos posteriores ao Passo " + Number(pos+1) + " já foram realizados! É necessário que eles sejam desmarcados para que se possa desmarcar o Passo " + Number(pos+1) + "."
          }
        } else { // pos = ultimo --> Caso especial
          if(arrayPassos.value[pos-1] == true) {
            arrayPassos.value[pos] = !arrayPassos.value[pos]
          } else {
            mostrarModal.value = true
            msgModal.value = "Para se marcar o Passo " + Number(pos+1) + ", é necessário que todos os passos anteriores estejam marcados."
          }
        }
      } else { // preparacaoIniciada == false
        mostrarModal.value = true
        msgModal.value = "Deve-se clicar no botão \"Iniciar Preparação\" na parte inferior desta página antes de marcar os passos."
      }
    }

    return { receita, pedido, arrayIngred, mudarIngr, numIngredMarcados, numIngredTotal, 
      mudarPasso, arrayPassos, numPassosMarcados, numPassosTotal, porcPassos,
      mostrarModal, msgModal, textoBotaoModal, fecharModal, headerMensagem, emitFooterDetalhes, preparacaoIniciada }
  }
}
</script>

<style scoped>
#wrapper {
  /* width: 50%; */
  user-select: none;
}

/* --------------------------------------- */

.cont-ingr {
  border-bottom: 1px solid #e4e4e4;
  background: linear-gradient(0, #fafafa 5%, white 15%);
  user-select: none;
  
}

.ingr-section, .prep-section {
  padding: 2rem;
  position: relative;
}

.ingr-section h4, .prep-section h4 { 
  margin: 0 0 1.5rem 0;
  padding: 0;
}

.ingrediente-card {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 0 0 1rem 0;
  cursor: pointer;
}

.ingrediente-card:last-child {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 0;
  cursor: pointer;
}

.circulo.status {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #e2e2e2;
}

.circulo.status.concluido {
  background: #6fd826;
  border: 2px solid #6fd826;
  background-image: url('/public/img/icons/icon-check.png');
  background-size: 35px;
  background-repeat: no-repeat;
  background-position-y: 1px;
}

/* ---------------------------------------------------------- */

.cont-prep {
  user-select: none;
  background: white;
}

.passo-card {
  display: flex;
  margin: 0 0 3rem 0;
  cursor: pointer;
}

.passo-card:last-child {
  display: flex;
  margin: 0 0 0 0;
  cursor: pointer;
}

.cont-circulo {
  padding-right: 1.5rem;
}

.passo-card-conteudo {
  margin: 0;
}

.passo-card p, .passo-card h4 {
  margin: 0;
  padding: 0;
}

</style>