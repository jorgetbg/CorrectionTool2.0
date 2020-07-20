0;
global a={};
global b={};


# adiciona uma novo teste a ser comparado
function a = add_input_cmp(a,varargin)
  a(length(a)+1)={varargin};
endfunction

#inclui linhas na lista de saidas
function val = incluir_linhas(val,num)
  l = length(val);
  num -= l ;
  for i = l + 1 : l + num ;
    val(i) = {{}};
  endfor
endfunction

#inclui colunas na lista de saidas
function val = incluir_colunas(val,num)
  l = length(val);
  num -= l ;
  for i = l + 1 : l + num ;
    val(i) = {0};
  endfor
endfunction

# equilibra a quantidade de linhas das saidas
function eq_linhas()
  global a;
  global b;
  x = max([length(a),length(b)]) ;
  a = incluir_linhas(a,x);
  b = incluir_linhas(b,x);
endfunction

# equilibra a quantidade de colunas
# necessita de que linhas estejam equilibradas
function eq_colunas()
  global a;
  global b;
  for i = 1 : length(a)
    x = max([length(a{i}),length(b{i})]);
    a{i} = incluir_colunas(a{i},x);
    b{i} = incluir_colunas(b{i},x);
  endfor
endfunction

# calculo parcial da distancia entre duas matrizes
# de mesma ordem
function k = p_distancia(m1,m2)
  k = m1 - m2 ;
  x = size(k);
  x = x(1)*x(2);
  k = reshape(k,[1,x]);
  k *= k' ;   
endfunction

# converte escalar para matriz unitaria
function v = scalar2mat(var)
  v = [var] ;
endfunction

# converte string para matriz
function v = string2mat(var)
  v = var - var + var ;
endfunction

# mantem a matriz
function v = matrix2mat(var)
  v = var ;
endfunction

# converte algo para matriz
function v = conv2mat(var)
  v = eval([typeinfo(var),"2mat(var);"]);
endfunction

# prepara entradas para a comparação
function [x,y] = resize_var(x,y)
  x = conv2mat(x);
  y = conv2mat(y);
  a = max(size(x),size(y));
  x = resize(x,a);
  y = resize(y,a);
endfunction

# executa retorna número real da distancia entre
# o conjunto de testes
function r = calcular()
  global a;
  global b;
  r = 0 ;
  eq_linhas();
  eq_colunas();
  for i = 1 : length(a)
    for j = 1 : length(a{i})
      [x,y] = resize_var(a{i}{j},b{i}{j});
      r+=p_distancia(x,y);
    endfor
  endfor
  r = r^0.5;
  printf("%s",mat2str(r));
endfunction
