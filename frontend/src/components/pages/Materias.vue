<template>
  <div class="materias">
    <v-subheader class="grey--text">MATERIAS</v-subheader>
    <v-container class="my-5">
      <v-layout>
        <v-fab-transition>
          <v-btn class="amber accent-3" fixed bottom right fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-layout>


      <v-row align-content="space-around">
        <v-col md="6" sm="12" class="px-2 py-1" v-for="(materia, i) in materias" :key="i">
          <v-card flat :class="`${materia.status} materia px-2 my-1`">
            <v-layout wrap class="pa-3">
              <v-flex xs="12" md="4">
                <div class="caption grey--text">Nome do matéria</div>
                <div>{{materia.nome}}</div>
              </v-flex>
              <v-flex xs="6" md="1">
                <div class="caption grey--text">Capacidade</div>
                <div>{{materia.capacidade}}</div>
              </v-flex>
              <v-flex xs="2" sm="4" md="1">
                <div class="caption grey--text">Status</div>
                <v-switch
                  right
                  class="my-0"
                  v-model="materia.status"
                  disabled
                  color="green"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      materias: [
        { nome: "Engenharia Prod. 2020/1", capacidade: "12/34", status: true },
        { nome: "BCC. 2020/1", capacidade: "42/42", status: true },
        { nome: "Engenharia Mec. 2020/1", capacidade: "7/34", status: true },
        { nome: "Engenharia Elet. 2019/2", capacidade: "30/34", status: false }
      ]
    };
  }
};
</script>

<style>

.materia.true{
  border-left: 4px solid #3cd1c2;
}
.materia.false{
  border-left: 4px solid tomato;
}
</style>