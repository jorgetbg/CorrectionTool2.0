import Vue from 'vue'
import Router from 'vue-router'
import Materias from './components/pages/Materias'
import Exercicios from './components/pages/Exercicios'
import Exercicio from './components/pages/Exercicio'
import Login from './components/pages/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/materias',
      name: 'materias',
      component: Materias
    },
    {
      path: '/',
      name: 'exercicios',
      component: Exercicios
    },
    {
      path: '/exercicio/:id',
      name: 'exercicio',
      component: Exercicio
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})