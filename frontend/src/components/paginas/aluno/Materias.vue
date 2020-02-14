<template>
  <v-container>
      <v-row>
        <v-col>
          <span class="title">Minhas matérias</span>
        </v-col>
      </v-row>
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
                    <v-badge
                      content="3"
                      dot
                      :color="matricula.resolucoes === matricula.exercicios ? 'white' : 'red'"
                    >
                      <div class="caption grey--text" v-on="on">Exercicios</div>
                      <div
                        class="subtitle-1 black--text"
                      >{{matricula.resolucoes}}/{{matricula.exercicios}}</div>
                    </v-badge>
                  </template>
                  <span
                    v-if="matricula.resolucoes !== matricula.exercicios"
                  >Você tem {{matricula.exercicios - matricula.resolucoes}} exercicios não entregues.</span>
                  <span v-else>Nenhum exercicio a ser entregue.</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination v-model="page" :length="pages" v-if="pages > 1" @input="paginacao" />
          </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import backend from "../../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      page: 1,
      pages: 1,
      matriculas: [
        {
          materia: { nome: " ", professor: { nome: "" } },
          resolucoes: "",
          exercicios: " ",
          carregando: true
        }
      ]
    };
  },
  created() {
    axios.get(`${backend.uri}/matricula`).then(res => {
      this.matriculas = res.data.data;
      let metadata = res.data.meta;
      this.pages = Math.ceil(metadata.matriculas / metadata.itensPagina);
    });
  },
  methods: {
    paginacao(pagina) {
      axios.get(`${backend.uri}/matricula?page=${pagina}`).then(res => {
        this.matriculas = res.data.data;
      });
    }
  }
};
</script>

<style>
</style>