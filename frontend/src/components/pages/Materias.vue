<template>
  <div class="materias">
    <v-subheader class="grey--text">MATERIAS</v-subheader>
    <v-container class="my-5">
      <adicionar-materia/>

      <v-row align-content="space-around">
        <v-col md="6" sm="12" class="px-2 py-1" v-for="(materia, i) in materias" :key="i">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class>
                <v-card flat :class="`${materia.status} materia px-2 my-1`">
                  <v-layout wrap class="pa-3">
                    <v-flex xs="12" md="4">
                      <div class="caption grey--text">Nome do matéria</div>
                      <div>{{materia.nome}}</div>
                    </v-flex>
                    <v-flex xs="6" md="1">
                      <div class="caption grey--text">Capacidade</div>
                      <div>{{materia.lotacao}} / {{materia.capacidade}}</div>
                    </v-flex>
                    <v-flex xs="2" sm="4" md="1">
                      <div class="caption grey--text">Status</div>
                      <v-switch class="my-0" v-model="materia.status" disabled color="green"></v-switch>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-layout nowrap overflow-hidden>
                  <v-flex v-for="(item, i) in materia.lotacao" :key="i">
                    <div>
                      <v-icon d-inline>person</v-icon>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout column px-6>
                  <v-flex v-for="(exercicio, j) in materia.exercicios" :key="j">
                    <card-exercicio
                      :exercicioNome="exercicio.nome"
                      :submissoes="exercicio.submissoes"
                      :dataFinal="exercicio.dataFinal"
                      :status="exercicio.status"
                    ></card-exercicio>
                  </v-flex>
                </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import CardExercicio from "../template/CardExercicio";
import AdicionarMateria from "../template/AdicionarMateria"

export default {
  data() {
    return {
      materias: [
        {
          nome: "Engenharia Prod. 2020/1",
          capacidade: 34,
          status: true,
          lotacao: 12,
          exercicios: [
            {
              nome: "Implementar método da bisseção",
              materia: "Engenharia Prod. 2020/1",
              submissoes: "0/34",
              dataFinal: "30/01/2020",
              status: "pendente"
            }
          ]
        },
        {
          nome: "BCC. 2020/1",
          capacidade: 42,
          status: true,
          lotacao: 8,
          exercicios: [
            {
              nome: "Implementar fatorial",
              materia: "BCC. 2020/1",
              submissoes: "12/34",
              dataFinal: "07/02/2020",
              status: "aberto"
            }
          ]
        },
        {
          nome: "Engenharia Mec. 2020/1",
          capacidade: 34,
          status: true,
          lotacao: 27,
          exercicios: [
            {
              nome: "Implementar método de Newton Raphson",
              materia: "Engenharia Mec. 2020/1",
              submissoes: "20/34",
              dataFinal: "18/02/2020",
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
        },
        {
          nome: "Engenharia Elet. 2019/2",
          capacidade: 34,
          status: false,
          lotacao: 33
        }
      ]
    };
  },
  components: {
    "card-exercicio": CardExercicio,
    "adicionar-materia": AdicionarMateria
  }
};
</script>

<style>
.materia.true {
  border-left: 4px solid #3cd1c2;
}
.materia.false {
  border-left: 4px solid tomato;
}
</style>