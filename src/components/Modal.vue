<template>
  <div class="backdrop" @dblclick.self="fecharModal">
    <div class="modal" >
      <h4>{{ headerMensagem }}</h4>
      <p :class="{'centerText': centerMensagem === true}">{{ mensagem }}</p>
      
      <div v-if="simNao">
        <div style="display: flex; flex-direction: row;">
          <button @click="fecharModal('buttonSim')">
            Sim
          </button>
          <button @click="fecharModal('buttonNao')">
            Não
          </button>
        </div>
      </div>
      
      <div v-else>
        <div v-if="textoBotaoModal">
          <button @click="fecharModal()">
            {{ textoBotaoModal }}
          </button>
        </div>
        <div v-else>
          <button @click="fecharModal">
            Entendi
          </button>
        </div>
      </div>

      <div @click="fecharModal" class="botao-fechar">
        <img src="/img/icons/icon-close.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  emits: ['fecharModal'],
  props: ['mensagem', 'headerMensagem', 'textoBotaoModal', 'simNao', 'centerMensagem'],
  setup(props, {emit}) {
    
    const fecharModal = (e) => {
      emit('fecharModal', e)
    }

    window.addEventListener('keypress', (e) => {
      if(e.key == 'Enter' || e.key == 'Escape') {
        fecharModal()
      }
    })

    return { fecharModal }
  }
}
</script>

<style scoped>
.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(20, 11, 0, 0.65);
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 3;
}

.modal {
  width: 350px;
  min-height: 250px;
  padding: 2rem 2rem;
  margin: 150px auto;

  position: relative;
  z-index: 4;

  background: #fff;

  text-align: justify;

  font-size: medium;
  line-height: 2rem;

  user-select: none;
}

.modal h4 {
  text-align: center;
}

.centerText {
  text-align: center;
}

.modal button {
  font-size: medium;
  display: block;
  padding: 1rem 3rem;
  margin: 70px auto;
  border: 3px solid black;
  font-weight: bold;

  cursor: pointer;
  transition: box-shadow .2s ease-in-out;
}

.modal button:hover {
  border-color: var(--cor-laranja-hover);
  color: white;
  background: var(--cor-laranja-hover);
}

.modal .botao-fechar {
  display: inline-block;
  padding: 0;
  margin: 0;
  position: absolute;
  top: -45px;
  right: 0;

  cursor: pointer;
}

</style>