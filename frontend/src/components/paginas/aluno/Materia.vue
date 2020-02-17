<template>
  <v-container>
    <v-card :loading="carregando">
      <v-card-text>
        <span class="title black--text">{{materia.nome}}</span>
        <v-expansion-panels class="mt-3">
          <v-expansion-panel v-for="exercicio in exercicios" :key="exercicio._id" :class="`${exercicio.prazo - new Date().getTime() > 0 ? 'adiantado' : 'atrazado'}`">
            <v-expansion-panel-header class="font-weight-bold subtitle-1">{{exercicio.descricao}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              {{exercicio.descricao}}
              <v-divider class="my-2" />
              <v-row>
                <v-col>
                    <v-form :ref="`form-${exercicio._id}`">
                        <v-file-input accept=".m" label="Enviar" v-model="exercicio.file" :rules="[regras.required]"></v-file-input>
                    </v-form>
                </v-col>
              </v-row>
              <v-row class="align-center justify-end">
                    <v-btn text class="mx-6">
                        <v-icon>help_outline</v-icon>
                        <span>Ajuda</span>
                    </v-btn>
                    <v-btn text @click="upload(exercicio)">
                        <span class="black--text font-weight-bold">Enviar</span>
                    </v-btn>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import backend from "../../../backend";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      materia: {
        nome: "",
        professor: ""
      },
      exercicios: [{}],
      carregando: true,
      regras: {
          required: value => !!value || "Obrigatório.",
      },
      ev: null
    };
  },
  methods:{
      upload(exercicio){

        if(this.$refs[`form-${exercicio._id}`][0].validate()){
            let formData = new FormData()
            formData.append('arquivoResolucao', exercicio.file);
            formData.append('exercicioId', exercicio._id);
            axios.post(`${backend.uri}/resolucao/submit`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
             /* eslint-disable no-console */
             console.log(res)
            /* eslint-enable no-console */
            }).catch(e => {
                /* eslint-disable no-console */
                console.log(e.response)
                /* eslint-enable no-console */
            })
        }
      }
  },
  created() {
    axios
      .get(`${backend.uri}/materia/${this.$route.params.id}/show`)
      .then(res => {
        this.materia = res.data.data;
        this.carregando = false;
      });
    axios
      .get(`${backend.uri}/exercicio/show/${this.$route.params.id}`)
      .then(res => {
        this.exercicios = res.data.data.exercicios;
      });
  }
};
</script>
<style>

.atrazado .v-expansion-panel-header, .atrazado .v-expansion-panel-content{
    border-left: 4px solid tomato;
}
.adiantado .v-expansion-panel-header, .adiantado .v-expansion-panel-content{
    border-left: 4px solid #3cd1c2;
}


</style>



