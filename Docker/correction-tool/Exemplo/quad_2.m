function [x1,x2] = quad_2(a,b,c)
	d = b * b - 4 * a * c ;
	d = power(d,0.5);
	x1 = (-b + d ) / (2 * a ) ;
	x2 = (-b - d ) / (2 * a ) ;
endfunction
