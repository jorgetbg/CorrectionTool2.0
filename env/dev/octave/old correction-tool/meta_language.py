import json
import sys
import requests

# tags to define how to split
# l = lines, c = columns
split_tag_l = "\n"
split_tag_c = "|"

# how to load a csv file
# url_obj --> lists of inputs
def csv_load(url):
	path = url.url
	try:
		with open(path,"r") as file:
			x = file.read().split(split_tag_l)
			x = list(map(lambda a:a.split(split_tag_c),x))
	except: return [[]]
	try:
		while(x[-1]==['']): x.pop(-1);
	except:return [[]]
	return x

# get "metadata" from url
class Url:
	# spliting url
	def __init__(self,path):
		self.file = path.split("/")[-1]
		self.ext = self.file.split(".")[-1]
		self.name = self.file.split("."+self.ext)[0]
		self.path = path.split(self.file)[0]
		self.url = path

	# convert to array
	def toArray(self):
		return [self.name,self.ext, self.file ,
				self.path,self.url]

# create a new suported language object
class Language:

	def __init__(self,name,ext):

		# basic informations
		self.name = name
		self.ext = ext
		self.badwrd = []

		# how to execute
		# receive url(func) and url(inp)
		# return a string
		self.execute = None

		# how to process the result
		# receive a string
		# return a string
		self.pos_process = None

		# validate a csv input
		self.validate = None

	# add to list of bad words
	def bad_word(self,*wrd):
            for w in wrd:
                if not w in self.badwrd :
                    self.badwrd.append(w)

	# try to run a code and process the result
	def execute_language(self,func,*inp):
            try: x = self.execute(func,*inp)
            except: return "__Error__ : Language error to execute"
            try: x = self.pos_process(x)
            except: return "__Error__ : Language error to process"
            return x

	# compare result using this language
	def compare_result(self,csv1,csv2):
		pass

# list of languages added
langs = {}

# add a language to list
def add_language(name,ext):
    if not name in langs:
        x = Language(name,ext)
        langs[ext] = x
        return x
    return None


def starting(jstr):
    jstr = json.loads(jstr)
    try : alg = Url(jstr["algorithm"])
    except: return "__Error__ : JSON 'algorithm' not find"
    try : inputs = [Url(i) for i in jstr["inputs"]]
    except: return "__Error__ : JSON 'inputs' not find"
    try : output = Url(jstr["output"])
    except: return "__Error__ : JSON 'output' not find"
    try: lang = langs[alg.ext]
    except: return "__Error__ : Language not find"
    ret = lang.execute_language(alg,*inputs)
    if not "__Error__ :" in ret:
         out = open(output.url,"w")
         out.write(ret)
         out.close()
         return "done"
    return ret

def json_from_file(jfile):
    try : jfile = open(jfile,"r")
    except: return "__Error__ : file.json not find"

    try:
        ret = starting(jfile.read())
        jfile.close()
    except: ret = "__Error__ : file.json contain errors"
    
    return ret

def init():
    args = sys.argv
    args.pop(0)
    for path in sys.argv:
        ret = json_from_file(path)
        #print(ret)
        myobj = '{"content-type":"json"}'
        if "__Error__" in ret :
            request_data = {"status": "error","message": ret}
            a=requests.post(url="http://host.docker.internal:8092/docker",data=request_data)
        else:
            request_data = {"status": "success","message": ret, "data": path}
            a=requests.post("http://host.docker.internal:8092/docker", json=request_data)
            #a=requests.post(url="http://host.docker.internal:8092/docker",data=jsn)
        print(request_data)
        print(a)
