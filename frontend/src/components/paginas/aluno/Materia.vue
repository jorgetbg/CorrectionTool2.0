<template>
  <v-container>
    <v-card :loading="carregando">
      <v-card-text>
        <span class="title black--text">{{materia.nome}}</span>
        <v-expansion-panels class="mt-3" >
          <v-expansion-panel v-for="exercicio in exercicios" :key="exercicio._id">
            <v-expansion-panel-header class="font-weight-bold subtitle-1">{{exercicio.descricao}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              {{exercicio.descricao}}
              <v-divider class="my-2"/>
              <v-btn text>
                <v-icon>help_outline</v-icon>
                <span>Ajuda</span>
              </v-btn>
              <v-btn text>
                <v-icon>attach_file</v-icon>
                <span>Enviar</span>
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import backend from "../../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      materia: {
        nome: "",
        professor: ""
      },
      exercicios: [{}],

      carregando: true
    };
  },
  created() {
    axios
      .get(`${backend.uri}/materia/${this.$route.params.id}/show`)
      .then(res => {
        this.materia = res.data.data;
        this.carregando = false;
      });
    axios
      .get(`${backend.uri}/exercicio/show/${this.$route.params.id}`)
      .then(res => {
        this.exercicios = res.data.data.exercicios;
      });
  }
};
</script>
<style>
</style>