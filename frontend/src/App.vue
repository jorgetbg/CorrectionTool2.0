<template>
  <v-app class="grey lighten-4">
    <Navbar :user="user" v-if="autenticado != 'convidado'" v-on:login-status="checarAutenticacao"/>
    <v-content class="px4 pb-4 grey lighten-4" >
      <router-view  v-on:login-status="checarAutenticacao"></router-view>
    </v-content>
    
  </v-app>
</template>

<script>

import Navbar from './components/template/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },

  data: () => ({
    autenticado: "convidado",
    user:{
      nome: "João Augusto",
      gravatarUrl: ''
    }
    //
  }),
  methods:{
    checarAutenticacao(){
      let token = this.$cookie.get('x-access-token')
      if(!token) this.autenticado = "convidado"
      else{
        this.user = JSON.parse(window.localStorage.getItem('user'))
        this.autenticado = this.user.role
        //this.user.gravatarUrl = `https://www.gravatar.com/avatar/${this.user.gravatarUrl}`
      }
    }
  },
  created(){
    this.checarAutenticacao()
  },
};
</script>
