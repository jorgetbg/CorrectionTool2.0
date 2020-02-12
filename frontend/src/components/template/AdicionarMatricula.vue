<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="amber accent-3" text v-on="on">
        <v-icon>playlist_add</v-icon>
        <span>Matricular-se</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Matricula</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Nome" v-model="materia.nome" readonly></v-text-field>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Senha"
            v-model="senhaMateria"
            :type="exibirSenha ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            :append-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="errorMessage"
            @click:append="exibirSenha = !exibirSenha"
          ></v-text-field>

          <v-btn class="success mx-0 mt-3" @click="submeter" :loading="submetendo">Adicionar Matéria</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>





<script>
import backend from '../../backend'
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      senhaMateria: "",
      errorMessage: "",
      exibirSenha: false,
      rules: {
        min: v => v.length >= 6 || "Min 6 caracteres",
        required: value => !!value || "Obrigatório."
      },
      submetendo: false
    };
  },
  methods: {
    submeter(){
      if(!this.validar()) return;
      this.submetendo = true;
      let matricula = {
        materiaId: this.materia._id,
        password: this.senhaMateria,
      }

      axios.post(`${backend.uri}/matricula/create`,matricula).then(res=>{
        this.resetar();
        this.dialog = false
        this.successCallback(this.materia, res.data.data.matricula[0])
      }).catch(e => {
        this.errorMessage = e.response.data.message
      }).finally(() => {
        this.submetendo = false;
      })

    },
    validar(){
      return this.$refs.form.validate();
    },
    resetar () {
      this.$refs.form.reset()
      this.nomeMateria= ""
      this.senhaMateria= ""
      this.exibirSenha= false
      this.capacidade=45
    }
  },
  props: {
    successCallback:{
      type: Function,
      required: false
    },
    materia:{
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>