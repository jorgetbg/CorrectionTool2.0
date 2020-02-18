0; % define file as script

% definition of file format ---------------------------------------------------- 

% PATH
% FUNCTION NAME
% _column_tag_
% _line_tag_
% INPUT ...
% __End__Of__File__

% function definition ----------------------------------------------------------

% print an error
function err (st)
        printf("\"%s\"",st);
	exit(0);
endfunction

function [c,d,e] = teste(a,b)
    c = a - b ;
    d = 9 ;
    e = "teste";
endfunction

% get a input from stdin
function [__input__] = get_input
    try
        __input__ = input("");
    catch
        err("invalid input");
    end_try_catch
endfunction

% try compare two strings
function [__cmp__] = compare(__input__,st)
    try
        __cmp__ = strcmp(__input__,st);
    catch
        __cmp__ = 0 ;
    end_try_catch
endfunction

% META generate a var name
function [__vn__] = var_name(prefix,num)
    __vn__ = strcat("__",prefix,"_",mat2str(num),"__");
endfunction

% META generate var list
function [__list__] = var_list(first_op,prefix,qt,end_op)
    __list__ = "";
    for __cont__ = 1 : qt;
        __list__ = strcat(__list__,",",var_name(prefix,__cont__));
    endfor
    __list__(1) = first_op;
    __list__ = strcat(__list__,end_op);
endfunction

% Script of execution ----------------------------------------------------------

% changing to algorithm's path
__path__ = get_input();
try
    eval(["cd ",__path__]);
catch
    err("invalid algoritm path");
end_try_catch

% get function name
__func__ = get_input();

% get tags (CSV)
__tag_column__ = get_input();
__tag_line__ = get_input();


% get qt args
try
    __arg__ = [nargin(__func__),nargout(__func__)];
catch
    err("invalid function");
end_try_catch

% Meta Script ------------------------------------------------------------------
__inp_list__ = var_list('(',"inp",__arg__(1),");");
__out_list__ = var_list('[',"out",__arg__(2),"] = ");
__executef__ = strcat(__out_list__,__func__,__inp_list__);

% Meta read input --------------------------------------------------------------
__count__ = 0 ;
__csv__ = "" ;
while(1)

    % get var
    __var__ = var_name("inp",__count__ + 1);
    eval([__var__,"= get_input();"]);
    
    % is end of file ?
    if(compare(eval(__var__),"__End__Of__File__"))
        break ;
    endif
    
    % next var ( or the first var )
    __count__ = mod(__count__ + 1, __arg__(1) ) ;
    
    % execute function when variables are ready
    if (__count__ == 0)
    
        % execute function
        try
            eval(__executef__);
        catch
           __csv__ = strcat(__csv__,"Can't execute function",__tag_line__);
            continue;
        end_try_catch
        
        % creating csv line
        __out__ = "";
        for __count2__ = 1 : __arg__(2)
            tmp = eval(var_name("out",__count2__));
            
            % is number
            try 
                tmp = mat2str(tmp);
            catch
            % is String
                tmp = strcat('"',tmp,'"');
            end_try_catch
            
            % separe csv data
            if __count2__ == __arg__(2)
                __out__ = strcat(__out__,tmp,__tag_line__);
            else
                __out__ = strcat(__out__,tmp,__tag_column__);
            endif
        endfor
        
        % add new line to csv
        __csv__ = strcat(__csv__,__out__);
    endif
endwhile

% ending execution
printf("\n__split__file__two__parts__\n");
printf("%s",__csv__);

