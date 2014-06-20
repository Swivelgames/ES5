
/*---------------------------------------- ECMAScript 5 Polyfills --------------------------------------*/
/** Most Polyfills Provided by MDN's "Compatibility" Section On Many JavaSript Spec Pages **/
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript} **/

try {
	[1].indexOf(1);
} catch(e) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	}
}

try {
	[].filter([1,2],function(a){return a;});
} catch(e) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}

// John Resig Polyfill for getPrototypeOf
// @see {@link http://ejohn.org/blog/objectgetprototypeof/}
try {
	Object.getPrototypeOf({});
} catch(e) {
	if ( typeof "test".__proto__ === "object" ) {
		Object.getPrototypeOf = function(object){
			return object.__proto__;
		};
	} else {
		Object.getPrototypeOf = function(object){
			if(object.constructor===Array) {
				var proto = {},
					names = ["concat","constructor","join","length","pop","push","reverse","shift","slice","sort","splice","toLocaleString","toString","unshift"];
				for(var x in names) if(names.hasOwnProperty(x)) proto[names[x]] = Array.prototype[names[x]];
			}
			// May break if the constructor has been tampered with
			return object.constructor.prototype;
		};
	}
}

try {
	Object.defineProperty({}, 'x', {});
} catch(e) {
	Object.defineProperty = function(o, p, d) {
		"use strict";
		if (!o instanceof Object) {
			throw new TypeError('Object.defineProperty called on non-object');
		}
		if (!d instanceof Object) {
			throw new TypeError('Argument `description` must be an object: '+d);
		}
		if (!p instanceof String) {
			throw new TypeError('Argument `property` must be a string: '+p);
		}

		// Due to frequency of use, this console message has been silenced
		// consoleWarn('Object.defineProperty implementation does not fully support descriptor parameter.');

		if(d.hasOwnProperty('value')) {
			o[p] = d.value;
		} else {
			o[p] = undefined;
		}

		return o;
	}
}

try{
	Object.defineProperties({},{'foo':{value:'bar'}});
} catch(e) {
	Object.defineProperties = function(o, props) {
		"use strict";
		if (!o instanceof Object) {
			throw new TypeError('Object.defineProperties called on non-object');
		}
		if (!props instanceof Object) {
			throw new TypeError('Property properties must be an object: '+props);
		}

		for (var x in props) {
			if (props.hasOwnProperty(x)) {
				o = Object.defineProperty(o,x,props[x]);
			}
		}

		return o;
	}
}

try {
	Object.create({}, Object.prototype);
} catch(e) {
	Object.create = function (o, p) {
		"use strict";
		if (arguments.length > 2) {
			throw new Error('Object.create implementation only accepts two parameters.');
		}

		function F() {}
		F.prototype = o;

		if (p) {
			var ret = new F();
			Object.defineProperties(ret,p);
			return ret;
		} else {
			return new F();
		}
	};
}

try{
	Object.keys({'foo':'bar'});
} catch(e) {
	Object.keys = function(obj){
		var arr = [];
		for (var k in obj) if(obj.hasOwnProperty(k)) arr.push(k);
		return arr;
	};
}

try {
	Object.getOwnPropertyNames({'foo':'bar'});
} catch(e) {
	Object.getOwnPropertyNames = function(){
		return Object.keys.apply(Object,arguments);
	};
}

try {
	Object.getOwnPropertyDescriptor({'x':true}, 'x');
} catch(e) {
	Object.getOwnPropertyDescriptor = function(obj, key){
		return {
			"value": obj[key]
		};
	}
}

try{
	" foo ".trim();
} catch(e) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	};
}

//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill
 
	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}
 
	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{		//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		docHijack('querySelectorAll');
		docHijack('querySelector');
		addListen(doc.all);	
	}
})(window, document);
