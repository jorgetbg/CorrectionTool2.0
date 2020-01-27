<template>
  <nav>
 <v-navigation-drawer
      v-model="drawer"
      app
      class="amber accent-3"
    >
      <v-list >
      <v-list-item-group >
        <v-list-item
          v-for="(item, i) in items"
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
      <v-btn text color="grey">
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
      items: [
        { text: 'Dashboard', icon: 'dashboard', route:"/" },
        { text: 'Matérias', icon: 'group', route:"/materias" },
        { text: 'Exercicios', icon: 'home_work', route:"exercicios" },
      ],
    };
  }
};
</script>

<style>
</style>