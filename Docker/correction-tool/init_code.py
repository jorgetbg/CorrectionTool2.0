import meta_language as ml
import os
import json
import sys


"""
change datalist
convert:
    1|2     5|6
    3|4     7|8
to: [1,5,2,6,3,7,4,8]
"""
def data_list(*urls):
    lst = []
    for u in urls:
        data = ml.csv_load(u)
        tmp = []
        for line in data:
            tmp += line
        lst.append(tmp)
    lst = list(zip(*lst))
    new_lst = []
    for i in lst:
        for j in i:
            new_lst.append(j)
    return new_lst

# how works octave -------------------------------------------------------------

# creating a language
x = ml.add_language("octave","m")

# executing an octave function using inputs
def octave_execute(url_func,*url_input):
    # input file generate
    def generate_code():
        x = "octave-cli --no-gui -Hfq "
        x += "./opt/corretor/Octave/octave_meta_script.m << EOF\n"
        for i in inp:
            x += str(i) + "\n"
        x += "EOF"
        return x
    # preparing inputs
    inp = data_list(*url_input)
    inp = ['"'+url_func.path+'"' , '"'+url_func.name+'"','"|"','"\\n"'] + inp
    inp += ['"__End__Of__File__"']
    code = generate_code()
    code = os.popen(code).read()
    return code

# format output
def octave_process(txt):
    return txt.split("__split__file__two__parts__\n")[1]
    
# "exporting" funcions
x.execute = octave_execute
x.pos_process = octave_process

# ------------------------------------------------------------------------------
#  starting process

ml.init()
