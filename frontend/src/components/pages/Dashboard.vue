<template>
  <div class="dashboard">
    <v-subheader class="grey--text">DASHBOARD</v-subheader>
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

      <v-card flat class="px-2 my-3" v-for="(exercicio, i) in exercicios" :key="i">
        <v-layout row wrap :class="`${exercicio.status} pa-3 exercicio`">
          <v-flex xs12 md5>
            <div class="caption grey--text">Nome do Exercício</div>
            <div>{{exercicio.nome}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Matéria</div>
            <div>{{exercicio.materia}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Submissões</div>
            <div>{{exercicio.submissoes}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Data final</div>
            <div>{{exercicio.dataFinal}}</div>
          </v-flex>
          <v-flex xs2 sm4 md1>
            <div class="text-right pr-12">
              <v-chip small :class="`${exercicio.status} white--text my-2 caption v-chip--active`">{{ exercicio.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      exercicios: [
        {nome:"Implementar método da bisseção", materia:"Engenharia Prod. 2020/1", submissoes:"0/34", dataFinal:"30/01/2020", status: "pendente"},
        {nome:"Implementar método de Newton Raphson", materia:"Engenharia Mec. 2020/1", submissoes:"20/34", dataFinal:"18/02/2020", status: "aberto"},
        {nome:"Implementar fatorial", materia:"BCC. 2020/1", submissoes:"12/34", dataFinal:"07/02/2020", status: "aberto"},
        {nome:"Implementar método da secante", materia:"Engenharia Mec. 2020/1", submissoes:"29/34", dataFinal:"13/01/2020", status: "finalizado"},
        ]
    };
  },
  methods: {
    ordenarPor(prop){
      this.exercicios.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    ordenarPorData(){
      this.exercicios.sort((a,b) => {Date.parse(a) - Date.parse(b)})
    }
  }
};
</script>

<style>
.exercicio.aberto{
  border-left: 4px solid #3cd1c2;
}
.exercicio.finalizado{
  border-left: 4px solid tomato;
}
.exercicio.pendente{
  border-left: 4px solid orange;
}
.v-chip.aberto{
  background: #3cd1c2;
}
.v-chip.pendente{
  background: orange;
}
.v-chip.finalizado{
  background: tomato;
}

</style>