import Vue from 'vue'
import Router from 'vue-router'
import Materias from './components/pages/Materias'
import Exercicios from './components/pages/Exercicios'
import Exercicio from './components/pages/Exercicio'
import Login from './components/pages/Login'
import Aluno from './components/pages/Aluno'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/materias',
      name: 'materias',
      component: Materias,
      meta: { requiresAuth: true, role: "professor" }
    },
    {
      path: '/exercicios',
      name: 'exercicios',
      component: Exercicios,
      meta: { requiresAuth: true, role: "professor" }
    },
    {
      path: '/exercicio/:id',
      name: 'exercicio',
      component: Exercicio,
      meta: { requiresAuth: true, role: "professor" }
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: Aluno,
      meta: { requiresAuth: true, role: "aluno" }
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

router.beforeEach((to, from, next) => {
  //let app = Vue
  const requerAuth = to.matched.some(record  => record.meta.requiresAuth)
  const requerProfessor = to.matched.some(record => record.meta.role == "professor")
  const user = JSON.parse(localStorage.getItem("user"))

  if (requerAuth) {
    if(!user)
      next('/login')
    else{//Esta logado
      if(requerProfessor){//Rota prof
        if(user.role == "professor")
          next()
        else
          next( '/aluno' )
      }else{ //Rota aluno
        next()
      }
    }
  }else{
    if(!user)
      next()
    else
      next("/aluno")
  }
  /*
  if (to.matched.some(record => record.meta.requiresAuth)) {//Se algum dos caminhos da URL de destino precisa de autenticacao
    if (app.cookie.get("x-access-token") == null  || localStorage.getItem("user")) {
      console.log(app.cookie.get("x-access-token"))
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
    else {
      let user = JSON.parse(localStorage.getItem("user"))
      if (to.matched.some(record => record.meta.role == "professor")) {
        if (user.role == "professor")
          next()
        else
          next({ name: "aluno" })
      }
    }
    next()
  }else{//Rotas de login
    console.log(".")
    if(app.cookie.get("x-access-token") == 'null')
      next( "/login" )
    else
      next({ name: "exercicios"})//Se for aluno, a proxima passada pela função vai levar ele para /aluno
    
    
  }
  */

})

export default router;