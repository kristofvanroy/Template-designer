/*
* jQuery.fn._hittest();
*
* The ActionScript 2 function as jQuery function.
*
* See if [jQuery Object] hits another [jQuery Object]
* $('.element')._hittest( $('.hit') );
*
* Version 0.9.1
* www.labs.skengdon.com/_hittest
* www.labs.skengdon.com/_hittest/js/_hittest.min.js
*/
;(function($){
	$.fn._hittest = function( hit , longReturn ) {
		
		object = this;
		
		// quick exit no object-elements
		if ( !object.length ) return false;
		
		// quick exit no hit-elements
		if ( !hit.length ) return false;
		
		// if longReturn we have to return all hitting objects and its hit
		if ( longReturn ) {
			var ret = [];
			var retCount = 0;
		};
		
		for ( var i = 0; i < object.length; i++ ) {
			
			// variables to hold object('s) and hit('s) x and y
			var o = {};
			h = {};
			o.x = [];
			o.y = [];
			h.x = []; 
			h.y = [];
			
			// setting object x  
			o.x[0] = $( object.get(i) ).offset().left;
			o.x[1] = o.x[0] + $( object.get(i) ).width();
			
			// setting object y
			o.y[0] = $( object.get(i) ).offset().top;
			o.y[1] = o.y[0] + $( object.get(i) ).height();
			
			for ( var y = 0; y < hit.length; y++ ) {
				// running throw hit('s) to check IF hit
				
				// setting hit x  
				h.x[0] = $( hit.get(y) ).offset().left;
				h.x[1] = h.x[0] + $( hit.get(y) ).width();
				
				// setting hit y
				h.y[0] = $( hit.get(y) ).offset().top;
				h.y[1] = h.y[0] + $( hit.get(y) ).height();
				
				/*
				
				x0,y0
					__________
					|        |
					|        |
					|        |
					__________
								x1,y1
				
				*/
				
				if ( object.get(i) != hit.get(y) ) {
					// if hit isn't the same object at hit
					if ( (_hittest_between( h.x[0] , o.x[0] , o.x[1] ))  && (_hittest_between( h.y[0] , o.y[0] , o.y[1] )) ) {
						// h.x0 if between o.x0 and o.x1  and   h.y0 if between o.y0 and o.y1   ergo hit
						if ( longReturn ) {
							ret[retCount] = {};
							ret[retCount].o = object.get(i);
							ret[retCount].h = hit.get(y);
							retCount++;
						} else {
							return true;
						}
					};
					
					if ( (_hittest_between( h.x[0] , o.x[0] , o.x[1] ))  && (_hittest_between( h.y[1] , o.y[0] , o.y[1] )) )  {
						// h.x0 if between o.x0 and o.x1  and   h.y1 if between o.y0 and o.y1   ergo hit
						if ( longReturn ) {
							ret[retCount] = {};
							ret[retCount].o = object.get(i);
							ret[retCount].h = hit.get(y);
							retCount++;
						} else {
							return true;
						}
					};
					
					if ( (_hittest_between( h.x[1] , o.x[0] , o.x[1] ))  && (_hittest_between( h.y[0] , o.y[0] , o.y[1] )) ) {
						// h.x1 if between o.x0 and o.x1  and   h.y0 if between o.y0 and o.y1   ergo hit
						if ( longReturn ) {
							ret[retCount] = {};
							ret[retCount].o = object.get(i);
							ret[retCount].h = hit.get(y);
							retCount++;
						} else {
							return true;
						}
					};
					
					if ( (_hittest_between( h.x[1] , o.x[0] , o.x[1] ))  && (_hittest_between( h.y[1] , o.y[0] , o.y[1] )) )  {
						// h.x1 if between o.x0 and o.x1  and   h.y0 if between o.y1 and o.y1   ergo hit
						if ( longReturn ) {
							ret[retCount] = {};
							ret[retCount].o = object.get(i);
							ret[retCount].h = hit.get(y);
							retCount++;
						} else {
							return true;
						}
					};
				}
			}
			
		};
		
		if ( ( longReturn ) && ( ret.length > 0 ) ) {
			// if longReturn and something is to return
			return ret;
		} else {
			// if no hit return false;
			return false;
		}
	};
	
	_hittest_between = function( n , b1 , b2 ) {
		
		/*
			n = number
			b1 = between 1
			b2 = between 2
		*/
		
		// n not a number
		if ( typeof n !== 'number' ) return false;
		
		// b1 not a number
		if ( typeof b1 !== 'number' ) return false;
		
		// b2 not a number
		if ( typeof b2 !== 'number' ) return false;
		
		// if n is between b1 and b2
		if ( (b1 <= n) && (b2 >= n) ) return true;
		
		return false;
	};
})(jQuery);