<template>
  <nav id="navbar-detalhes">
    <router-link :to="{ name: linkVolta }">
      <div class="voltar-link">
        <img src="/img/icons/icon-back.png">
        <div>Voltar</div>
      </div>
    </router-link>

    <div id="nomeReceita">{{ receita.nome }}</div>

    <div id="box-tempo-preparo">
      <img src="/img/icons/icon-time.png">
      <div class="btp-dir">
        <span style="font-size: small;">Tempo de preparo</span> <br>
        <span style="font-weight: bold;">{{ receita.tempoPreparo }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'NavbarDetalhes',
  props: ['receita', 'linkVolta'],

  setup(props) {
    
    const route = useRoute()

    const fact = (d, d_0, d_f) => {
      return (d-d_0)/(d_f-d_0)
    }

    const calcValor = (h_0, h_f, f) => {
      return h_0 + (h_f - h_0) * f
    }

    const mudarNavbar = () => {
      let dist = window.scrollY;
      let dIni = 100;
      let dFin = 400;
      let el = document.getElementById("navbar-detalhes");
      let hIni = 100
      let hFin = 50
      let f = 0
      if (dIni <= dist && dist <= dFin) {
        f = fact(dist, dIni, dFin)
      } else if (dist > dFin) {
        f = 1
      } else {
        f = 0
      }
      el.style['backgroundColor'] = "rgba(0,0,0," + f + ")"
      el.style['height'] = calcValor(hIni, hFin, f) + "px"
    }

    const mudarNomeRecNavBar = () => {
      let dist = window.scrollY;
      let dIni = 400;
      let dFin = 500;
      let el = document.getElementById("nomeReceita");
      let opacIni = 0
      let opacFin = 1
      let f = 0
      if (dIni <= dist && dist <= dFin) {
        f = fact(dist, dIni, dFin)
      } else if (dist > dFin) {
        f = 1
      } else {
        f = 0
      }
      el.style['opacity'] = calcValor(opacIni, opacFin, f)
    }

    const mudarBoxTempoPreparoScale = () => {
      let dist = window.scrollY;
      let dIni = 100;
      let dFin = 400;
      let el = document.getElementById("box-tempo-preparo");
      let scaleIni = 100
      let scaleFin = 60
      let f = 0
      if (dIni <= dist && dist <= dFin) {
        f = fact(dist, dIni, dFin)
      } else if (dist > dFin) {
        f = 1
      } else {
        f = 0
      }
      el.style['scale'] = calcValor(scaleIni, scaleFin, f) + "%"
    }

    const mudarBoxTempoPreparoOpacity = () => {
      let dist = window.scrollY;
      let dIni = 450;
      let dFin = 500;
      let el = document.getElementById("box-tempo-preparo");
      let opacIni = 100
      let opacFin = 0
      let f = 0
      if (dIni <= dist && dist <= dFin) {
        f = fact(dist, dIni, dFin)
      } else if (dist > dFin) {
        f = 1
      } else {
        f = 0
      }
      el.style['opacity'] = calcValor(opacIni, opacFin, f) + "%"
    }

    window.onscroll = () => {
      // Permite que as funções listadas sejam chamadas 
      // apenas em "detalhes_" ("receita" ou "pedido").
      if(route.fullPath.includes("detalhes_receita") || route.fullPath.includes("detalhes_pedido")) {
        mudarNavbar();
        mudarNomeRecNavBar();
        mudarBoxTempoPreparoScale();
        mudarBoxTempoPreparoOpacity();
      }
    }

    return {}
  }

}
</script>

<style scoped>
nav#navbar-detalhes {
  position: fixed;
  top: 0;
  z-index: 2;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  
  padding: 0 1rem;
  height: 100px;
  background: rgba(0,0,0,0);
  
  user-select: none;
}

.voltar-link {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  z-index: 1;
  color: white;
}

.voltar-link img {
  width: 35px;
  height: 35px;
  margin-right: 5px;
  padding: 0;
}

#nomeReceita {
  color: white;
  font-weight: bolder;
  opacity: 0;
}

#box-tempo-preparo {
  display: flex;
  flex-direction: row;

  background: #fff;
  color: #202020;

  padding: 0.75rem;

  scale: 100%;
}

#box-tempo-preparo img {
  padding-right: 0.75rem;
  width: 40px;
  height: 40px;
}

.btp-dir:first-child {
  font-size: small;
}

</style>