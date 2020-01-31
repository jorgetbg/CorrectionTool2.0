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
            :submissoes="exercicio.submissoesCount"
            :dataFinal="converterData(exercicio.prazo)"
            :status="exercicio.status"
          />
        </v-flex>

        <v-flex>
          <v-stepper v-model="stepperAtivo">
            <v-stepper-header>
              <template v-for="n in testes.length">
                <v-stepper-step                
                  :key="`${n}-step`"
                  :complete="stepperAtivo > n"
                  :step="n"
                  edit-icon="arrow_drop_down"
                  editable
                >Teste {{n}}</v-stepper-step>
                <v-divider v-if="n !== testes.length" :key="n"></v-divider>
              </template>
              <v-divider key="divider"></v-divider>
              <v-stepper-step
                key="addStep"
                :complete="stepperAtivo > testes.length + 1"
                step="+"
                editable
              >
                <span>Adicionar novo teste</span>
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content v-for="n in testes.length" :key="`${n}-content`" :step="n">
                <span class="title">Entrada:</span>
                <v-container>
                  <v-row align="start">
                    <v-col v-for="(teste, i) in testes[n - 1].input" :key="i" md="2">
                      <v-text-field :value="teste" outlined readonly></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <span class="title">Saida:</span>
                <v-textarea rows="1" :value="testes[n-1].output" outlined readonly></v-textarea>
              </v-stepper-content>
              <v-stepper-content  step="+">
                <v-form ref="form">
                  <span class="title">Entrada:</span>
                  {{testeSendoAdicionado.input}}
                  <v-container>
                    <v-row align="start">
                        <v-col md="2"  v-for="i in testeSendoAdicionado.input.length + 1" :key="i" class="ml-2">
                          <v-text-field v-model="testeSendoAdicionado.input[i-1]" outlined :label="`Argumento ${i}`"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn text fab @click="testeSendoAdicionado.input.pop()"><v-icon>remove</v-icon></v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea v-model="testeSendoAdicionado.output" outlined rows="3" :rules="rules"></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row justify="end">
                      <v-col class="mx-2" md="1">
                        <v-btn @click="limparForm">
                          Limpar
                        </v-btn>
                      </v-col>
                      <v-col md="1">
                        <v-btn class="success" @click="adicionarTeste">
                          <v-icon>add</v-icon>
                          Salvar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
        <template v-if="!carregando">
          <v-card class="my-6">
            <v-flex>
              <span class="title">Submissoes:</span>
            </v-flex>
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
          </v-card>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import dataMixin from "../../util/date";
import CardExercicio from "../template/CardExercicio";
import CardSubmissao from "../template/CardSubmissao";
import backend from "../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  mixins: [dataMixin],
  data() {
    return {
      stepperAtivo: 1,
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
      ],
      testeSendoAdicionado: {
        input: [],
        output: ""
      },
      testes: [
        {
          input: ["@(x)x^2 + 2*x - 50", "@(x) 2*x + 2", "3"],
          output: "6.141428"
        },
        {
          input: ["@(x) x^2 - 10", "@(x) 2*x", "15"],
          output: "3.1622"
        }
      ],
      rules: [ value => !!value || "Obrigatório."]
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
    },
    limparForm(){
      this.$refs.form.reset()
      this.testeSendoAdicionado = {
        input: [],
        output: ""
      }
    },
    adicionarTeste(){
      if(this.$refs.form.validate()){
        let testeClone = JSON.parse(JSON.stringify(this.testeSendoAdicionado))
        this.testes.push(testeClone)
        this.limparForm()
      }
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