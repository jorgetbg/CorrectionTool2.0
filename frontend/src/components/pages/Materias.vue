<template>
  <div class="materias">
    <v-subheader class="grey--text">MATERIAS</v-subheader>
    <v-container class="my-5">
      <adicionar-materia/>

      <v-row align-content="space-around">
        <v-col md="6" sm="12" class="px-2 py-1" v-for="(materia, i) in materias" :key="i">
          <v-expansion-panels :disabled="carregando">
            <v-expansion-panel :class="`${materia.carregando ? 'carregando' : ''}`" @change="buscarExerciciosMateria(materia)">
              <v-expansion-panel-header>
                <v-card flat :loading="materia.carregando" :class="`${materia.status} materia px-2 my-1`">
                  <v-layout wrap class="pa-3">
                    <v-flex xs="12" md="6" md6>
                      <div class="caption grey--text">Nome do matéria</div>
                      <div v-if="!carregando">{{materia.nome}}</div>
                    </v-flex>
                    <v-flex xs="6" md="1">
                      <div class="caption grey--text">Capacidade</div>
                      <div v-if="!carregando">{{materia.lotacao}} / {{materia.capacidade}}</div>
                    </v-flex>
                    <v-flex xs="2" sm="4" md="1">
                      <div class="caption grey--text">Status</div>
                      <v-switch v-if="!carregando" class="my-0" v-model="materia.status" disabled color="green"></v-switch>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-layout nowrap overflow-hidden>
                  <v-flex v-for="(aluno, i) in materia.alunos" :key="i">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon d-inline v-on="on">person</v-icon>
                      </template>
                      <span>{{aluno.nome}}</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
                <v-layout column px-6>
                  <v-flex v-for="(exercicio, j) in materia.exercicios" :key="j">
                    <card-exercicio
                      :exercicioNome="exercicio.descricao"
                      :submissoes="`0 / ${materia.capacidade}`"
                      :dataFinal="converterData(exercicio.prazo)"
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
import backend from '../../backend'
import axios from 'axios'
axios.defaults.withCredentials = true;


export default {
  data() {
    return {
      carregando: true,
      materias: [
        {carregando: true},
        {carregando: true}
      ]
    };
  },
  components: {
    "card-exercicio": CardExercicio,
    "adicionar-materia": AdicionarMateria
  },
  methods: {
    log(a){
      /* eslint-disable no-console */
      console.log(a);
      /* eslint-enable no-console */
    },
    buscarExerciciosMateria(materia){
      if(materia.dadosPreenchidos == true) return

      materia.dadosPreenchidos = true;
      materia.carregando = true;
      axios.get(`${backend.uri}/exercicio/show/${materia._id}`).then(res=>{
        materia.carregando = false;
        let exercicios = res.data.data.exercicios
        let aux = materia.nome
        materia.nome = ""
        materia.nome = aux //Vue nota a mudança e é forçado a renderizar novamente
        materia.exercicios = exercicios //Apenas adicionar um atributo ao objeto não esta forçando a renderização
        this.log(res.data)
      })
      axios.get(`${backend.uri}/${materia._id}/alunos`).then(res=>{
        materia.alunos = res.data.data.alunos
      })

    },
    converterData(data){
      data = parseInt(data)
      data = new Date(data)
      return data.toLocaleString().split(' ')[0] //Pega apenas a parte do dia, ignora 
    }
  },
  created() {
        axios.get(`${backend.uri}/materia`).then(res=>{
          this.carregando = false;
          let materias = res.data.data

          materias.forEach(materia => {
            materia.exercicio = []
            materia.alunos = []
            materia.carregando = false
            materia.dadosPreenchidos = false
          });
          this.materias = materias
        })
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
.v-expansion-panel.carregando{
  background-color: #0f0f0f;
}
</style>