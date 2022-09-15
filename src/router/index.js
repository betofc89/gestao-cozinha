import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ListaReceitas from '../views/ListaReceitas.vue'
import ListaPedidos from '../views/ListaPedidos.vue'
import DetalhesReceita from '../views/DetalhesReceita.vue'
import DetalhesPedido from '../views/DetalhesPedido.vue'
import sessionstorage from 'sessionstorage'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {requiresAuth: false},

  },
  {
    path: '/lista_receitas',
    name: 'lista_receitas',
    component: ListaReceitas,
    meta: {requiresAuth: true},

  },
  {
    path: '/lista_pedidos',
    name: 'lista_pedidos',
    component: ListaPedidos,
    meta: {requiresAuth: true},

  },
  {
    path: '/detalhes_receita/:id',
    name: 'detalhes_receita',
    component: DetalhesReceita,
    props: true,
    meta: {requiresAuth: true},

  },
  {
    path: '/detalhes_pedido/:id',
    name: 'detalhes_pedido',
    component: DetalhesPedido,
    props: true,
    meta: {requiresAuth: true},

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  console.log('to', to)
  console.log('from', from)
  if(to.meta.requiresAuth) {
    const token = sessionstorage.getItem('token')
    if(token) {
      return true
    } else {
      return '/'
    }
  }
})

export default router
