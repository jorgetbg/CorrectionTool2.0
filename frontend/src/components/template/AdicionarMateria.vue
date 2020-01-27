<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="amber accent-3" fixed bottom right fab v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Adicionar nova matéria</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Nome" v-model="nomeMateria" :rules="[rules.required, rules.min]"></v-text-field>
          <v-text-field
            label="Senha"
            v-model="senhaMateria"
            :type="exibirSenha ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            :append-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="exibirSenha = !exibirSenha"
          ></v-text-field>
          <div>
                <v-subheader class="pl-0">Máximo de alunos: {{capacidade}}</v-subheader>
                <v-slider v-model="capacidade" thumb-label="always" :thumb-size="24" min="1" max="45"></v-slider>
          </div>
          <v-btn class="success mx-0 mt-3" @click="submeter" :loading="submetendo">Adicionar Matéria</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>





<script>
export default {
  data() {
    return {
      nomeMateria: "",
      senhaMateria: "",
      exibirSenha: false,
      capacidade:45,
      rules: {
        min: v => v.length >= 6 || "Min 6 caracteres",
        required: value => !!value || "Obrigatório."
      },
      submetendo: false
    };
  },
  methods: {
    on(){
      this.resetar();
    },
    submeter(){
      if(!this.validar()) return;
      alert('');
      this.resetar();
    },
    validar(){
      this.submetendo = true;
      //return this.$refs.form.validate();
    },
    resetar () {
      this.$refs.form.reset()
      this.nomeMateria= ""
      this.senhaMateria= ""
      this.exibirSenha= false
      this.capacidade=45
    }
  }
};
</script>

<style>
</style>