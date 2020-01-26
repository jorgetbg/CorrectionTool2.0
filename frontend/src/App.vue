<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="px4 pb-4 grey lighten-4" >
      <router-view></router-view>
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
    //
  }),
};
</script>
