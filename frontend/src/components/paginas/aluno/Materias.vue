<template>
  <v-container>
    <div>
      <span class="title">Minhas matérias</span>
      <v-row>
        <v-col v-for="(matricula, i) in matriculas" :key="i" md="6">
          <v-card flat class="mb-1 px-3" :loading="matricula.carregando">
            <v-row class="py-1">
              <v-col md="6">
                <div class="caption grey--text">Nome da matéria</div>
                <div class="subtitle-1 black--text">{{matricula.materia.nome}}</div>
              </v-col>
              <v-col md="4">
                <div class="caption grey--text">Professor</div>
                <div class="subtitle-1 black--text">{{matricula.materia.professor.nome}}</div>
              </v-col>
                <v-col md="2">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                    <v-badge content="3" dot :color="matricula.resolucoes === matricula.exercicios ? 'white' : 'red'">
                      <div class="caption grey--text" v-on="on">Exercicios</div>
                      <div class="subtitle-1 black--text">{{matricula.resolucoes}}/{{matricula.exercicios}}</div>
                    </v-badge>
                    </template>
                    <span v-if="matricula.resolucoes !== matricula.exercicios">Você tem {{matricula.exercicios - matricula.resolucoes}} exercicios não entregues.</span>
                    <span v-else>Nenhum exercicio a ser entregue.</span>
                  </v-tooltip>
                </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import backend from "../../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      materias: [
        { nome: "", lotacao: 0, capacidade: 0, professor: "", carregando: true }
      ],
      matriculas: [
        {
          materia: {nome:" ", professor: {nome:''}},
          resolucoes: '',
          exercicios: ' ',
          carregando: true
        },
      ]
    };
  },
  created() {
    axios.get(`${backend.uri}/materia`).then(res => {
      this.materias = res.data.data;
    });

    axios.get(`${backend.uri}/matricula`).then(res => {
      this.matriculas = res.data.data.matriculas
    })
  },
};
</script>

<style>
</style>