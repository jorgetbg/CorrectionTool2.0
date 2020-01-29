<template>
  <div class="exercicio">
    <v-container class="my-5">
      <v-card :loading="carregando" :class="`px-2 my-3`">
        <v-flex>
          <card-exercicio
            flat
            class="px-2 my-3"
            :exercicioNome="exercicio.descricao"
            :materiaNome="exercicio.materia.nome"
            :submissoes="`${exercicio.submissoesCount}`"
            :dataFinal="converterData(exercicio.prazo)"
            :status="exercicio.status"
          />
        </v-flex>
        <span v-if="submissoes != null && !carregando" class="title">Submissões</span>
        <span v-if="submissoes == null" class="title">Nenhuma submissão recebida</span>
        <template v-if="!carregando">
          <v-flex v-for="(sub, j) in submissoes" :key="j" my-3 mx-5>
            <card-submissao
              :alunoNome="sub.aluno.nome"
              :nota="sub.nota"
              :tentativas="sub.tentativas"
              :arquivoLink="`${backendConfig.uri}/resolucao/${sub._id}/download`"
              :loading="carregando"
              :status="sub.status"
              :dataSubmissao="sub.dataSubmissao"
              :resolucaoFilename="sub.resolucaoFilename"
            />
          </v-flex>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import dataMixin from '../../util/date'
import CardExercicio from "../template/CardExercicio";
import CardSubmissao from "../template/CardSubmissao";
import backend from "../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  mixins: [dataMixin],
  data() {
    return {
      backendConfig: backend,
      carregando: true,
      exercicio: {
        descricao: "",
        materia: { nome: "" },
        submissoesCount: "",
        prazo: "",
        status: ""
      },
      submissoes: [
        {
          aluno: { nome: "" },
          status: "",
          tentativas: 0
        }
      ]
    };
  },
  components: {
    "card-exercicio": CardExercicio,
    "card-submissao": CardSubmissao
  },
  methods: {
    log(a) {
      /* eslint-disable no-console */
      console.log(a);
      /* eslint-enable no-console */
    }
  },
  created() {
    const promisses = [
      axios.get(`${backend.uri}/${this.$route.params.id}/show`).then(res => {
        this.exercicio = res.data.data.exercicio;
      }),
      axios
        .get(`${backend.uri}/resolucoes/${this.$route.params.id}`)
        .then(ress => {
          this.submissoes = ress.data.data.resolucoes;
        })
    ];

    Promise.all(promisses).then(() => {
      this.carregando = false;
    });
  }
};
</script>

<style>
</style>