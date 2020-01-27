<template>
  <v-card flat class="px-2 my-3">
    <v-layout row wrap :class="`${status} pa-3 exercicio  justify-space-around d-flex`">
      <v-flex xs12 md5>
        <div class="caption grey--text">Nome do Exercício</div>
        <div>{{exercicioNome}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2 v-if="materiaNome">
        <div class="caption grey--text">Matéria</div>
        <div>{{materiaNome}}</div>
      </v-flex>
      <v-flex xs2 sm4 md2>
        <div class="caption grey--text">Submissões</div>
        <div>{{submissoes}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Data final</div>
        <div>{{dataFinal}}</div>
      </v-flex>
      <v-flex xs2 sm4 md1>
        <div class="text-right pr-12">
          <v-chip
            small
            :class="`${status} white--text my-2 caption v-chip--active`"
          >{{ status }}</v-chip>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    exercicioNome: {
      type: String,
      required: true
    },
    materiaNome: {
      type: String,
      required: false
    },
    submissoes: {
        type: String,
        required: true
    },
    dataFinal: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
  }
};
</script>

<style>
</style>