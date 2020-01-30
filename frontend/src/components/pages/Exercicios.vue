<template>
  <div class="exercicios">
    <v-subheader class="grey--text">EXERCÍCIOS</v-subheader>
    <adicionar-exercicio :adicionarCallback="adicionarExercicio"/>

    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small text color="grey" @click="ordenarPor('nome')">
          <v-icon>home_work</v-icon>
          <span class="caption">Ordenar por exercicio</span>
        </v-btn>
        <v-btn small text color="grey" @click="ordenarPor('materia')">
          <v-icon>school</v-icon>
          <span class="caption">Ordenar por matéria</span>
        </v-btn>
        <v-btn small text color="grey" @click="ordenarPor('status')">
          <v-icon>check_box</v-icon>
          <span class="caption">Ordenar por status</span>
        </v-btn>
        <v-btn small text color="grey" @click="ordenarPorData()" disabled>
          <v-icon>calendar_today</v-icon>
          <span class="caption">Ordenar por data de final</span>
        </v-btn>
      </v-layout>

      <card-exercicio
        flat
        class="px-2 my-3"
        v-for="(exercicio, i) in exercicios"
        :key="i"
        :loading="carregando"
        :exercicioNome="exercicio.descricao"
        :materiaNome="exercicio.materia.nome"
        :submissoes="exercicio.submissoesCount"
        :dataFinal="exercicio.prazo"
        :status="exercicio.status"
        :id="exercicio._id"
      >
      {{exercicio}}
      </card-exercicio>
    </v-container>
  </div>
</template>


<script>
import CardExercicio from "../template/CardExercicio";
import AdicionarExercicio from "../template/AdicionarExercicio";
import backend from '../../backend'
import axios from 'axios'
axios.defaults.withCredentials = true;


export default {
  data() {
    return {
      carregando: true,
      exercicios: [
        {
          descricao: "",
          materia: {nome:""},
          submissoes: "",
          prazo: "",
          status: ""
        }
      ]
    };
  },
  methods: {
    ordenarPor(prop) {
      this.exercicios.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    ordenarPorData() {
      this.exercicios.sort((a, b) => {
        Date.parse(a) - Date.parse(b);
      });
    },
    adicionarExercicio(exercicio){
      this.exercicios.unshift(exercicio)
    }
  },
  components: {
    "card-exercicio": CardExercicio,
    "adicionar-exercicio": AdicionarExercicio
  },
  created(){
    axios.get(`${backend.uri}/exercicios`).then(res => {
      this.exercicios = res.data.data.exercicios
      this.carregando = false

    })
  }
};
</script>

<style>
</style>