<template>
  <footer>

    <div class="footer-esq">
      <span>Status <b>{{ porcPassos }}%</b> pronto e {{ minutos }} minuto(s) utilizado(s)</span>
      <div class="barra-status" :style="getBarraStatusStyle">
      </div>
    </div>

    <div class="botao-footer" @click="buttonFooterHandler"
      :class="getBotaoFooterClass()" >
      <span v-if="statusButtonFooter == 'iniciar-preparacao-disabled' || statusButtonFooter == 'iniciar-preparacao-enabled'">Iniciar Preparação</span>
      <span v-if="statusButtonFooter == 'finalizar-disabled' || statusButtonFooter == 'finalizar-enabled'">Finalizar</span>
    </div>

  </footer>
</template>

<script>
import { computed, onUpdated, ref, watchEffect } from '@vue/runtime-core'
export default {
  name: 'FooterDetalhes',
  emits: ['emitFooterDetalhes'],
  props: ['porcPassos', 'numIngredMarcados', 'numIngredTotal', 'numPassosMarcados', 'numPassosTotal'],
  setup(props, {emit}) {

    const mostrarModal = ref(false)
    const msgModal = ref('')
    const headerMensagem = ref('')
    const textoBotaoModal = ref('')
    const preparacaoIniciada = ref(false)
    const statusButtonFooter = ref('')

    /* -------------------------------- */

    const timer = ref(null)
    const reactionTime = ref(0)
    const minutos = ref('')
    const segundos = ref('')

    const iniciarRelogio = () => {
      setTimeout(() => {
        startTimer()
      }, 0)
    }

    const pararRelogio = () => {
      clearInterval(timer.value)
    }

    const startTimer = () => {
      timer.value = setInterval(() => {
        reactionTime.value += 1
      }, 1000)
    }   

    watchEffect(() => {
      minutos.value = Math.floor(reactionTime.value/60)
      segundos.value = reactionTime.value - minutos.value*60
    })

    /* -------------------------------- */

    const getBarraStatusStyle = computed(() => {
      let stringBg = ''
      if (props.porcPassos == 0) {
        stringBg = `background: linear-gradient(90deg, #f17924 ${7}%, #fff ${7}%)`
      } else if(props.porcPassos < 100) {
        stringBg = `background: linear-gradient(90deg, #f17924 ${props.porcPassos}%, #fff ${props.porcPassos}%)`
      } else {
        stringBg = `background: linear-gradient(90deg, #6fd826 ${100}%, #fff ${100}%)`
      }
      return stringBg
    })

    const mudarStatusBotaoFooter = () => {
      if(!preparacaoIniciada.value) {
        if(props.numIngredMarcados != props.numIngredTotal) {
          statusButtonFooter.value = "iniciar-preparacao-disabled"
        } else { // props.numIngredMarcados == props.numIngredTotal
          statusButtonFooter.value = "iniciar-preparacao-enabled"
        }
      } else { // preparacaoIniciada == true
        if(props.numPassosMarcados != props.numPassosTotal) {
          statusButtonFooter.value = "finalizar-disabled"
        } else {
          statusButtonFooter.value = "finalizar-enabled"
        }
      }
    }

    const getBotaoFooterClass = () => {
      let valorReturn = '';
      if(statusButtonFooter.value == 'iniciar-preparacao-disabled' || statusButtonFooter.value == 'finalizar-disabled') {
        valorReturn = 'disabled';
      } else {
        if(statusButtonFooter.value == 'finalizar-enabled') {
          valorReturn = 'finalizar';
        }
      }
      return valorReturn;
    }

    const buttonFooterHandler = () => {
      mostrarModal.value = false
      msgModal.value = ''
      headerMensagem.value = ''
      textoBotaoModal.value = ''
      
      if (props.numIngredMarcados != props.numIngredTotal) {
        mostrarModal.value = true
        msgModal.value = "Para iniciar a preparação, certifique-se de que você tem todos os ingredientes selecionados!"
      } else { // numIngredMarcados == numIngredTotal
        if(!preparacaoIniciada.value) {
          iniciarRelogio()
          preparacaoIniciada.value = true
          mudarStatusBotaoFooter() // Esta chamada é necessária.
        } else { // preparacaoIniciada == true
          if(props.numPassosMarcados != props.numPassosTotal) {
            mostrarModal.value = true
            msgModal.value = "Todos os passos devem ser marcados antes de finalizar a receita!"
          } else {
            pararRelogio()
            mostrarModal.value = true
            msgModal.value = "Prato finalizado com sucesso em " + minutos.value + " minutos e " + segundos.value + " segundos."
            headerMensagem.value = "OBRIGADO"
            textoBotaoModal.value = "OK"
          }
        }
      }

      emit('emitFooterDetalhes', {
        'mostrarModal':mostrarModal.value, 
        'msgModal': msgModal.value, 
        'headerMensagem': headerMensagem.value,
        'textoBotaoModal': textoBotaoModal.value,
        'preparacaoIniciada': preparacaoIniciada.value
        })
    }

    onUpdated(() => {
      mudarStatusBotaoFooter()
    })

    return { getBarraStatusStyle, buttonFooterHandler, statusButtonFooter, 
    reactionTime, minutos, segundos, iniciarRelogio, pararRelogio, getBotaoFooterClass }
  }

}
</script>

<style scoped>
footer {
  position: sticky;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1rem 2rem;
  background-color: #dddddd;

  user-select: none;
}

.footer-esq {
  display: flex;
  flex-direction: column;
  font-size: medium;
  justify-content: center;
}

.barra-status {
  margin-top: 5px;
  width: 200px;
  height: 3px;
}

.botao-footer {
  background-color: var(--cor-laranja-normal);
  border: none;
  padding: 0.75rem 1rem;
  color: white;
  font-weight: bold;
  min-width: 10rem;
  text-align: center;
  cursor: pointer;
}

.botao-footer:hover {
  background-color: var(--cor-laranja-hover);
}

.disabled {
  /* background-color: rgb(165, 165, 165); */
  cursor: not-allowed;
}

.disabled:hover{
  /* background-color: rgb(185, 185, 185); */
  background-color: var(--cor-laranja-hover);
}

.botao-footer.finalizar {
  background-color: var(--cor-verde-normal);
}

.botao-footer.finalizar:hover {
  background-color: var(--cor-verde-hover);
}
</style>