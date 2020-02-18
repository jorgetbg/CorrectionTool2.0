function [x2,x1] = quad_1(a,b,c)
	u = power( b*b / 4 - c ,0.5);
	x1 = -b / 2 - u ;
	x2 = -b / 2 + u ;
endfunction
