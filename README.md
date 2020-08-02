# CorrectionTool2.0
Uma forma de realizar correções de algorítmos de forma automatica e em tempo real, garantindo feedback instantâneo para o aluno.
Trabalho realizado como projeto de Iniciação Tecnológica pela UTFPR, campus de Ponta Grossa. 

*Modulo de correção ainda esta em desenvolvimento.* Este modulo esta com problemas na geração da nota, porém o codigo do ajulo ja é executado e comparado com o output de cada teste. Após a submissão do codigo feita pelo aluno, um websocket é aberto entre o aluno e o servidor para acompanhar o progresso da correção.

## Professor
O professor deve cadastrar exercícios para uma de suas matérias (préviamente cadastradas), esse exercício deve ter um ou mais teste,
que serão utilizados durante a correção do exercício após cada submissão feita pelo aluno.
Cada teste consiste em uma entrada para o algorítmo do aluno e uma saida ideal para aquela entrada.

![GitHub Logo](https://media.giphy.com/media/efxitnd1jNkiGxTEtZ/giphy.gif)

## Aluno
O aluno tem acesso a um dashboard que exibe todas as matérias em que ele esta matriculado, e a seus respectivos exercícios e prazos
de entrega.
Ao realizar a submissão de um exercício, o servidor ira executar o código dentro de um container, previnindo a execução de códigos
malíciosos, utilizando os dados de cada um dos testes préviamente cadastrados pelo professor. Após a execução, o servidor retorna
a nota do aluno.

![GitHub Logo](https://media.giphy.com/media/SwyJsYmgyxdNEm1iyN/giphy.gif)


## Backend
### API
Para o desenvolvimento da plataforma é utilizado uma API REST,  que expõe um conjunto de rotas para o cadastro e a obtenção de informações do banco de dados, tratando as requisições devidamente para validar os dados e controlar o acesso impedindo, por exemplo, que um aluno tenha acesso a informações de outros alunos. Também são encontrados rotas para a submissão de arquivos (resoluções enviadas pelos alunos), que são salvos em um subdiretório do servidor. 

Esse servidor é desenvolvido em JavaScript e Node.js, utilizando o framework Express, que fornece um conjunto robusto de ferramentas para o desenvolvimento de APIs e servidores.

Uma rotina importante do servidor é gerenciar uma fila de correções. A correção não pode ser efetuada enquanto a requisição de submissão do aluno é feita, pois essa rotina pode levar certo tempo, possibilitando a conexão expirar e o usuário ficar sem feedback. Por conta disso, quando uma nova submissão é enviada pelo aluno, uma instrução de correção é inserida em uma fila de execuções, passada para o Corretor, e um socket é aberto para a comunicação entre o servidor e cliente.

A comunicação da API REST usada na plataforma se baseia em protocolos HTTP, desta forma, a comunicação é sempre inicializada pelo lado do cliente. Por conta disso, o servidor também expõe um servidor websocket, que se trata de uma comunicação TCP, onde dados podem ser transmitidos a qualquer momento pelo servidor ou pelo cliente.

Durante a etapa de autenticação o servidor gera um token, identificando o usuário e sua  função (aluno ou professor). Esse token é um Json Web Token, que é uma forma do servidor realizar uma assinatura digital que pode ser visualizada pelo usuário, mas não pode ser alterada. Esse token deve ser usado pelo frontend para efetuar as futuras requisições que requerem autenticação. 


### Corretor

Por conta da sensibilidade de executar um código desconhecido, submetido por um aluno, esse código não deve ser executado no mesmo container do servidor por questões de segurança. Por isso, um container é preparado contendo apenas os programas e arquivos necessários para a execução e comparação. Dessa forma, o código sempre é executado em um ambiente seguro e isolado, garantindo que a execução da resolução não terá acesso a submissões de outros alunos ou da máquina hospedeira.

Além do isolamento, rodar o código do aluno em um ambiente diferente do servidor permite usufruir de outras linguagens, pois não ficamos presos a linguagem JavaScript. Linguagens essas que podem ser mais performáticas ou abstraídas para fazer comparações entre a saída do exercício corrigido e a saída do teste, informada pelo professor. Desse modo, esse container pode ser configurado para rodar em uma máquina diferente do servidor, podendo ter especificações para a otimização do processamento ou I/O. Independente de onde esse container rode, ele irá executar em uma thread independente do servidor, não bloqueando a chegada de novas requisições.

Considerando que o sistema de correção automáticas poderá ser usado para corrigir rotinas de diferentes linguagens de programação, cada linguagem de programação deve ter seu próprio motor corretor e o programa corretor responsável por executar o código fonte e realizar o escore da atividade de acordo com a saída gerada pelo código e a saída esperada pelo teste. O motor deve estar configurado com os softwares para efetuar a compilação (se necessário) e a execução do código do aluno.

Ao iniciar esse container, parâmetros de configurações para o programa corretor devem ser informados. Nesses parâmetros são definidos qual a operação se quer fazer: 

* Executar: solicita a execução de um código com determinados parâmetros de entrada.
O programa faz uma chamada por linha de comando para a execução do código, gravando o output no diretório especificado.
Os parâmetros adicionais para a operação são:
-diretório do código;
-diretório de um arquivo descrevendo os parâmetros de entrada;
-diretório onde serão salvos as saídas.

* Comparar: solicita a comparação do arquivo de saída do aluno com a saída do teste, informada pelo professor. Um programa de escore de atividades, que trataremos como uma caixa preta nesse relatório, é responsável por atribuir uma nota de 0 até 10 de acordo com a semelhança entre os dois arquivos passados. A nota é passada ao servidor ao término da comparação através da API REST.
Os parâmetros adicionais para a operação são:

-Diretório do arquivo de saídas do aluno.
-Diretório do arquivo de saídas do teste.

Ao final de qualquer operação o programa faz uma chamada a API REST informando que a operação foi efetuada com sucesso/falha e enviando os dados referentes a operação. Com isso o servidor sabe o estado da correção e consegue dar um feedback para o aluno.


## Frontend
O fronted foi desenvolvido utilizando o framework Vuejs, uma ferramenta popular para o desenvolvimento de interfaces, componentes e páginas web responsivas, ou seja, que se adaptam em qualquer tipo de dispositivo, e com uso da biblioteca Vuetify é possível utilizar os componentes, botões e ícones do Material Design, padrão adotado por grandes empresas e desenvolvido pela Google. 

Esse container expõe uma SPA (Single Page Application) na porta 80, porta padrão para sites. Essa página tem scripts para carregar o conteúdo dinamicamente através das requisições da API, preenchendo a página com informações do aluno/professor, exercícios e entre outros dados.

Através do token de autorização, comentado na seção anterior, o frontend tem como renderizar conteúdo específico para o cargo do usuário, e se essa informação for alterada, o servidor consegue bloquear as requisições devido ao token inválido. 

O conteúdo gerado para o professor tem sessões para a administração de matérias e exercícios. Dentro da administração de exercícios é possível configurar testes públicos e privados. Os testes públicos tem os parâmetros de entrada e saída visíveis para o aluno, permitindo que ele faça testes locais com os mesmos valores. Já os testes privados são fechados para o aluno, pois ele não tem acesso aos parâmetros de entrada e de saída. Após a submissão do exercício, execução e avaliação pelo servidor, o aluno tem o feedback de todos os testes.
