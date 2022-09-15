<template>

  <div v-if="mostrarModal">
    <Modal :mensagem="msgModal" :headerMensagem="headerMensagem" @fecharModal="fecharModal" />
  </div>

  <div class="wrapper">
    <div class="box">
      
      <div class="box-balao-notificacao">
        <div id="balao-notificacao">
          <div class="notificacao">
            <div class="notif-left">
              <div class="num-notif-left">{{numPedidosPendentes}}</div>
              <div class="texto-notif-left">
                <span v-if="numPedidosPendentes == 1">Novo pedido</span>
                <span v-if="numPedidosPendentes > 1">Novos pedidos</span>
              </div>
            </div>
            <div class="notif-right">
              <p v-if="numPedidosPendentes == 1">Por favor, faça o login para ver o pedido e ter acesso à receita com o modo de preparo</p>
              <p v-if="numPedidosPendentes > 1">Por favor, faça o login para ver os pedidos e ter acesso às receitas com os modos de preparo</p>
            </div>
          </div>
          <div class="box-seta-notif"></div>
        </div>
      </div>
      
      
      <img src="/img/logos/logo-coco-bambu.png">
      
      <form>
        
        <TextInput class="inputNomeSenha"
          :inputlabel="'Nome do usuário'" 
          :viconname="'io-person'" 
          :viconpos="''"
          :tipoCampo="'text'"
          :src="'img/icons/user-circle.svg'"
          @emitTextInput="setNomeUsuario" />

        <TextInput class="inputNomeSenha"
          :inputlabel="'Senha'" 
          :viconname="'la-key-solid'" 
          :viconpos="''"
          :tipoCampo="'password'"
          :src="'img/icons/key.svg'"
          @emitTextInput="setSenhaUsuario" />

        <button @click.prevent="validarEntrada">Acessar</button>
      </form>

    </div> <!-- Fim da class box -->
  </div> <!-- Fim da class wrapper -->
</template>

<script>
import { ref } from '@vue/reactivity'
import router from '@/router'
import Modal from '../components/Modal.vue'
import TextInput from '../components/TextInput.vue'
import getArrayObj from '@/composables/getArrayObj'
import { login } from '../composables/auth.js'
import { watch } from '@vue/runtime-core'
import sessionstorage from 'sessionstorage'

export default {
  name: 'Login',
  components: { Modal, TextInput },

  setup() {
    const nomeUsuario = ref('')
    const senhaUsuario = ref('')
    const msgModal = ref('')
    const headerMensagem = ref('')
    const mostrarModal = ref(false)
    const numPedidosPendentes = ref()

    const {arrayObj, errorArrayObj, loadArrayObj} = getArrayObj('pedidos')
    loadArrayObj()

    watch(arrayObj, () => {
      const pendentes = arrayObj.value.filter((ped) => {
        return ped.status == "Pendente"
      })
      numPedidosPendentes.value = pendentes.length
    })

    const validarEntrada = async (e) => {
      const result = await login(nomeUsuario.value, senhaUsuario.value)
      if(result.success) {
        sessionstorage.setItem('token',result.token)
        router.push('/lista_receitas')
      } else {
        sessionstorage.clear()
        mostrarModal.value = true
        headerMensagem.value = result.msg
        msgModal.value = "O usuário e/ou senha digitados estão incorretos! Para entrar, utilize: Usuário: admin, Senha: admin"
      }
      console.log(result)

    }

    const fecharModal = () => {
      mostrarModal.value = false
      msgModal.value = ''
      headerMensagem.value = ''
    }

    const setNomeUsuario = (e) => {
      nomeUsuario.value = e
    }

    const setSenhaUsuario = (e) => {
      senhaUsuario.value = e
    }

    return { validarEntrada, nomeUsuario, senhaUsuario, msgModal, headerMensagem, mostrarModal, fecharModal, 
    setNomeUsuario, setSenhaUsuario, numPedidosPendentes }

  }

}
</script>

<style scoped>

.wrapper {
  display: flex;
  box-sizing: border-box;
  background: url('/public/img/layout/img-bg-login.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;
  padding: 0 0 0 0;
  height: 950px;
}

.box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10px;
  width: 100%;
  
  margin: 0 auto;
}

.box-balao-notificacao {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 0px;
  padding: 0;
  box-sizing: border-box;

  user-select: none;
}

#balao-notificacao {  
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  margin: 0 auto -1rem auto;
  
  animation: notifflut 5s forwards;
  animation-direction: normal;
  animation-timing-function: ease;

  box-sizing: border-box;
}

@keyframes notifflut {
  from { opacity: 0; margin-bottom: -3rem; }
  20% { opacity: 1; margin-bottom: 0rem; }
  to { opacity: 1; margin-bottom: 0rem; }
}

.notificacao {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 120px;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
}

.box-seta-notif {
  background: white;
  width: 50px;
  height: 50px;
  transform: rotateZ(45deg);
  position: relative;
  top: -40px;
}

.notif-left {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-right: 1rem;
  color: var(--cor-laranja-normal);
  font-size: small;
}

.num-notif-left {
  display: block;
  font-weight: bolder;
  font-size: 4rem;
  padding: 0;
  margin: 0;
  line-height: 100%;
}

.texto-notif-left {
  display: block;
}

.notif-right {
  width: 50%;
  font-size: small;
  font-style: italic;
  z-index: 1;
}

img {
  margin-bottom: 50px;
  user-select: none;
}

form {
  display: flex;
  flex-direction: column;
}

.inputNomeSenha {
  margin-bottom: 1rem;
}

button {
  border: none;
  height: 2.5rem;
  background: var(--cor-laranja-normal);
  cursor: pointer;
  color: white;
  font-weight: bolder;
  font-size: small;
}

button:hover {
  background: var(--cor-laranja-hover);
}
</style>