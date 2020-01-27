<template>
  <div class="exercicios">
    <v-subheader class="grey--text">EXERCÍCIOS</v-subheader>
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
        :exercicioNome="exercicio.nome"
        :materiaNome="exercicio.materia"
        :submissoes="exercicio.submissoes"
        :dataFinal="exercicio.dataFinal"
        :status="exercicio.status"
      >
      {{exercicio}}
      </card-exercicio>
    </v-container>
  </div>
</template>


<script>
import CardExercicio from "../template/CardExercicio";

export default {
  data() {
    return {
      exercicios: [
        {
          nome: "Implementar método da bisseção",
          materia: "Engenharia Prod. 2020/1",
          submissoes: "0/34",
          dataFinal: "30/01/2020",
          status: "pendente"
        },
        {
          nome: "Implementar método de Newton Raphson",
          materia: "Engenharia Mec. 2020/1",
          submissoes: "20/34",
          dataFinal: "18/02/2020",
          status: "aberto"
        },
        {
          nome: "Implementar fatorial",
          materia: "BCC. 2020/1",
          submissoes: "12/34",
          dataFinal: "07/02/2020",
          status: "aberto"
        },
        {
          nome: "Implementar método da secante",
          materia: "Engenharia Mec. 2020/1",
          submissoes: "29/34",
          dataFinal: "13/01/2020",
          status: "finalizado"
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
    }
  },
  components: {
    "card-exercicio": CardExercicio
  }
};
</script>

<style>
</style>