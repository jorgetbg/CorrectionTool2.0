__my_cont__ = 0;

function x = matrix2str(m)
	x = mat2str(m);
endfunction

function x = scalar2str(s)
	x = matrix2str(s);
endfunction

function x = string2str(s)
	x = ['"',s,'"'] ;
endfunction

function show( my_var )
	global __my_cont__;
	if __my_cont__ 
		printf(",");
    endif
  	if isinf(my_var)
    	if my_var < 0
      		printf("%i",intmin());
    	else
       		printf("%i",intmax());
    	endif
    	__my_cont__ = 1 ;
    	return;
  	endif
  	if(isnan(my_var))
    	printf("\"notNumber\"");
    	__my_cont__ = 1 ;
    	return
  	endif
  	x = eval([typeinfo(my_var),"2str(my_var);"]);
	printf("%s",x);
	__my_cont__ = 1 ;
endfunction

function printLine(varargin)
	for i = 1 : length(varargin)
		show(varargin{i})
	endfor
endfunction
