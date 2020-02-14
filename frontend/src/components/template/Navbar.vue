<template>
  <nav>
 <v-navigation-drawer
      v-model="drawer"
      app
      class="amber accent-3"
    >
      <v-layout column align-center>
        <v-flex class="mt-12">
          <v-avatar size="100">
            <img :src="`https://www.gravatar.com/avatar/${user.gravatarUrl}`" :alt="`Avatar de ${user.nome}.`">
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="mt-1">{{user.nome}}</p>
        </v-flex>
      </v-layout>
      <v-list >
      <v-list-item-group >
        <v-list-item
          v-for="(item, i) in (user.role === 'professor' ? professor : aluno)"
          :key="i"
          router :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="font-weight-bold"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Correction</span>
        <span>Tool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="deslogar" color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      professor: [
        { text: 'Exercicios', icon: 'home_work', route:"/exercicios" },
        { text: 'Matérias', icon: 'group', route:"/materias" },
      ],
      aluno:[
        { text: 'Matérias', icon: 'school', route:"/aluno/materias" },
        { text: 'Matricula', icon: 'playlist_add', route:"/aluno/matricula" },
      ],
    };
  },
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  methods:{
    deslogar(){
      this.$cookie.delete("x-access-token")
      window.localStorage.removeItem("user")
      this.$emit("login-status")
      this.$router.go("/login")
    }
  }
};
</script>

<style>
</style>