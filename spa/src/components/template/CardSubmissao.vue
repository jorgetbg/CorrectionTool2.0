<template>
  <v-card flat color="grey lighten-3" class="px-2 my-3 py-1">
    <v-layout>
      <v-flex xm12 md4>
        <div class="caption grey--text">Aluno</div>
        <div>{{alunoNome}}</div>
      </v-flex>
      <v-flex xm4 md2>
        <div class="caption grey--text">Desempenho</div>
        <template v-if="!loading">
          <div v-if="status == 'pendente'">Correção em progresso</div>
          <div v-else>{{nota}}%</div>
        </template>
      </v-flex>
      <v-flex xm4 md1>
        <div class="caption grey--text">Tentativas</div>
        <div v-if="!loading">{{tentativas}}</div>
      </v-flex>
      <v-flex xm4 md2 class="text-no-wrap">
        <div class="caption grey--text">Submissão</div>
        <a v-if="!loading" :href="arquivoLink">{{`${resolucaoFilename || 'download'}`}}</a>
      </v-flex>
      <v-flex xm4 md2 class="text-no-wrap">
        <div class="caption grey--text">Horario de envio</div>
        <span v-if="!loading">{{converterData(dataSubmissao)}}</span>
      </v-flex>
      <v-flex xs2 sm4 md1>
        <div class="text-right pr-12">
          <v-chip small :class="`${status} white--text my-2 caption v-chip--active`">{{ status }}</v-chip>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import dataMixin from "../../util/date";

export default {
  mixins: [dataMixin],

  props: {
    alunoNome: {
      type: String,
      required: true
    },
    nota: {
      type: Number,
      required: false
    },
    tentativas: {
      type: Number,
      required: false,
      default: 0
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    arquivoLink: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    dataSubmissao: {
      type: String,
      required: true
    },
    resolucaoFilename: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
.v-chip.aceito {
  background-color: #3cd1c2;
}

.v-chip.rejeitado {
  background-color: tomato;
}

.v-chip.pendente {
  background-color: orange;
}
</style>