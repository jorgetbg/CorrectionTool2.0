# CorrectionTool2.0
Uma forma de realizar correções de algorítmos de forma automatica e em tempo real, garantindo feedback instantâneo para o aluno.

## Professor
O professor deve cadastrar exercícios para uma de suas matérias (préviamente cadastradas), esse exercício deve ter um ou mais teste,
que serão utilizados durante a correção do exercício após cada submissão feita pelo aluno.
Cada teste consiste em uma entrada para o algorítmo do aluno e uma saida ideal para aquela entrada.

## Aluno
O aluno tem acesso a um dashboard que exibe todas as matérias em que ele esta matriculado, e a seus respectivos exercícios e prazos
de entrega.
Ao realizar a submissão de um exercício, o servidor ira executar o código dentro de um container, previnindo a execução de códigos
malíciosos, utilizando os dados de cada um dos testes préviamente cadastrados pelo professor. Após a execução, o servidor retorna
a nota do aluno.


## Backend
### API
Desenvolvida em Express, realiza a conexão entre o corretor e o frontend, além de fazer o gerênciamento dos alunos, professores, e suas respectivas 
funcionalidades, que variam desde registro até a submissão de um exercício previamente cadastrado.

### Corretor
Seram efetuadas modificações em uma plataforma já desenvolvida para ser chamada via requisições. Mais informações em https://drive.google.com/open?id=1lO6rkIcPqcpEbL9cu2mpJCezPDcfiwDP


## Frontend
EM BREVE

