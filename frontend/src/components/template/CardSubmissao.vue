<template>
    <v-card flat color="grey lighten-3" class="px-2 my-3 py-1">
        <v-layout>
            <v-flex xm12 md5>
                <div class="caption grey--text">Aluno</div>
                <div>{{alunoNome}}</div>
            </v-flex>
            <v-flex xm4 md2>
                <div class="caption grey--text">Desempenho</div>
                <template>
                    <div v-if="status == 'pendente'">Correção em progresso</div>
                    <div v-else>{{nota}}%</div>
                </template>
            </v-flex>
            <v-flex xm4 md2>
                <div class="caption grey--text">Tentativas</div>
                <div>{{tentativas}}</div>
            </v-flex>
            <v-flex xm4 md2 class="text-no-wrap">
                <div class="caption grey--text">Submissão</div>
                <a :href="arquivoLink">Download</a>
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
        required: true
    },
    arquivoLink: {
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
.v-chip.aceito{
    background-color: #3cd1c2;
}

.v-chip.rejeitado{
    background-color: tomato;
}

.v-chip.pendente{
    background-color: orange;
}

</style>