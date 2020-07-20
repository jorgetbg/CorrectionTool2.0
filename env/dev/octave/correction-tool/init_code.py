import json as js
import subprocess as sp
import requests

meu_local = "/opt/corretor/"

def lerLinhas(arquivo):
	return open(arquivo,"r").readlines()

def nomeArquivo(arquivo):
	return arquivo.split("/")[-1]
	
def pastaArquivo(arquivo):
	return arquivo.replace(nomeArquivo(arquivo),"")

def formatoArquivo(arquivo):
	return nomeArquivo(arquivo).split(".")[-1]

def nomeFuncao(arquivo):
	return nomeArquivo(arquivo).replace("."+formatoArquivo(arquivo),"")

def execute(codigo,tempo=15):
	process = sp.Popen(codigo,stdin=sp.PIPE,stdout=sp.PIPE,shell=True)
	stdout , stderr = process.communicate(timeout=tempo)
	try: result = stdout.decode()
	except: result = "0"
	return result
	
def octave(codigo):
	codigo = "warning off;"+codigo
	arquivo = f'{meu_local}metascript.m'
	escreverArquivo(arquivo,[codigo])
	codigo = f' octave-cli --no-gui -W -H -q {arquivo} ;'
	codigo += f' rm -f {arquivo} ;'
	return codigo

def nargout(arquivo):
	codigo = f'n=0; try ; n=nargout("{nomeFuncao(arquivo)}");'
	codigo += 'printf("%i",n); catch ; printf("0"); end_try_catch;'
	codigo = octave(codigo)
	codigo = f'cd {pastaArquivo(arquivo)} ;' + codigo ;
	try: return int(execute(codigo))
	except : return 0

def listaSaidas(numero):
	lista = ""
	for i in range(numero):
		if lista : lista+=","
		lista += "saida"+str(i)  
	return lista

def metaChamada(alg,entradas):
	saidas = listaSaidas(nargout(alg))
	if not saidas : return []
	chamadas = []
	for entrada in lerLinhas(entradas):
		entrada = entrada.replace("\n","")
		cod = f'run("{meu_local}printLine.m");try;'
		cod += f'[{saidas}]={nomeFuncao(alg)}({entrada});'
		cod += 'printf("CORTE O ARQUIVO AQUI");'
		cod += f'printLine({saidas});catch;'
		cod += ' printf("CORTE O ARQUIVO AQUI0");end_try_catch;'
		chamadas.append(cod)
	return chamadas

def metaCompare(csv1,csv2):
	cod = lambda x,y : f'{x} = add_input_cmp({x},{y});'
	processo = lambda x : [y.replace("\n","") for y in x]
	csv1 , csv2 = processo(lerLinhas(csv1)) , processo(lerLinhas(csv2))
	csv1 , csv2 = [cod("a",x) for x in csv1],[cod("b",x) for x in csv2]
	comparacao = f'run("{meu_local}compare.m");'
	for x,y in zip(csv1,csv2): comparacao += x + y
	return comparacao + "calcular();"
	
def filtro(saida):
	return saida.split("CORTE O ARQUIVO AQUI")[-1]

def escreverArquivo(arquivo,valores):
	with open(arquivo,"w") as arquivo:
		for saida in valores:
			arquivo.write(saida+"\n")

def realizarTeste(funcao,entrada,saida):
	def processo(codigo):
		try:
			codigo = octave(codigo)
			codigo = f'cd "{pastaArquivo(funcao)}";{codigo}'
			return filtro(execute(codigo))
		except: return "0"
		
	cod = metaChamada(funcao,entrada)
	if not cod : return "FAIL","função incorreta ou não possui saídas"
	resultado = [ processo(meta) for meta in cod ]
	escreverArquivo(saida,resultado)
	return "SUCCESS", saida

def realizarComparacao(csv1,csv2):
	codigo = metaCompare(csv1,csv2)
	try: return "SUCCESS",execute(octave(codigo),60)
	except: return "FAIL", "erro ao realizar comparação"

def arquivoExiste(arquivo):
	try: open(arquivo,"r")			
	except: return False
	return True

def jsonValido(string):
	info = {"executar":3,"comparar":2}
	try : json = js.loads(string)
	except : return False , "json mal formado"
	try : json["operacao"] in info
	except : return False , "operacao inválida"
	try : json["id"]
	except : return False ,"id nao encontrado"
	try : json["parametros"]
	except : return False , "parametros não encontrados"
	if len(json["parametros"]) == info [json["operacao"]] :
		return True , json
	else: return False , "parametros não correspondentes"

def entradaValida(entrada):
	valido,entrada = jsonValido(entrada)
	if not valido : return valido,entrada,entrada
	valido = arquivoExiste(entrada["parametros"][0])
	if not valido : return valido , "Primeiro parametro não existe",entrada
	valido = arquivoExiste(entrada["parametros"][1])
	if not valido : return valido , "Segundo parametro não existe",entrada
	return True , entrada,0


global_funcoes = {
	"executar" : realizarTeste , 
	"comparar" : realizarComparacao
}

def resposta(jsn,status,out):
	try: myid = jsn["id"]
	except: myid = -1
	try: tipo = jsn["operacao"]
	except: tipo="?"
	ret = {"id":myid,"status":status,"output":out,"tipo":tipo}
	requests.post("http://host.docker.internal:8092/docker", json = ret )
	print(ret)

def start():
	import sys
	print("Iniciando...")
	argumentos = sys.argv
	print(argumentos)
	argumentos.pop(0)
	for entrada in argumentos:
		print(entrada)
		valida,ret,ent = entradaValida(entrada)
		if not valida : 
			resposta(ent,valida,ret)
			continue
		entrada = ret
		valida,ret = global_funcoes[entrada["operacao"]](*entrada["parametros"])
		resposta(entrada,valida,ret)
		
start()

