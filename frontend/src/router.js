import Vue from 'vue'
import Router from 'vue-router'
import Materias from './components/pages/Materias'
import Exercicios from './components/pages/Exercicios'
import Exercicio from './components/pages/Exercicio'
import Login from './components/pages/Login'
import Aluno from './components/pages/Aluno'
import Register from './components/pages/Register'
Vue.use(Router)

let router = new Router({

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requerAuth = to.matched.some(record  => record.meta.requiresAuth)
  const requerProfessor = to.matched.some(record => record.meta.role == "professor")
  const requerAluno = to.matched.some(record => record.meta.role == "aluno")
  const user = JSON.parse(localStorage.getItem("user"))

  if (requerAuth) {
    if(!user)
      next('/login')
    else{//Esta logado
      if(requerProfessor){//Rota prof
        if(user.role == "professor")
          next()
        else
          next('/aluno')
      }else if(requerAluno){ //Rota aluno
        if(user.role == "aluno")
          next()
        else
          next('/exercicios')
      }
    }
  }else{
    if(!user)
      next()
    else{
      if(user.role == "professor")
        next("/exercicios")
      else
        next("aluno")
    }
  }
})

export default router;