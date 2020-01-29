% A funcao bissecao.m  utiliza o metodo da bissecao para encontar
% uma raiz real de uma funcao f continua no intervalo [a,b]
% satisfazendo f(a)*f(b) < 0
% Entrada:
           % Ax = b %
%         a: Matriz A QUADRADA
%         b: vetor das respostas
% Saida:
%         sol : Matriz triangular superior
  

function sol = eliminaGauss(a,b)
%Obtemos a o tamanho da matriz A
  Dimensao = size(a);
  n = Dimensao(1,1);
  
%Precisamos montar a matriz A extendida
%sol(k, :) = [k, x0, f(x0)];
  A = a;
  for k=1:1:n
    A(k, n+1) = b'(k);
  endfor
  
  %Começamos a triangulaziração
  for k=1:n-1
    for i = k+1:n
      A = pivoteamentoParcial(A, n, i);
      m = A(i, k) / A(k,k); %m21 = a21/pivot
      A(i,k) = 0;
      for j = k + 1: n + 1
        A(i,j) = A(i,j) - m * A(k,j);
        %A(j, k) = A(j,k) - m * A(i,k)
      endfor
    endfor
  endfor
  sol = A;
  
  for k = n: -1: 1
  soma = 0;
  for j = k + 1:n
    soma = soma + A(k,j)*x(j);
  endfor
  x(k) = (A(k,n+1) - soma)/A(k,k)
  
endfor
  
end




