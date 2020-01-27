<template>
  <div class="exercicio">
      <v-container class="my-5">
          <v-card class="px-2 my-3">
              <v-flex>
                  <card-exercicio
                    flat
                    class="px-2 my-3"
                    :key="i"
                    :exercicioNome="nome"
                    :materiaNome="materia"
                    :submissoes="submissoesValor"
                    :dataFinal="dataFinal"
                    :status="status"
                />
              </v-flex>
              <span class="title">Submissões</span>
              <v-flex v-for="(sub, i) in submissoes" :key="i" my-3 mx-5>
                  <card-submissao
                  :alunoNome="sub.alunoNome"
                  :nota="sub.nota"
                  :tentativas="sub.tentativas"
                  :arquivoLink="sub.arquivoLink"
                  :status="sub.status"
                 />
              </v-flex>
          </v-card>
      </v-container>
  </div>
</template>

<script>
import CardExercicio from "../template/CardExercicio";
import CardSubmissao from "../template/CardSubmissao";


export default {
    data(){
        return{
          nome: "Implementar método de Newton Raphson",
          materia: "Engenharia Mec. 2020/1",
          submissoesValor: "20/34",
          dataFinal: "18/02/2020",
          status: "aberto",
          submissoes: [
              {
              alunoNome:"Teste",
              nota:72,
              tentativas:1,
              arquivoLink:'https://doc-08-88-docs.googleusercontent.com/docs/securesc/je87atb5c062rvee5d0at4j77t7brnot/giib2v9f5he06k0dejb1s1gpge6p0ub5/1580140800000/02486327127733517078/01212935123012662725/1lO6rkIcPqcpEbL9cu2mpJCezPDcfiwDP?h=15119862702099650131&e=download&authuser=1',
              status:"aceito"
              },
              {
              alunoNome:"Teste",
              nota:0,
              tentativas:2,
              arquivoLink:'https://doc-08-88-docs.googleusercontent.com/docs/securesc/je87atb5c062rvee5d0at4j77t7brnot/giib2v9f5he06k0dejb1s1gpge6p0ub5/1580140800000/02486327127733517078/01212935123012662725/1lO6rkIcPqcpEbL9cu2mpJCezPDcfiwDP?h=15119862702099650131&e=download&authuser=1',
              status:"pendente"
              },
              {
              alunoNome:"Teste",
              nota:19,
              tentativas:2,
              arquivoLink:'https://doc-08-88-docs.googleusercontent.com/docs/securesc/je87atb5c062rvee5d0at4j77t7brnot/giib2v9f5he06k0dejb1s1gpge6p0ub5/1580140800000/02486327127733517078/01212935123012662725/1lO6rkIcPqcpEbL9cu2mpJCezPDcfiwDP?h=15119862702099650131&e=download&authuser=1',
              status:"rejeitado"
              }
          ]
        }
    },
    components: {
        "card-exercicio": CardExercicio,
        "card-submissao": CardSubmissao
  }
}
</script>

<style>

</style>