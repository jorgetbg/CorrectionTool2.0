# correction-tool

Arquivo csv alterado para formato "comum";
  * Cada linha do csv é referente a um caso teste
  * Cada coluna é referente a uma entrada do teste
 
Exemplo de entrada.CSV:
  * 1,2,3
  * ones(3),5
  
Funcionamento da entrada.csv:

 * 1,2,3 --------> teste 1 equivale a funcao(1,2,3);
* ones(3),5  --> teste 2 equivale a funcao(ones(3),5);

A execução de cada linha (teste), implicará em uma nova linha de um arquivo saida.csv
