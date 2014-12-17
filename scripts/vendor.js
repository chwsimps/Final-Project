/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*! FlipClock 2014-10-07 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return b instanceof Object&&b instanceof Date==!1&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-10-06",version:"0.7.2",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({autoStart:!0,dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){this.autoStart&&this.start()},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"],g=a(f.join(""));return this.dividers.push(g),g},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0,{minimumDigits:this.factory.minimumDigits}),this.flip(this.factory.original,!1)},appendDigitToClock:function(a){a.$el.append(!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});this.appendDigitToClock(b)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",minimumDigits:0,original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:this.minimumDigits,animationRate:this.animationRate}),this.timer=new FlipClock.Timer(this,d),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face",e=!1;return a=a.ucfirst()+d,this.face.stop&&(this.stop(),e=!0),this.$el.html(""),this.time.minimumDigits=this.minimumDigits,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),this.face=c,e&&this.start(),this.face},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage],this.lang=b},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$obj=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){"object"!=typeof c&&(c={}),c.minimumDigits||(c.minimumDigits=a.minimumDigits),this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject());var c=[a.getHours(),a.getMinutes()];return b===!0&&c.push(a.getSeconds()),this.digitize(c)},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(a){return a||(a=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-a.getTime()/1e3,0):a.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject()),console.log(a);var c=a.getHours(),d=[c>12?c-12:0===c?12:c,a.getMinutes()];return b===!0&&d.push(a.getSeconds()),this.digitize(d)},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getWeeks:function(){var a=this.getTimeSeconds()/60/60/24/7;return mod&&(a%=52),Math.floor(a)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+a):this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-a):this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");this.factory.time.time||(this.factory.original=new Date,this.factory.time=new FlipClock.Time(this.factory,this.factory.original));var b=b?b:this.factory.time.getMilitaryTime(!1,this.showSeconds);b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.createDivider(),this.createDivider(),a(this.dividers[0]).insertBefore(this.lists[this.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.lists[this.lists.length-4].$el),this.base()},flip:function(a,b){this.autoIncrement(),a=a?a:this.factory.time.getMilitaryTime(!1,this.showSeconds),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({shouldAutoIncrement:!1,constructor:function(a,b){"object"!=typeof b&&(b={}),a.autoStart=b.autoStart?!0:!1,b.autoStart&&(this.shouldAutoIncrement=!0),a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=this.factory.getTime().digitize([this.factory.getTime().time]);d.length>c.length&&a.each(d,function(a,c){var d=b.createList(c);d.select(c)}),a.each(this.lists,function(a,b){b.play()}),this.base()},flip:function(a,b){this.shouldAutoIncrement&&this.autoIncrement(),a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul"),e=0;b=b?b:this.factory.time.getDayCounter(this.showSeconds),b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el):e=2,a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4+e].$el),a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length-6+e].$el),a(this.createDivider("Days",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul");c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){d.createList(b)}),a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)},appendDigitToClock:function(a){this.base(a),this.dividers[0].insertAfter(this.dividers[0].next())}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(){var b=this.factory.time.getTime(!1,this.showSeconds);this.base(b),this.meridiumText=this.getMeridium(),this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.lists[this.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this.getMeridium()&&(this.meridiumText=this.getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(!1,this.showSeconds),b)},getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},isPM:function(){return"PM"==this.getMeridium()?!0:!1},isAM:function(){return"AM"==this.getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery);
if(!AmCharts)var AmCharts={themes:{},maps:{},inheriting:{},charts:[],onReadyArray:[],useUTC:!1,updateRate:40,uid:0,lang:{},translations:{},mapTranslations:{},windows:{},initHandlers:[]};
AmCharts.Class=function(a){var b=function(){arguments[0]!==AmCharts.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(AmCharts.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,
a,b);this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events)for(a=a.events[b],b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],g=0,h=c.length;g<h;g++){var k=c[g];k.handler.call(k.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};AmCharts.addChart=function(a){AmCharts.charts.push(a)};AmCharts.removeChart=function(a){for(var b=AmCharts.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)};
AmCharts.isModern=!0;AmCharts.getIEVersion=function(){var a=0;if("Microsoft Internet Explorer"==navigator.appName){var b=navigator.userAgent,c=/MSIE ([0-9]{1,}[.0-9]{0,})/;null!=c.exec(b)&&(a=parseFloat(RegExp.$1))}else"Netscape"==navigator.appName&&(b=navigator.userAgent,c=/Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/,null!=c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};
AmCharts.applyLang=function(a,b){var c=AmCharts.translations;b.dayNames=AmCharts.dayNames;b.shortDayNames=AmCharts.shortDayNames;b.monthNames=AmCharts.monthNames;b.shortMonthNames=AmCharts.shortMonthNames;c&&(c=c[a])&&(AmCharts.lang=c,c.monthNames&&(b.dayNames=c.dayNames,b.shortDayNames=c.shortDayNames,b.monthNames=c.monthNames,b.shortMonthNames=c.shortMonthNames))};AmCharts.IEversion=AmCharts.getIEVersion();9>AmCharts.IEversion&&0<AmCharts.IEversion&&(AmCharts.isModern=!1,AmCharts.isIE=!0);
AmCharts.dx=0;AmCharts.dy=0;if(document.addEventListener||window.opera)AmCharts.isNN=!0,AmCharts.isIE=!1,AmCharts.dx=.5,AmCharts.dy=.5;document.attachEvent&&(AmCharts.isNN=!1,AmCharts.isIE=!0,AmCharts.isModern||(AmCharts.dx=0,AmCharts.dy=0));window.chrome&&(AmCharts.chrome=!0);AmCharts.handleResize=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&c.div&&c.handleResize()}};AmCharts.handleMouseUp=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleReleaseOutside(a)}};
AmCharts.handleMouseMove=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];d&&d.handleMouseMove(a)}};AmCharts.handleWheel=function(a){for(var b=AmCharts.charts,c=0;c<b.length;c++){var d=b[c];if(d&&d.mouseIsOver){d.mouseWheelScrollEnabled||d.mouseWheelZoomEnabled?d.handleWheel(a):a.stopPropagation&&a.stopPropagation();break}}};AmCharts.resetMouseOver=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};AmCharts.ready=function(a){AmCharts.onReadyArray.push(a)};
AmCharts.handleLoad=function(){AmCharts.isReady=!0;for(var a=AmCharts.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(AmCharts.processDelay)?c():setTimeout(c,AmCharts.processDelay*b)}};AmCharts.addInitHandler=function(a,b){AmCharts.initHandlers.push({method:a,types:b})};AmCharts.callInitHandler=function(a){var b=AmCharts.initHandlers;if(AmCharts.initHandlers)for(var c=0;c<b.length;c++){var d=b[c];d.types?-1!=d.types.indexOf(a.type)&&d.method(a):d.method(a)}};
AmCharts.getUniqueId=function(){AmCharts.uid++;return"AmChartsEl-"+AmCharts.uid};AmCharts.isNN&&(document.addEventListener("mousemove",AmCharts.handleMouseMove,!0),window.addEventListener("resize",AmCharts.handleResize,!0),document.addEventListener("mouseup",AmCharts.handleMouseUp,!0),window.addEventListener("load",AmCharts.handleLoad,!0),window.addEventListener("DOMMouseScroll",AmCharts.handleWheel,!0),document.addEventListener("mousewheel",AmCharts.handleWheel,!0));
AmCharts.isIE&&(document.attachEvent("onmousemove",AmCharts.handleMouseMove),window.attachEvent("onresize",AmCharts.handleResize),document.attachEvent("onmouseup",AmCharts.handleMouseUp),window.attachEvent("onload",AmCharts.handleLoad));
AmCharts.clear=function(){var a=AmCharts.charts;if(a)for(var b=0;b<a.length;b++)a[b].clear();AmCharts.charts=null;AmCharts.isNN&&(document.removeEventListener("mousemove",AmCharts.handleMouseMove,!0),window.removeEventListener("resize",AmCharts.handleResize,!0),document.removeEventListener("mouseup",AmCharts.handleMouseUp,!0),window.removeEventListener("load",AmCharts.handleLoad,!0),window.removeEventListener("DOMMouseScroll",AmCharts.handleWheel,!0),document.removeEventListener("mousewheel",AmCharts.handleWheel,
!0));AmCharts.isIE&&(document.detachEvent("onmousemove",AmCharts.handleMouseMove),window.detachEvent("onresize",AmCharts.handleResize),document.detachEvent("onmouseup",AmCharts.handleMouseUp),window.detachEvent("onload",AmCharts.handleLoad))};
AmCharts.makeChart=function(a,b,c){var d=b.type,e=b.theme;AmCharts.isString(e)&&(e=AmCharts.themes[e],b.theme=e);var f;switch(d){case "serial":f=new AmCharts.AmSerialChart(e);break;case "xy":f=new AmCharts.AmXYChart(e);break;case "pie":f=new AmCharts.AmPieChart(e);break;case "radar":f=new AmCharts.AmRadarChart(e);break;case "gauge":f=new AmCharts.AmAngularGauge(e);break;case "funnel":f=new AmCharts.AmFunnelChart(e);break;case "map":f=new AmCharts.AmMap(e);break;case "stock":f=new AmCharts.AmStockChart(e)}AmCharts.extend(f,
b);AmCharts.isReady?isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c):AmCharts.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){AmCharts.realWrite(f,a)},c)});return f};AmCharts.realWrite=function(a,b){a.write(b)};AmCharts.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};AmCharts.removeFromArray=function(a,b){var c;if(void 0!=b&&void 0!=a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};AmCharts.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};
AmCharts.wrappedText=function(a,b,c,d,e,f,g,h,k){var l=AmCharts.text(a,b,c,d,e,f,g),m="\n";AmCharts.isModern||(m="<br>");if(10<k)return l;if(l){var n=l.getBBox();if(n.width>h){n=Math.ceil(n.width/h);l.remove();for(var l=[],p=0;-1<(index=b.indexOf(" ",p));)l.push(index),p=index+1;Math.round(b.length/2);for(var q,p=0;p<l.length;p+=Math.ceil(l.length/n))q=l[p],b=b.substr(0,q)+m+b.substr(q+1);if(isNaN(q)){if(0==k)for(p=1;p<n;p++)q=Math.round(b.length/n*p),b=b.substr(0,q)+m+b.substr(q);return AmCharts.text(a,
b,c,d,e,f,g)}return AmCharts.wrappedText(a,b,c,d,e,f,g,h,k+1)}return l}};AmCharts.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};AmCharts.removePx=function(a){if(void 0!=a)return Number(a.substring(0,a.length-2))};
AmCharts.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=AmCharts.windows[b])?c.opener&&!c.opener.closed?c.location.href=a:AmCharts.windows[b]=window.open(a):AmCharts.windows[b]=window.open(a)}else window.location.href=a};AmCharts.ifArray=function(a){return a&&0<a.length?!0:!1};
AmCharts.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var d=b[c];if(d){if(d[a])d[a]();var e=d.length;if(0<e){var f;for(f=0;f<e;f++){var g=d[f];if(g&&g[a])g[a]()}}}}};AmCharts.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};
AmCharts.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};AmCharts.toCoordinate=function(a,b,c){var d;void 0!==a&&(a=String(a),c&&c<b&&(b=c),d=Number(a),-1!=a.indexOf("!")&&(d=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(d=b*Number(a.substr(0,a.length-1))/100));return d};
AmCharts.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};AmCharts.isDefined=function(a){return void 0===a?!1:!0};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};AmCharts.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};AmCharts.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var d=c.length;if(d<b){var e;for(e=0;e<b-d;e++)c="0"+c}d=c.substring(0,c.length-b);""===d&&(d=0);return d+"."+c.substring(c.length-b,c.length)}return String(c)};
AmCharts.formatDuration=function(a,b,c,d,e,f){var g=AmCharts.intervals,h=f.decimalSeparator;if(a>=g[b].contains){var k=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(k=AmCharts.formatNumber(k,f),1==k.split(h)[0].length&&(k="0"+k));("mm"==b||"hh"==b)&&10>k&&(k="0"+k);c=k+""+d[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return AmCharts.formatDuration(a,b,c,d,e,f)}"ss"==b&&(a=AmCharts.formatNumber(a,f),1==a.split(h)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+
d[b]+""+c;if(g[e].count>g[b].count)for(a=g[b].count;a<g[e].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+d[b]+""+c:"DD"==b&&(c="0"+d[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};
AmCharts.formatNumber=function(a,b,c,d,e){a=AmCharts.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var h=String(a),k=!1;-1!=h.indexOf("e")&&(k=!0);0<=c&&!k&&(h=AmCharts.toFixed(a,c));var l="";if(k)l=h;else{var h=h.split("."),k=String(h[0]),m;for(m=k.length;0<=m;m-=3)l=m!=k.length?0!==m?k.substring(m-3,m)+b+l:k.substring(m-3,m)+l:k.substring(m-3,m);void 0!==h[1]&&(l=l+f+h[1]);void 0!==c&&0<c&&"0"!=l&&(l=AmCharts.addZeroes(l,
f,c))}l=g+l;""===g&&!0===d&&0!==a&&(l="+"+l);!0===e&&(l+="%");return l};AmCharts.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",AmCharts.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};
AmCharts.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var d=0;b=a[0].split(".");b[1]&&(d=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-d;c++)b+="0"}return b};
AmCharts.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E);Math.pow(10,c);mantissa=String(mantissa).split(".").join(b);return String(mantissa)+"e"+c};AmCharts.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};
AmCharts.hitTest=function(a,b,c){var d=!1,e=a.x,f=a.x+a.width,g=a.y,h=a.y+a.height,k=AmCharts.isInRectangle;d||(d=k(e,g,b));d||(d=k(e,h,b));d||(d=k(f,g,b));d||(d=k(f,h,b));d||!0===c||(d=AmCharts.hitTest(b,a,!0));return d};AmCharts.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};AmCharts.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};
AmCharts.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};AmCharts.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};AmCharts.findIfFixed=function(a){if(a.offsetParent)for(;a=a.offsetParent;)if("fixed"==AmCharts.getStyle(a,"position"))return!0;return!1};
AmCharts.findIfAuto=function(a){return a.style&&"auto"==AmCharts.getStyle(a,"overflow")?!0:a.parentNode?AmCharts.findIfAuto(a.parentNode):!1};AmCharts.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?AmCharts.findScrollLeft(a.parentNode,b):b};AmCharts.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?AmCharts.findScrollTop(a.parentNode,b):b};
AmCharts.formatValue=function(a,b,c,d,e,f,g,h){if(b){void 0===e&&(e="");var k;for(k=0;k<c.length;k++){var l=c[k],m=b[l];void 0!==m&&(m=f?AmCharts.addPrefix(m,h,g,d):AmCharts.formatNumber(m,d),a=a.replace(new RegExp("\\[\\["+e+""+l+"\\]\\]","g"),m))}}return a};AmCharts.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),d;for(d=0;d<c.length;d++){var e=c[d],e=e.substr(2,e.length-4);void 0!==b[e]&&(a=a.replace(new RegExp("\\[\\["+e+"\\]\\]","g"),b[e]))}}return a};
AmCharts.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];void 0===d&&(d="");a=a.replace(c,d)}return a};AmCharts.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};
AmCharts.addPrefix=function(a,b,c,d,e){var f=AmCharts.formatNumber(a,d),g="",h,k,l;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(h=b.length-1;-1<h;h--){if(a>=b[h].number&&(k=a/b[h].number,l=Number(d.precision),1>l&&(l=1),c=AmCharts.roundTo(k,l),l=AmCharts.formatNumber(c,{precision:-1,decimalSeparator:d.decimalSeparator,thousandsSeparator:d.thousandsSeparator}),!e||k==c)){f=g+""+l+""+b[h].prefix;break}}else for(h=0;h<c.length;h++)if(a<=c[h].number){k=a/c[h].number;l=Math.abs(Math.round(Math.log(k)*
Math.LOG10E));k=AmCharts.roundTo(k,l);f=g+""+k+""+c[h].prefix;break}return f};AmCharts.remove=function(a){a&&a.remove()};AmCharts.recommended=function(){var a="js";document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")||swfobject&&swfobject.hasFlashPlayerVersion("8")&&(a="flash");return a};AmCharts.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};
AmCharts.getObjById=function(a,b){var c,d;for(d=0;d<a.length;d++){var e=a[d];e.id==b&&(c=e)}return c};AmCharts.applyTheme=function(a,b,c){b||(b=AmCharts.theme);b&&b[c]&&AmCharts.extend(a,b[c])};AmCharts.isString=function(a){return"string"==typeof a?!0:!1};AmCharts.extend=function(a,b,c){for(var d in b)c?a.hasOwnProperty(d)||(a[d]=b[d]):a[d]=b[d];return a};
AmCharts.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};AmCharts.processObject=function(a,b,c){!1===a instanceof b&&(a=AmCharts.extend(new b(c),a));return a};AmCharts.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};AmCharts.fixBrakes=function(a){if(AmCharts.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=AmCharts.fixNewLines(a);return a};
AmCharts.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)AmCharts.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a)a[c]&&("object"==typeof a[c]&&AmCharts.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(d){}}};
AmCharts.bounce=function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c};AmCharts.easeInSine=function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c};AmCharts.easeOutSine=function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c};
AmCharts.easeOutElastic=function(a,b,c,d,e){a=1.70158;var f=0,g=d;if(0===b)return c;if(1==(b/=e))return c+d;f||(f=.3*e);g<Math.abs(d)?(g=d,a=f/4):a=f/(2*Math.PI)*Math.asin(d/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*e-a)*Math.PI/f)+d+c};AmCharts.AxisBase=AmCharts.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem");this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=
!0;this.valueRollOverColor="#CC0000";this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;AmCharts.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?
("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,
this.gridCountR=Math.max(a,1)):this.gridCountR=this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var d=this.titleFontSize;isNaN(d)&&(d=b.fontSize+1);this.titleLabel=AmCharts.text(b.container,a,c,b.fontFamily,d,this.titleAlign,this.titleBold)}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,d=this.labelsSet,e=
{};0<d.length()?e=d.getBBox():(e.x=0,e.y=0,e.width=this.viW,e.height=this.viH);d.push(a);var d=e.x,f=e.y;AmCharts.VML&&(this.rotate?d-=this.x:f-=this.y);var g=e.width,e=e.height,h=this.viW,k=this.viH,l=0,m=a.getBBox().height/2,n=this.inside,p=this.titleAlign;switch(this.position){case "top":b="left"==p?-1:"right"==p?h:h/2;c=f-10-m;break;case "bottom":b="left"==p?-1:"right"==p?h:h/2;c=f+e+10+m;break;case "left":b=d-10-m;n&&(b-=5);c="left"==p?k+1:"right"==p?-1:k/2;l=-90;break;case "right":b=d+g+10+
m-3,n&&(b+=7),c="left"==p?k+2:"right"==p?-2:k/2,l=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==l&&a.rotate(l)}},pushAxisItem:function(a,b){var c=this,d=a.graphics();0<d.length()&&(b?c.labelsSet.push(d):c.set.push(d));if(d=a.getLabel())this.labelsSet.push(d),d.click(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,a,"rollOutItem")})},handleMouse:function(a,
b,c){this.fire(c,{type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,d=0;d<b.length;d++)b[d]==a&&(c=!0);c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),c=b.x+b.width/2,b=b.y+b.height/2,d=a.fillColor;void 0===d&&(d=a.lineColor);this.chart.showBalloon(a.balloonText,
d,!0,c,b)},handleGuideOut:function(a){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();AmCharts.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});return a},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);var a=this.axisLine;a&&AmCharts.remove(a.set);AmCharts.remove(this.grid0)}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");AmCharts.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=
0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1;this.logGridLimit=2;this.treatZeroAs=0;AmCharts.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();
this.synchronizationMultiplier&&this.synchronizeWith?(AmCharts.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax())},draw:function(){AmCharts.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;"duration"==this.type&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);if(this.logarithmic){var c=
this.treatZeroAs,d=this.getMin(0,this.data.length-1);0<c&&0==d&&(this.minReal=d=c);if(0>=d||0>=this.minimum){this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var e,f,g=a.dx,h=a.dy,c=!1,d=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)c=!0;else{var k=this.labelFrequency,l=this.showFirstLabel,m=this.showLastLabel,n=1,p=0,q=Math.round((this.max-this.min)/this.step)+1,r;!0===d?(r=Math.log(this.max)*
Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/r,r>this.logGridLimit&&(q=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,p=Math.round(Math.log(this.minReal)*Math.LOG10E),q>this.gridCountR&&(n=Math.ceil(q/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);var t=0;1>this.step&&-1<this.step&&(t=AmCharts.getDecimals(this.step));this.integersOnly&&(t=0);t>this.maxDecCount&&(t=this.maxDecCount);var w=this.precision;isNaN(w)||(t=w);this.max=AmCharts.roundTo(this.max,
this.maxDecCount);this.min=AmCharts.roundTo(this.min,this.maxDecCount);f={};f.precision=t;f.decimalSeparator=a.nf.decimalSeparator;f.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=f;var v,s=this.guides;e=s.length;if(0<e){var u=this.fillAlpha;for(f=this.fillAlpha=0;f<e;f++){var x=s[f],F=NaN,B=x.above;isNaN(x.toValue)||(F=this.getCoordinate(x.toValue),v=new this.axisItemRenderer(this,F,"",!0,NaN,NaN,x),this.pushAxisItem(v,B));var z=NaN;isNaN(x.value)||(z=this.getCoordinate(x.value),
v=new this.axisItemRenderer(this,z,x.label,!0,NaN,(F-z)/2,x),this.pushAxisItem(v,B));isNaN(F-z)||(v=new this.guideFillRenderer(this,z,F,x),this.pushAxisItem(v,B),v=v.graphics(),x.graphics=v,x.balloonText&&this.addEventListeners(v,x))}this.fillAlpha=u}this.exponential=!1;for(f=p;f<q;f+=n)s=AmCharts.roundTo(this.step*f+this.min,t),-1!=String(s).indexOf("e")&&(this.exponential=!0,String(s).split("e"));this.duration&&(this.maxInterval=AmCharts.getMaxInterval(this.max,this.duration));var t=this.step,I,
s=this.minorGridAlpha;this.minorGridEnabled&&(I=this.getMinorGridStep(t,this.stepWidth*t));for(f=p;f<q;f+=n)if(p=t*f+this.min,d&&this.max-this.min>5*this.min&&(p-=this.min),p=AmCharts.roundTo(p,this.maxDecCount+1),!this.integersOnly||Math.round(p)==p)if(isNaN(w)||Number(AmCharts.toFixed(p,w))==p){!0===d&&(0===p&&(p=this.minReal),r>this.logGridLimit&&(p=Math.pow(10,f)));v=this.formatValue(p,!1,f);Math.round(f/k)!=f/k&&(v=void 0);if(0===f&&!l||f==q-1&&!m)v=" ";e=this.getCoordinate(p);v=new this.axisItemRenderer(this,
e,v,void 0,void 0,void 0,void 0,this.boldLabels);this.pushAxisItem(v);if(p==this.baseValue&&"radar"!=a.type){var E,H,x=this.viW,B=this.viH;v=this.viX;u=this.viY;"H"==this.orientation?0<=e&&e<=x+1&&(E=[e,e,e+g],H=[B,0,h]):0<=e&&e<=B+1&&(E=[0,x,x+g],H=[e,e,e+h]);E&&(e=AmCharts.fitToBounds(2*this.gridAlpha,0,1),e=AmCharts.line(a.container,E,H,this.gridColor,e,1,this.dashLength),e.translate(v,u),this.grid0=e,a.axesSet.push(e),e.toBack())}if(!isNaN(I)&&0<s&&f<q-1){v=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;
for(e=1;e<t/I;e++)u=this.getCoordinate(p+I*e),u=new this.axisItemRenderer(this,u,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(u);this.gridAlpha=v}}r=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(r=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(r=this.max);d&&r<this.minReal&&(r=this.minReal);this.baseCoord=this.getCoordinate(r);r={type:"axisChanged",target:this,chart:a};r.min=d?this.minReal:this.min;r.max=this.max;this.fire("axisChanged",r);this.axisCreated=!0}d=this.axisLine.set;
r=this.labelsSet;this.positionTitle();"radar"!=a.type?(a=this.viX,I=this.viY,b.translate(a,I),r.translate(a,I)):d.toFront();!this.visible||c?(b.hide(),d.hide(),r.hide()):(b.show(),d.show(),r.show());this.axisY=this.y-this.viY;this.axisX=this.x-this.viX},formatValue:function(a,b,c){var d=this.exponential,e=this.logarithmic,f=this.numberFormatter,g=this.chart;!0===this.logarithmic&&(d=-1!=String(a).indexOf("e")?!0:!1);this.useScientificNotation&&(d=!0);this.usePrefixes&&(d=!1);d?(valueText=-1==String(a).indexOf("e")?
a.toExponential(15):String(a),c=valueText.split("e"),b=Number(c[0]),c=Number(c[1]),b=AmCharts.roundTo(b,14),10==b&&(b=1,c+=1),valueText=b+"e"+c,0===a&&(valueText="0"),1==a&&(valueText="1")):(e&&(d=String(a).split("."),d[1]?(f.precision=d[1].length,0>c&&(f.precision=Math.abs(c))):f.precision=-1),valueText=this.usePrefixes?AmCharts.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):AmCharts.formatNumber(a,f,f.precision));this.duration&&(valueText=AmCharts.formatDuration(a,this.duration,
"",this.durationUnits,this.maxInterval,f));this.recalculateToPercents?valueText+="%":(f=this.unit)&&(valueText="left"==this.unitPosition?f+valueText:valueText+f);this.labelFunction&&(valueText=this.labelFunction(a,valueText,this).toString());return valueText},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var d=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=0;e<c.length;e++){var f=a/c[e],g=Math.floor(Math.log(Math.abs(f))*Math.LOG10E);if(!(0<Math.abs(d-g)))if(1>a){if(g=Math.pow(10,
-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],d=[],e=[],f=[],g,h=this.chart.graphs,k,l,m,n,p=this.baseValue,q=!1;if("line"==a||"step"==a||"smoothedLine"==a)q=!0;if(q&&("regular"==b||"100%"==b))for(n=0;n<h.length;n++)m=h[n],m.hidden||(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(k&&(m.stackGraph=k),k=m));
for(k=this.start;k<=this.end;k++){var r=0;for(n=0;n<h.length;n++)if(m=h[n],m.hidden)m.newStack&&(e[k]=NaN,d[k]=NaN);else if(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable)if(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g))m.newStack&&(e[k]=NaN,d[k]=NaN);else{var t=AmCharts.getDecimals(g);r<t&&(r=t);isNaN(f[k])?f[k]=Math.abs(g):f[k]+=Math.abs(g);f[k]=AmCharts.roundTo(f[k],r);t=m.fillToGraph;q&&t&&(t=this.data[k].axes[this.id].graphs[t.id])&&(l.values.open=t.values.value);
"regular"==b&&(q&&(isNaN(c[k])?(c[k]=g,l.values.close=g,l.values.open=this.baseValue):(isNaN(g)?l.values.close=c[k]:l.values.close=g+c[k],l.values.open=c[k],c[k]=l.values.close)),"column"==a&&(m.newStack&&(e[k]=NaN,d[k]=NaN),l.values.close=g,0>g?(l.values.close=g,isNaN(d[k])?l.values.open=p:(l.values.close+=d[k],l.values.open=d[k]),d[k]=l.values.close):(l.values.close=g,isNaN(e[k])?l.values.open=p:(l.values.close+=e[k],l.values.open=e[k]),e[k]=l.values.close)))}}for(k=this.start;k<=this.end;k++)for(n=
0;n<h.length;n++)(m=h[n],m.hidden)?m.newStack&&(e[k]=NaN,d[k]=NaN):(l=m.type,m.chart==this.chart&&m.valueAxis==this&&a==l&&m.stackable&&(l=this.data[k].axes[this.id].graphs[m.id],g=l.values.value,isNaN(g)||(c=g/f[k]*100,l.values.percents=c,l.values.total=f[k],m.newStack&&(e[k]=NaN,d[k]=NaN),"100%"==b&&(isNaN(d[k])&&(d[k]=0),isNaN(e[k])&&(e[k]=0),0>c?(l.values.close=AmCharts.fitToBounds(c+d[k],-100,100),l.values.open=d[k],d[k]=l.values.close):(l.values.close=AmCharts.fitToBounds(c+e[k],-100,100),l.values.open=
e[k],e[k]=l.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var d=b[c];if(d.valueAxis==this){var e="value";if("candlestick"==d.type||"ohlc"==d.type)e="open";var f,g,h=this.end+2,h=AmCharts.fitToBounds(this.end+1,0,this.data.length-1),k=this.start;0<k&&k--;var l;g=this.start;d.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(l=a.categoryAxis)){minDuration=l.minDuration();var m=new Date(a.startTime+minDuration/2),n=AmCharts.resetDateToMin(new Date(a.startTime),
l.minPeriod).getTime();AmCharts.resetDateToMin(new Date(m),l.minPeriod).getTime()>n&&g++}if(l=a.recalculateFromDate)a.dataDateFormat&&(l=AmCharts.stringToDate(l,a.dataDateFormat)),g=a.getClosestIndex(a.chartData,"time",l.getTime(),!0,0,a.chartData.length),h=a.chartData.length-1;for(l=g;l<=h&&(g=this.data[l].axes[this.id].graphs[d.id],f=g.values[e],isNaN(f));l++);this.recBaseValue=f;for(e=k;e<=h;e++){g=this.data[e].axes[this.id].graphs[d.id];g.percents={};var k=g.values,p;for(p in k)g.percents[p]=
"percents"!=p?k[p]/f*100-100:k[p]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,d;for(d=0;d<c.length;d++){var e=c[d].type;("line"==e||"step"==e||"smoothedLine"==e)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();a=(this.max-this.min)*(a-1);this.min-=a;this.max+=
a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=
this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;d=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/d)*d+d);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/d)*d-d);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&
(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;d=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/d)*d;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=this.fixStepE(c);d=Math.ceil(this.step/c);5<d&&(d=10);5>=d&&2<d&&(d=5);this.step=Math.ceil(this.step/(c*d))*c*d;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),
this.step=AmCharts.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&
(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);c=Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E;this.logarithmic&&(2<c?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},fixStepE:function(a){a=a.toExponential(0).split("e");
var b=Number(a[1]);9==Number(a[0])&&b++;return this.generateNumber(1,b)},generateNumber:function(a,b){var c="",d;d=0>b?Math.abs(b)-1:Math.abs(b);var e;for(e=0;e<d;e++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)},getMin:function(a,b){var c,d;for(d=a;d<=b;d++){var e=this.data[d].axes[this.id].graphs,f;for(f in e)if(e.hasOwnProperty(f)){var g=this.chart.getGraphById(f);if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=e[f].values;this.recalculateToPercents&&
(g=e[f].percents);var h;if(this.minMaxField)h=g[this.minMaxField],h<c&&(c=h);else for(var k in g)g.hasOwnProperty(k)&&"percents"!=k&&"total"!=k&&(h=g[k],h<c&&(c=h))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,d;for(d in c)if(c.hasOwnProperty(d)){var e=this.chart.getGraphById(d);if(e.includeInMinMax&&(!e.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;e=c[d].values;this.recalculateToPercents&&(e=c[d].percents);
var f;if(this.minMaxField)f=e[this.minMaxField],f>a&&(a=f);else for(var g in e)e.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=e[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomToValues:function(a,b){if(b<a){var c=b;b=a;a=c}a<this.min&&(a=this.min);b>this.max&&(b=this.max);c={type:"axisSelfZoomed"};c.chart=this.chart;c.valueAxis=this;c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-
this.getCoordinate(a));c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a);this.fire(c.type,c)},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,d=this.reversed,e=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(e?!0===d?(b-a)/c:a/c:!0===d?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===d?e?f-(a-b)/c:a/c+f:e?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;
var b=this.rotate,c=this.reversed,d=this.axisWidth,e=this.stepWidth,f=this.min,g=this.minReal;!0===this.logarithmic?(0==a&&(a=this.treatZeroAs),a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?d-e*a:e*a:!0===c?e*a:d-e*a):b=!0===c?b?d-e*(a-f):e*(a-f):b?e*(a-f):d-e*(a-f);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);1E7<Math.abs(b)&&(b=1E7*(b/Math.abs(b)));return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",
this.handleSynchronization)},handleSynchronization:function(a){var b=this.synchronizeWith;a=b.min;var c=b.max,b=b.step,d=this.synchronizationMultiplier;d&&(this.min=a*d,this.max=c*d,this.step=b*d,a=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),a=Math.abs(Math.log(Math.abs(a))*Math.LOG10E),this.maxDecCount=a=Math.round(a),this.draw())}});AmCharts.RecAxis=AmCharts.Class({construct:function(a){var b=a.chart,c=a.axisThickness,d=a.axisColor,e=a.axisAlpha,f=a.offset,g=a.dx,h=a.dy,k=a.viX,l=a.viY,m=a.viH,n=a.viW,p=b.container;"H"==a.orientation?(d=AmCharts.line(p,[0,n],[0,0],d,e,c),this.axisWidth=a.width,"bottom"==a.position?(a=c/2+f+m+l-1,c=k):(a=-c/2-f+l+h,c=g+k)):(this.axisWidth=a.height,"right"==a.position?(d=AmCharts.line(p,[0,0,-g],[0,m,m-h],d,e,c),a=l+h,c=c/2+f+g+n+k-1):(d=AmCharts.line(p,[0,0],[0,m],d,e,c),a=l,c=-c/2-f+k));d.translate(c,
a);b.axesSet.push(d);this.set=d}});AmCharts.RecItem=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l,m){b=Math.round(b);this.value=c;void 0==c&&(c="");k||(k=0);void 0==d&&(d=!0);var n=a.chart.fontFamily,p=a.fontSize;void 0==p&&(p=a.chart.fontSize);var q=a.color;void 0==q&&(q=a.chart.color);void 0!==m&&(q=m);var r=a.chart.container,t=r.set();this.set=t;var w=a.axisThickness,v=a.axisColor,s=a.axisAlpha,u=a.tickLength,x=a.gridAlpha,F=a.gridThickness,B=a.gridColor,z=a.dashLength,I=a.fillColor,E=a.fillAlpha,H=a.labelsEnabled;m=a.labelRotation;
var V=a.counter,T=a.inside,fa=a.labelOffset,aa=a.dx,ga=a.dy,Na=a.orientation,ma=a.position,ba=a.previousCoord,O=a.viH,X=a.viW,na=a.offset,$,W;g?(H=!0,isNaN(g.tickLength)||(u=g.tickLength),void 0!=g.lineColor&&(B=g.lineColor),void 0!=g.color&&(q=g.color),isNaN(g.lineAlpha)||(x=g.lineAlpha),isNaN(g.dashLength)||(z=g.dashLength),isNaN(g.lineThickness)||(F=g.lineThickness),!0===g.inside&&(T=!0),isNaN(g.labelRotation)||(m=g.labelRotation),isNaN(g.fontSize)||(p=g.fontSize),g.position&&(ma=g.position),void 0!==
g.boldLabel&&(h=g.boldLabel),isNaN(g.labelOffset)||(fa=g.labelOffset)):""===c&&(u=0);W="start";e&&(W="middle");var Y=m*Math.PI/180,ja,G=0,A=0,ka=0,S=ja=0,y=0;"V"==Na&&(m=0);var Z;H&&(Z=a.autoWrap&&0===m?AmCharts.wrappedText(r,c,q,n,p,W,h,e,0):AmCharts.text(r,c,q,n,p,W,h),W=Z.getBBox(),S=W.width,y=W.height);if("H"==Na){if(0<=b&&b<=X+1&&(0<u&&0<s&&b+k<=X+1&&($=AmCharts.line(r,[b+k,b+k],[0,u],v,s,F),t.push($)),0<x&&(W=AmCharts.line(r,[b,b+aa,b+aa],[O,O+ga,ga],B,x,F,z),t.push(W))),A=0,G=b,g&&90==m&&T&&
(G-=p),!1===d?(W="start",A="bottom"==ma?T?A+u:A-u:T?A-u:A+u,G+=3,e&&(G+=e/2-3,W="middle"),0<m&&(W="middle")):W="middle",1==V&&0<E&&!g&&!l&&ba<X&&(d=AmCharts.fitToBounds(b,0,X),ba=AmCharts.fitToBounds(ba,0,X),ja=d-ba,0<ja&&(fill=AmCharts.rect(r,ja,a.height,I,E),fill.translate(d-ja+aa,ga),t.push(fill))),"bottom"==ma?(A+=O+p/2+na,T?(0<m?(A=O-S/2*Math.sin(Y)-u-3,G+=S/2*Math.cos(Y)-4+2):0>m?(A=O+S*Math.sin(Y)-u-3+2,G+=-S*Math.cos(Y)-y*Math.sin(Y)-4):A-=u+p+3+3,A-=fa):(0<m?(A=O+S/2*Math.sin(Y)+u+3,G-=S/
2*Math.cos(Y)):0>m?(A=O+u+3-S/2*Math.sin(Y)+2,G+=S/2*Math.cos(Y)):A+=u+w+3+3,A+=fa)):(A+=ga+p/2-na,G+=aa,T?(0<m?(A=S/2*Math.sin(Y)+u+3,G-=S/2*Math.cos(Y)):A+=u+3,A+=fa):(0<m?(A=-(S/2)*Math.sin(Y)-u-6,G+=S/2*Math.cos(Y)):A-=u+p+3+w+3,A-=fa)),"bottom"==ma?ja=(T?O-u-1:O+w-1)+na:(ka=aa,ja=(T?ga:ga-u-w+1)-na),f&&(G+=f),f=G,0<m&&(f+=S/2*Math.cos(Y)),Z&&(p=0,T&&(p=S/2*Math.cos(Y)),f+p>X+2||0>f))Z.remove(),Z=null}else{0<=b&&b<=O+1&&(0<u&&0<s&&b+k<=O+1&&($=AmCharts.line(r,[0,u],[b+k,b+k],v,s,F),t.push($)),
0<x&&(W=AmCharts.line(r,[0,aa,X+aa],[b,b+ga,b+ga],B,x,F,z),t.push(W)));W="end";if(!0===T&&"left"==ma||!1===T&&"right"==ma)W="start";A=b-p/2;1==V&&0<E&&!g&&!l&&(d=AmCharts.fitToBounds(b,0,O),ba=AmCharts.fitToBounds(ba,0,O),Y=d-ba,fill=AmCharts.polygon(r,[0,a.width,a.width,0],[0,0,Y,Y],I,E),fill.translate(aa,d-Y+ga),t.push(fill));A+=p/2;"right"==ma?(G+=aa+X+na,A+=ga,T?(f||(A-=p/2+3),G=G-(u+4)-fa):(G+=u+4+w,A-=2,G+=fa)):T?(G+=u+4-na,f||(A-=p/2+3),g&&(G+=aa,A+=ga),G+=fa):(G+=-u-w-4-2-na,A-=2,G-=fa);$&&
("right"==ma?(ka+=aa+na+X,ja+=ga,ka=T?ka-w:ka+w):(ka-=na,T||(ka-=u+w)));f&&(A+=f);T=-3;"right"==ma&&(T+=ga);Z&&(A>O+1||A<T)&&(Z.remove(),Z=null)}$&&$.translate(ka,ja);!1===a.visible&&($&&$.remove(),Z&&(Z.remove(),Z=null));Z&&(Z.attr({"text-anchor":W}),Z.translate(G,A),0!==m&&Z.rotate(-m,a.chart.backgroundColor),a.allLabels.push(Z)," "!=c&&(this.label=Z));l||(a.counter=0===V?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RecFill=AmCharts.Class({construct:function(a,b,c,d){var e=a.dx,f=a.dy,g=a.orientation,h=0;if(c<b){var k=b;b=c;c=k}var l=d.fillAlpha;isNaN(l)&&(l=0);k=a.chart.container;d=d.fillColor;"V"==g?(b=AmCharts.fitToBounds(b,0,a.viH),c=AmCharts.fitToBounds(c,0,a.viH)):(b=AmCharts.fitToBounds(b,0,a.viW),c=AmCharts.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,h=2,l=0);0>c&&"object"==typeof d&&(d=d.join(",").split(",").reverse());"V"==g?(a=AmCharts.rect(k,a.width,c,d,l),a.translate(e,b-h+f)):(a=AmCharts.rect(k,
c,a.height,d,l),a.translate(b-h+e,f));this.set=k.set([a])},graphics:function(){return this.set},getLabel:function(){}});AmCharts.AmChart=AmCharts.Class({construct:function(a){this.theme=a;this.version="3.11.3";AmCharts.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn","failed");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.precision=-1;this.percentPrecision=
2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=
2;this.handDrawThickness=1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=
!0;AmCharts.bezierX=3;AmCharts.bezierY=6;this.product="amcharts";this.animations=[];this.balloon=new AmCharts.AmBalloon(this.theme);this.balloon.chart=this;AmCharts.applyTheme(this,a,"AmChart")},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles();this.brr()},drawBackground:function(){AmCharts.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,d=this.set;AmCharts.isModern||0!==c||(c=.001);var e=this.updateWidth();this.realWidth=e;
var f=this.updateHeight();this.realHeight=f;this.background=b=AmCharts.polygon(a,[0,e-1,e-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.push(b);if(b=this.backgroundImage)this.path&&(b=this.path+b),this.bgImg=a=a.image(b,0,0,e,f),d.push(a)},drawTitles:function(){var a=this.titles;if(AmCharts.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var d=a[c],e=d.color;void 0===e&&(e=this.color);var f=d.size;isNaN(f)&&(f=this.fontSize+2);isNaN(d.alpha);var g=this.marginLeft,e=AmCharts.text(this.container,
d.text,e,this.fontFamily,f);e.translate(g+(this.realWidth-this.marginRight-g)/2,b);e.node.style.pointerEvents="none";g=!0;void 0!==d.bold&&(g=d.bold);g&&e.attr({"font-weight":"bold"});e.attr({opacity:d.alpha});b+=f+6;this.freeLabelsSet.push(e)}}},write:function(a){if(a="object"!=typeof a?document.getElementById(a):a){a.innerHTML="";this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,d=this.legend,e=c.style,f=b.style;this.measure();var g,h=document.createElement("div");
g=h.style;g.position="relative";this.containerDiv=h;a.appendChild(h);var k=this.exportConfig;k&&AmCharts.AmExport&&!this.AmExport&&(this.AmExport=new AmCharts.AmExport(this,k));this.amExport&&AmCharts.AmExport&&(this.AmExport=AmCharts.extend(this.amExport,new AmCharts.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(d)switch(d=this.addLegend(d,d.divId),d.position){case "bottom":h.appendChild(b);h.appendChild(c);break;case "top":h.appendChild(c);h.appendChild(b);break;
case "absolute":g.width=a.style.width;g.height=a.style.height;e.position="absolute";f.position="absolute";void 0!==d.left&&(e.left=d.left+"px");void 0!==d.right&&(e.right=d.right+"px");void 0!==d.top&&(e.top=d.top+"px");void 0!==d.bottom&&(e.bottom=d.bottom+"px");d.marginLeft=0;d.marginRight=0;h.appendChild(b);h.appendChild(c);break;case "right":g.width=a.style.width;g.height=a.style.height;e.position="relative";f.position="absolute";h.appendChild(b);h.appendChild(c);break;case "left":g.width=a.style.width;
g.height=a.style.height;e.position="absolute";f.position="relative";h.appendChild(b);h.appendChild(c);break;case "outside":h.appendChild(b)}else h.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);this.initChart()}},createLabelsSet:function(){AmCharts.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.initHC||(AmCharts.callInitHandler(this),this.initHC=!0);AmCharts.applyLang(this.language,this);
var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,
decimalSeparator:this.decimalSeparator};this.divIsFixed=AmCharts.findIfFixed(this.chartDiv);this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;this.destroy();this.startInterval();a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];b&&window.getComputedStyle&&(b=window.getComputedStyle(b,null))&&(this.dmouseY=AmCharts.removePx(b.getPropertyValue("margin-top")),this.dmouseX=AmCharts.removePx(b.getPropertyValue("margin-left")));
this.mouseMode=a;(a=this.container)?(a.container.innerHTML="",this.chartDiv.appendChild(a.container),a.setSize(this.realWidth,this.realHeight)):a=new AmCharts.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);AmCharts.VML||AmCharts.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,this.container=a,this.set&&this.set.remove(),this.set=a.set(),this.gridSet&&this.gridSet.remove(),this.gridSet=a.set(),this.cursorLineSet&&this.cursorLineSet.remove(),
this.cursorLineSet=a.set(),this.graphsBehindSet&&this.graphsBehindSet.remove(),this.graphsBehindSet=a.set(),this.bulletBehindSet&&this.bulletBehindSet.remove(),this.bulletBehindSet=a.set(),this.columnSet&&this.columnSet.remove(),this.columnSet=a.set(),this.graphsSet&&this.graphsSet.remove(),this.graphsSet=a.set(),this.trendLinesSet&&this.trendLinesSet.remove(),this.trendLinesSet=a.set(),this.axesSet&&this.axesSet.remove(),this.axesSet=a.set(),this.cursorSet&&this.cursorSet.remove(),this.cursorSet=
a.set(),this.scrollbarsSet&&this.scrollbarsSet.remove(),this.scrollbarsSet=a.set(),this.bulletSet&&this.bulletSet.remove(),this.bulletSet=a.set(),this.freeLabelsSet&&this.freeLabelsSet.remove(),this.axesLabelsSet&&this.axesLabelsSet.remove(),this.axesLabelsSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet&&this.balloonsSet.remove(),this.balloonsSet=a.set(),this.zoomButtonSet&&this.zoomButtonSet.remove(),this.zoomButtonSet=a.set(),this.linkSet&&this.linkSet.remove(),this.linkSet=a.set(),this.renderFix()):
this.fire("failed",{type:"failed",chart:this})},measure:function(){var a=this.div;if(a){var b=this.chartDiv,c=a.offsetWidth,d=a.offsetHeight,e=this.container;a.clientHeight&&(c=a.clientWidth,d=a.clientHeight);var f=AmCharts.removePx(AmCharts.getStyle(a,"padding-left")),g=AmCharts.removePx(AmCharts.getStyle(a,"padding-right")),h=AmCharts.removePx(AmCharts.getStyle(a,"padding-top")),k=AmCharts.removePx(AmCharts.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(h)||(d-=h);isNaN(k)||
(d-=k);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=AmCharts.removePx(a));-1!=f.indexOf("px")&&(d=AmCharts.removePx(f));a=AmCharts.toCoordinate(this.width,c);f=AmCharts.toCoordinate(this.height,d);this.balloon=AmCharts.processObject(this.balloon,AmCharts.AmBalloon,this.theme);this.balloon.chart=this;(a!=this.previousWidth||f!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",e&&e.setSize(a,f));this.balloon.setBounds(2,2,a-2,f);this.realWidth=a;this.realHeight=f;
this.divRealWidth=c;this.divRealHeight=d}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.interval&&clearInterval(this.interval);this.interval=NaN},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){AmCharts.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();
this.interval&&clearInterval(this.interval);this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||AmCharts.removeChart(this)},setMouseCursor:function(a){"auto"==a&&AmCharts.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container){var b=a.y,c=a.text,d=a.align,e=
a.size,f=a.color,g=a.rotation,h=a.alpha,k=a.bold,l=AmCharts.toCoordinate(a.x,this.realWidth),b=AmCharts.toCoordinate(b,this.realHeight);l||(l=0);b||(b=0);void 0===f&&(f=this.color);isNaN(e)&&(e=this.fontSize);d||(d="start");"left"==d&&(d="start");"right"==d&&(d="end");"center"==d&&(d="middle",g?b=this.realHeight-b+b/2:l=this.realWidth/2-l);void 0===h&&(h=1);void 0===g&&(g=0);b+=e/2;c=AmCharts.text(this.container,c,f,this.fontFamily,e,d,k,h);c.translate(l,b);0!==g&&c.rotate(g);a.url?(c.setAttr("cursor",
"pointer"),c.click(function(){AmCharts.getURL(a.url)})):c.node.style.pointerEvents="none";this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,d,e,f,g,h,k,l){a={x:a,y:b,text:c,align:d,size:e,color:f,alpha:h,rotation:g,bold:k,url:l};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,
b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var d=this.legendDiv,e=d.offsetWidth;isNaN(c.width)||(e=c.width);var f=d.offsetHeight,d=d.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c){a-=e;if(0>a||isNaN(a))a=0;g.width=a+"px";"left"==c?g.left=e+"px":d.left=a+"px";b>f&&(d.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){var a=
0,b=this.titles;if(0<b.length){var a=15,c;for(c=0;c<b.length;c++){var d=b[c].size;isNaN(d)&&(d=this.fontSize+2);a+=d+6}}return a},addTitle:function(a,b,c,d,e){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:d,bold:e};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(a){},addListeners:function(){var a=
this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&(b.style.msTouchAction="none"),"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,b);a.handleMouseDown.call(a,
b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a="dataUpdated",this.fire(a,{type:a,chart:this}));
this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||(a="rendered",this.fire(a,{type:a,chart:this}),this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})},validateSize:function(){var a=this;a.measure();var b=a.legend;if((a.realWidth!=a.previousWidth||a.realHeight!=a.previousHeight)&&0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},100);a.timeOuts.push(c);a.legendInitTO=c}a.marginsUpdated=
"xy"!=a.type?!1:!0;clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},150);a.timeOuts.push(c);a.initTO=c}a.renderFix();b&&b.renderFix()},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated=
"xy"!=this.type?!1:!0,this.initChart(a))},validateNow:function(){this.chartRendered=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearInterval(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,d,e){var f=this;
clearTimeout(f.balloonTO);clearInterval(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,d,e)},1)},showBalloonReal:function(a,b,c,d,e){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(d,e),f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-AmCharts.findPosX(b),this.mouseY=
a.pageY-AmCharts.findPosY(b))},handleMouseOver:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);var c,d;if(a){this.posX=AmCharts.findPosX(b);this.posY=AmCharts.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;d=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,e,f;b&&(e=b.scrollLeft,y1=b.scrollTop);if(b=
document.documentElement)f=b.scrollLeft,y2=b.scrollTop;e=Math.max(e,f);f=Math.max(y1,y2);c+=e;d+=f}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,d=a.clientY-this.posY):(c=a.pageX-this.posX,d=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),c=a.pageX-this.posX,d=a.pageY-this.posY);this.mouseX=c-this.dmouseX;this.mouseY=d-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){AmCharts.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(a){},
handleMouseDown:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=AmCharts.processObject(a,AmCharts.AmLegend,this.theme);a.divId=b;var c;c="object"!=typeof b&&b?document.getElementById(b):b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);
this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c);return a},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(AmCharts.isPercents(this.width)||AmCharts.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},
getSVG:function(){if(AmCharts.hasSVG)return this.container},animate:function(a,b,c,d,e,f,g){a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:d,time:e,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},startInterval:function(){var a=this;clearInterval(a.interval);a.interval=setInterval(function(){a.updateAnimations.call(a)},AmCharts.updateRate)},stopAnim:function(a){AmCharts.removeFromArray(this.animations,
a)},updateAnimations:function(){var a;this.container&&this.container.update();for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/AmCharts.updateRate,d=b.frame+1,e=b.obj,f=b.attribute;if(d<=c){b.frame++;var g=Number(b.from),h=Number(b.to)-g,c=AmCharts[b.effect](0,d,g,h,c);0===h?(this.animations.splice(a,1),e.node.style[f]=Number(b.to)+b.suffix):e.node.style[f]=c+b.suffix}else e.node.style[f]=Number(b.to)+b.suffix,this.animations.splice(a,1)}},inIframe:function(){try{return window.self!==
window.top}catch(a){return!0}},brr:function(){var a=window.location.hostname.split("."),b;2<=a.length&&(b=a[a.length-2]+"."+a[a.length-1]);this.amLink&&(a=this.amLink.parentNode)&&a.removeChild(this.amLink);a=this.creditsPosition;if("amcharts.com"!=b||!0===this.inIframe()){var c=b=0,d=this.realWidth,e=this.realHeight;if("serial"==this.type||"xy"==this.type)b=this.marginLeftReal,c=this.marginTopReal,d=b+this.plotAreaWidth,e=c+this.plotAreaHeight;var f="http://www.amcharts.com/javascript-charts/",g=
"JavaScript charts",h="JS chart by amCharts";"ammap"==this.product&&(f="http://www.ammap.com/javascript-maps/",g="Interactive JavaScript maps",h="JS map by amCharts");var k=document.createElement("a"),h=document.createTextNode(h);k.setAttribute("href",f);k.setAttribute("title",g);k.appendChild(h);this.chartDiv.appendChild(k);this.amLink=k;f=k.style;f.position="absolute";f.textDecoration="none";f.color=this.color;f.fontFamily=this.fontFamily;f.fontSize=this.fontSize+"px";f.opacity=.7;f.display="block";
var g=k.offsetWidth,k=k.offsetHeight,h=5+b,l=c+5;"bottom-left"==a&&(h=5+b,l=e-k-3);"bottom-right"==a&&(h=d-g-5,l=e-k-3);"top-right"==a&&(h=d-g-5,l=c+5);f.left=h+"px";f.top=l+"px"}}});AmCharts.Slice=AmCharts.Class({construct:function(){}});AmCharts.SerialDataItem=AmCharts.Class({construct:function(){}});AmCharts.GraphDataItem=AmCharts.Class({construct:function(){}});AmCharts.Guide=AmCharts.Class({construct:function(a){this.cname="Guide";AmCharts.applyTheme(this,a,this.cname)}});AmCharts.AmGraph=AmCharts.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";
this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";
this.clustered=!0;this.periodSpan=1;this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.chart,b=this.chart.type;isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var c=a.container;this.container=
c;this.destroy();var d=c.set(),e=c.set();this.behindColumns?(a.graphsBehindSet.push(d),a.bulletBehindSet.push(e)):(a.graphsSet.push(d),a.bulletSet.push(e));var f=this.bulletAxis;AmCharts.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));this.bulletSet=e;if(!this.scrollbar){var f=a.marginLeftReal,g=a.marginTopReal;d.translate(f,g);e.translate(f,g)}c=c.set();AmCharts.remove(this.columnsSet);d.push(c);this.set=d;this.columnsSet=c;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=
[];d=this.labelPosition;d||(c=this.valueAxis.stackType,d="top","column"==this.type&&(a.rotate&&(d="right"),"100%"==c||"regular"==c)&&(d="middle"),this.labelPosition=d);AmCharts.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph())},createGraph:function(){var a=this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=
0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(b.type){case "serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case "radar":a.createRadarGraph();break;case "xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=
setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,d=this.yAxis;this.pmh=d.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var e;for(e=this.start;e<=this.end;e++){var f=this.data[e].axes[c.id].graphs[this.id],g=f.values,h=g.x,k=g.y,g=c.getCoordinate(h),l=d.getCoordinate(k);!isNaN(h)&&!isNaN(k)&&(a.push(g),b.push(l),h=this.createBullet(f,g,l,e),k=this.labelText)&&(f=this.createLabel(f,
g,l,k),this.positionLabel(g,l,f,h),this.allBullets.push(f))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],d,e,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],h;h="none"==a||"3d"==a?g.values.value:g.values.close;if(isNaN(h))this.drawLineGraph(b,c),b=[],c=[];else{var k=this.y-(this.valueAxis.getCoordinate(h)-this.height),l=180-360/(this.end-this.start+1)*f;h=k*Math.sin(l/180*Math.PI);
k*=Math.cos(l/180*Math.PI);b.push(h);c.push(k);var l=this.createBullet(g,h,k,f),m=this.labelText;m&&(g=this.createLabel(g,h,k,m),this.positionLabel(h,k,g,l),this.allBullets.push(g));isNaN(d)&&(d=h);isNaN(e)&&(e=k)}}b.push(d);c.push(e);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,d,e,f){fontSize=this.fontSize;lA="middle";lR=0;lC=!1;lP=this.labelPosition;lBB=c.getBBox();cBB=null;graphDataItem=d.graphDataItem;isRotated=this.chart.rotate;isNegative=graphDataItem.isNegative;
void 0===fontSize&&(fontSize=this.chart.fontSize);b-=lBB.height/4/2;switch(lP){case "top":lP=isRotated?"top":isNegative?"bottom":"top";break;case "right":lP=isRotated?isNegative?"left":"right":"right";break;case "bottom":lP=isRotated?"bottom":isNegative?"top":"bottom";break;case "left":lP=isRotated?isNegative?"right":"left":"left"}e=graphDataItem.columnGraphics;var g=f=0;e&&(f=e.x,g=e.y);switch(lP){case "top":b-=d.size/2+lBB.height/2+this.labelOffset;break;case "right":lA="start";a+=d.size/2+this.labelOffset;
break;case "bottom":b+=d.size/2+lBB.height/2+this.labelOffset;break;case "left":lA="end";a-=d.size/2+this.labelOffset;break;case "inside":"column"==this.type&&(lC=!0,isRotated?isNegative?(lA="end",a=f-3-this.labelOffset):(lA="start",a=f+3+this.labelOffset):b=isNegative?g+7+this.labelOffset:g-10-this.labelOffset);break;case "middle":"column"==this.type&&(lC=!0,isRotated?a-=(a-f)/2+this.labelOffset-3:b-=(b-g)/2+this.labelOffset-3)}"auto"!=this.labelAnchor&&(lA=this.labelAnchor);c.attr({"text-anchor":lA});
this.labelRotation&&c.rotate(this.labelRotation);c.translate(a,b);lBB=c.getBBox();e&&lC&&(lBB.height>graphDataItem.columnHeight||lBB.width>graphDataItem.columnWidth)&&(c.remove(),c=!1);if(c&&"serial"==this.chart.type)if(isRotated){if(0>b||b>this.height)c.remove(),c=!1}else if(0>a||a>this.width)c.remove(),c=!1;return c},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=
this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,d=this.data,e=this.chart.container,f=this.valueAxis,g=this.type,h=this.columnWidthReal,k=this.showBulletsAt;isNaN(this.columnWidth)||(h=this.columnWidth);isNaN(h)&&(h=.8);var l=this.useNegativeColorIfDown,m=this.width,n=this.height,p=this.y,q=this.rotate,r=this.columnCount,t=AmCharts.toCoordinate(this.cornerRadiusTop,h/2),w=this.connect,v=[],s=[],u,x,F,B,z=this.chart.graphs.length,I,E=this.dx/this.tcc,H=this.dy/this.tcc,V=f.stackType,
T=this.start,fa=this.end,aa=this.scrollbar,ga=this.categoryAxis,Na=this.baseCoord,ma=this.negativeBase,ba=this.columnIndex,O=this.lineThickness,X=this.lineAlpha,na=this.lineColorR,$=this.dashLength,W=this.set,Y,ja=this.getGradRotation(),G=this.chart.columnSpacing,A=ga.cellWidth,ka=(A*h-r)/r;G>ka&&(G=ka);var S,y,Z,eb=n+1,fb=m+1,Wa=0,gb=0,hb,ib,Xa,Ya,jb=this.fillColorsR,Da=this.negativeFillColors,wa=this.negativeLineColor,Oa=this.fillAlphas,Pa=this.negativeFillAlphas;"object"==typeof Oa&&(Oa=Oa[0]);
"object"==typeof Pa&&(Pa=Pa[0]);var Za=f.getCoordinate(f.min);f.logarithmic&&(Za=f.getCoordinate(f.minReal));this.minCoord=Za;this.resetBullet&&(this.bullet="none");if(!(aa||"line"!=g&&"smoothedLine"!=g&&"step"!=g||(1==d.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Da&&void 0==wa||l))){var Ja=ma;Ja>f.max&&(Ja=f.max);Ja<f.min&&(Ja=f.min);f.logarithmic&&(Ja=f.minReal);var Aa=f.getCoordinate(Ja),Cb=f.getCoordinate(f.max);q?(eb=n,fb=Math.abs(Cb-Aa),hb=n,ib=Math.abs(Za-
Aa),Ya=gb=0,f.reversed?(Wa=0,Xa=Aa):(Wa=Aa,Xa=0)):(fb=m,eb=Math.abs(Cb-Aa),ib=m,hb=Math.abs(Za-Aa),Xa=Wa=0,f.reversed?(Ya=p,gb=Aa):Ya=Aa+1)}var Ba=Math.round;this.pmx=Ba(Wa);this.pmy=Ba(gb);this.pmh=Ba(eb);this.pmw=Ba(fb);this.nmx=Ba(Xa);this.nmy=Ba(Ya);this.nmh=Ba(hb);this.nmw=Ba(ib);AmCharts.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(r=1);h="column"==g?(A*h-G*(r-1))/r:A*h;1>h&&(h=1);var Db=this.fixedColumnWidth;isNaN(Db)||(h=Db);var J;if("line"==g||"step"==g||"smoothedLine"==
g){if(0<T){for(J=T-1;-1<J;J--)if(S=d[J],y=S.axes[f.id].graphs[b],Z=y.values.value,!isNaN(Z)){T=J;break}if(this.lineColorField)for(J=T;-1<J;J--)if(S=d[J],y=S.axes[f.id].graphs[b],y.lineColor){this.bulletColorSwitched=this.lineColorSwitched=y.lineColor;break}if(this.fillColorsField)for(J=T;-1<J;J--)if(S=d[J],y=S.axes[f.id].graphs[b],y.fillColors){this.fillColorsSwitched=y.fillColors;break}if(this.dashLengthField)for(J=T;-1<J;J--)if(S=d[J],y=S.axes[f.id].graphs[b],!isNaN(y.dashLength)){this.dashLengthSwitched=
y.dashLength;break}}if(fa<d.length-1)for(J=fa+1;J<d.length;J++)if(S=d[J],y=S.axes[f.id].graphs[b],Z=y.values.value,!isNaN(Z)){fa=J;break}}fa<d.length-1&&fa++;var P=[],Q=[],Ea=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==V||"100%"==V||this.fillToGraph)Ea=!0;var Eb=this.noStepRisers,$a=-1E3,ab=-1E3,bb=this.minDistance,Fa=!0,Qa=!1;for(J=T;J<=fa;J++){S=d[J];y=S.axes[f.id].graphs[b];y.index=J;var Ra,Ga=NaN;if(l&&void 0==this.openField)for(var kb=J+1;kb<d.length&&(!d[kb]||
!(Ra=d[J+1].axes[f.id].graphs[b])||!Ra.values||(Ga=Ra.values.value,isNaN(Ga)));kb++);var R,N,L,ca,ha=NaN,D=NaN,C=NaN,M=NaN,K=NaN,Ha=NaN,xa=NaN,Ia=NaN,ya=NaN,sa=NaN,ta=NaN,da=NaN,ea=NaN,U=NaN,lb=NaN,mb=NaN,ia=NaN,qa=void 0,Ca=jb,Ka=Oa,ua=na,oa,ra,nb=this.proCandlesticks,Sa=this.pattern;void 0!=y.pattern&&(Sa=y.pattern);void 0!=y.color&&(Ca=y.color);y.fillColors&&(Ca=y.fillColors);isNaN(y.alpha)||(Ka=y.alpha);isNaN(y.dashLength)||($=y.dashLength);var va=y.values;f.recalculateToPercents&&(va=y.percents);
if(va){U=this.stackable&&"none"!=V&&"3d"!=V?va.close:va.value;if("candlestick"==g||"ohlc"==g)U=va.close,mb=va.low,xa=f.getCoordinate(mb),lb=va.high,ya=f.getCoordinate(lb);ia=va.open;C=f.getCoordinate(U);isNaN(ia)||(K=f.getCoordinate(ia),l&&(Ga=ia,ia=K=NaN));l&&(void 0==this.openField?Ra&&(Ra.isNegative=Ga<U?!0:!1,isNaN(Ga)&&(y.isNegative=!Fa)):y.isNegative=Ga>U?!0:!1);if(!aa)switch(this.showBalloonAt){case "close":y.y=C;break;case "open":y.y=K;break;case "high":y.y=ya;break;case "low":y.y=xa}var ha=
S.x[ga.id],La=this.periodSpan-1,la=Math.floor(A/2)+Math.floor(La*A/2),za=la,cb=0;"left"==this.stepDirection&&(cb=(2*A+La*A)/2,ha-=cb);"center"==this.stepDirection&&(cb=A/2,ha-=cb);"start"==this.pointPosition&&(ha-=A/2+Math.floor(La*A/2),la=0,za=Math.floor(A)+Math.floor(La*A));"end"==this.pointPosition&&(ha+=A/2+Math.floor(La*A/2),la=Math.floor(A)+Math.floor(La*A),za=0);if(Eb){var ob=this.columnWidth;isNaN(ob)||(la*=ob,za*=ob)}aa||(y.x=ha);-1E5>ha&&(ha=-1E5);ha>m+1E5&&(ha=m+1E5);q?(D=C,M=K,K=C=ha,
isNaN(ia)&&!this.fillToGraph&&(M=Na),Ha=xa,Ia=ya):(M=D=ha,isNaN(ia)&&!this.fillToGraph&&(K=Na));if(!nb&&U<ia||nb&&U<Y)y.isNegative=!0,Da&&(Ca=Da),Pa&&(Ka=Pa),void 0!=wa&&(ua=wa);Qa=!1;isNaN(U)||(l?U>Ga?(Fa&&(Qa=!0),Fa=!1):(Fa||(Qa=!0),Fa=!0):y.isNegative=U<ma?!0:!1,Y=U);switch(g){case "line":if(isNaN(U))w||(this.drawLineGraph(v,s,P,Q),v=[],s=[],P=[],Q=[]);else{if(Math.abs(D-$a)>=bb||Math.abs(C-ab)>=bb)v.push(D),s.push(C),$a=D,ab=C;sa=D;ta=C;da=D;ea=C;!Ea||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K));
if(Qa||void 0!=y.lineColor||void 0!=y.fillColors||!isNaN(y.dashLength))this.drawLineGraph(v,s,P,Q),v=[D],s=[C],P=[],Q=[],!Ea||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K)),l?Fa?(this.lineColorSwitched=na,this.fillColorsSwitched=jb):(this.lineColorSwitched=wa,this.fillColorsSwitched=Da):(this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors),this.dashLengthSwitched=y.dashLength;y.gap&&(this.drawLineGraph(v,s,P,Q),v=[],s=[],P=[],Q=[])}break;case "smoothedLine":if(isNaN(U))w||(this.drawSmoothedGraph(v,
s,P,Q),v=[],s=[],P=[],Q=[]);else{if(Math.abs(D-$a)>=bb||Math.abs(C-ab)>=bb)v.push(D),s.push(C),$a=D,ab=C;sa=D;ta=C;da=D;ea=C;!Ea||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K));void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawSmoothedGraph(v,s,P,Q),v=[D],s=[C],P=[],Q=[],!Ea||isNaN(K)||isNaN(M)||(P.push(M),Q.push(K)),this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors,this.dashLengthSwitched=y.dashLength);y.gap&&(this.drawSmoothedGraph(v,s,P,Q),v=[],s=[],P=[],
Q=[])}break;case "step":if(!isNaN(U)){q?(isNaN(u)||(v.push(u),s.push(C-la)),s.push(C-la),v.push(D),s.push(C+za),v.push(D),!Ea||isNaN(K)||isNaN(M)||(P.push(F),Q.push(K-la),P.push(M),Q.push(K-la),P.push(M),Q.push(K+za))):(isNaN(x)||(s.push(x),v.push(u),s.push(x),v.push(D-la)),v.push(D-la),s.push(C),v.push(D+za),s.push(C),!Ea||isNaN(K)||isNaN(M)||(P.push(M-la),Q.push(B),P.push(M-la),Q.push(K),P.push(M+za),Q.push(K)));u=D;x=C;F=M;B=K;sa=D;ta=C;da=D;ea=C;if(Qa||void 0!=y.lineColor||void 0!=y.fillColors||
!isNaN(y.dashLength)){var Rb=v[v.length-2],Sb=s[s.length-2];v.pop();s.pop();this.drawLineGraph(v,s,P,Q);v=[Rb];s=[Sb];P=[];Q=[];this.lineColorSwitched=y.lineColor;this.fillColorsSwitched=y.fillColors;this.dashLengthSwitched=y.dashLength;l&&(Fa?(this.lineColorSwitched=na,this.fillColorsSwitched=jb):(this.lineColorSwitched=wa,this.fillColorsSwitched=Da))}if(Eb||y.gap)u=x=NaN,this.drawLineGraph(v,s,P,Q),v=[],s=[],P=[],Q=[]}else if(!w){if(1>=this.periodSpan||1<this.periodSpan&&D-u>la+za)u=x=NaN;this.drawLineGraph(v,
s,P,Q);v=[];s=[];P=[];Q=[]}break;case "column":oa=ua;void 0!=y.lineColor&&(oa=y.lineColor);var Fb=this.topRadius;if(!isNaN(U)){l||(y.isNegative=U<ma?!0:!1);y.isNegative&&(Da&&(Ca=Da),void 0!=wa&&(oa=wa));var Gb=f.min,Hb=f.max;if(!(U<Gb&&ia<Gb||U>Hb&&ia>Hb)){var pa;if(q){"3d"==V?(N=C-(r/2-this.depthCount+1)*(h+G)+G/2+H*ba,R=M+E*ba,pa=ba):(N=Math.floor(C-(r/2-ba)*(h+G)+G/2),R=M,pa=0);L=h;sa=D;ta=N+h/2;isNaN(M)||M>D&&!y.isNegative&&(sa=M);da=D;ea=N+h/2;N+L>n+pa*H&&(L=n-N+pa*H);N<pa*H&&(L+=N,N=pa*H);
ca=D-M;var Tb=R;R=AmCharts.fitToBounds(R,0,m);ca+=Tb-R;ca=AmCharts.fitToBounds(ca,-R,m-R+E*ba);N<n&&0<L&&(qa=new AmCharts.Cuboid(e,ca,L,E-a.d3x,H-a.d3y,Ca,Ka,O,oa,X,ja,t,q,$,Sa,Fb),y.columnWidth=Math.abs(ca),y.columnHeight=Math.abs(L))}else{"3d"==V?(R=D-(r/2-this.depthCount+1)*(h+G)+G/2+E*ba,N=K+H*ba,pa=ba):(R=D-(r/2-ba)*(h+G)+G/2,N=K,pa=0);L=h;sa=R+h/2;ta=C;isNaN(K)||K<C&&!y.isNegative&&(ta=K);da=R+h/2;ea=C;R+L>m+pa*E&&(L=m-R+pa*E);R<pa*E&&(L+=R-pa*E,R=pa*E);ca=C-K;var Ub=N;N=AmCharts.fitToBounds(N,
this.dy,n);ca+=Ub-N;ca=AmCharts.fitToBounds(ca,-N+H*ba,n-N);R<m+ba*E&&0<L&&(this.showOnAxis&&(N-=H/2),qa=new AmCharts.Cuboid(e,L,ca,E-a.d3x,H-a.d3y,Ca,Ka,O,oa,this.lineAlpha,ja,t,q,$,Sa,Fb),y.columnHeight=Math.abs(ca),y.columnWidth=Math.abs(L))}}if(qa&&(ra=qa.set,y.columnGraphics=ra,ra.translate(R,N),this.columnsSet.push(ra),(y.url||this.showHandOnHover)&&ra.setAttr("cursor","pointer"),!aa)){"none"==V&&(I=q?(this.end+1-J)*z-c:z*J+c);"3d"==V&&(q?(I=(this.end+1-J)*z-c-1E3*this.depthCount,sa+=E*this.columnIndex,
da+=E*this.columnIndex,y.y+=E*this.columnIndex):(I=(z-c)*(J+1)+1E3*this.depthCount,ta+=H*this.columnIndex,ea+=H*this.columnIndex,y.y+=H*this.columnIndex));if("regular"==V||"100%"==V)I=q?0<va.value?(this.end+1-J)*z+c:(this.end+1-J)*z-c:0<va.value?z*J+c:z*J-c;this.columnsArray.push({column:qa,depth:I});y.x=q?N+L/2:R+L/2;this.ownColumns.push(qa);this.animateColumns(qa,J,D,M,C,K);this.addListeners(ra,y)}}break;case "candlestick":if(!isNaN(ia)&&!isNaN(U)){var db,pb;oa=ua;void 0!=y.lineColor&&(oa=y.lineColor);
if(q){if(N=C-h/2,R=M,L=h,N+L>n&&(L=n-N),0>N&&(L+=N,N=0),N<n&&0<L){var qb,rb;U>ia?(qb=[D,Ia],rb=[M,Ha]):(qb=[M,Ia],rb=[D,Ha]);!isNaN(Ia)&&!isNaN(Ha)&&C<n&&0<C&&(db=AmCharts.line(e,qb,[C,C],oa,X,O),pb=AmCharts.line(e,rb,[C,C],oa,X,O));ca=D-M;qa=new AmCharts.Cuboid(e,ca,L,E,H,Ca,Oa,O,oa,X,ja,t,q,$,Sa)}}else if(R=D-h/2,N=K+O/2,L=h,R+L>m&&(L=m-R),0>R&&(L+=R,R=0),ca=C-K,R<m&&0<L){nb&&U>=ia&&(Ka=0);var qa=new AmCharts.Cuboid(e,L,ca,E,H,Ca,Ka,O,oa,X,ja,t,q,$,Sa),sb,tb;U>ia?(sb=[C,ya],tb=[K,xa]):(sb=[K,ya],
tb=[C,xa]);!isNaN(ya)&&!isNaN(xa)&&D<m&&0<D&&(db=AmCharts.line(e,[D,D],sb,oa,X,O),pb=AmCharts.line(e,[D,D],tb,oa,X,O))}qa&&(ra=qa.set,y.columnGraphics=ra,W.push(ra),ra.translate(R,N-O/2),(y.url||this.showHandOnHover)&&ra.setAttr("cursor","pointer"),db&&(W.push(db),W.push(pb)),sa=D,ta=C,q?(ea=C,da=D,"open"==k&&(da=M),"high"==k&&(da=Ia),"low"==k&&(da=Ha)):(ea=C,"open"==k&&(ea=K),"high"==k&&(ea=ya),"low"==k&&(ea=xa),da=D),aa||(y.x=q?N+L/2:R+L/2,this.animateColumns(qa,J,D,M,C,K),this.addListeners(ra,
y)))}break;case "ohlc":if(!(isNaN(ia)||isNaN(lb)||isNaN(mb)||isNaN(U))){U<ia&&(y.isNegative=!0,void 0!=wa&&(ua=wa));var ub,vb,wb;if(q){var xb=C-h/2,xb=AmCharts.fitToBounds(xb,0,n),Ib=AmCharts.fitToBounds(C,0,n),yb=C+h/2,yb=AmCharts.fitToBounds(yb,0,n);vb=AmCharts.line(e,[M,M],[xb,Ib],ua,X,O,$);0<C&&C<n&&(ub=AmCharts.line(e,[Ha,Ia],[C,C],ua,X,O,$));wb=AmCharts.line(e,[D,D],[Ib,yb],ua,X,O,$);ea=C;da=D;"open"==k&&(da=M);"high"==k&&(da=Ia);"low"==k&&(da=Ha)}else{var zb=D-h/2,zb=AmCharts.fitToBounds(zb,
0,m),Jb=AmCharts.fitToBounds(D,0,m),Ab=D+h/2,Ab=AmCharts.fitToBounds(Ab,0,m);vb=AmCharts.line(e,[zb,Jb],[K,K],ua,X,O,$);0<D&&D<m&&(ub=AmCharts.line(e,[D,D],[xa,ya],ua,X,O,$));wb=AmCharts.line(e,[Jb,Ab],[C,C],ua,X,O,$);ea=C;"open"==k&&(ea=K);"high"==k&&(ea=ya);"low"==k&&(ea=xa);da=D}W.push(vb);W.push(ub);W.push(wb);sa=D;ta=C}}if(!aa&&!isNaN(U)){var Kb=this.hideBulletsCount;if(this.end-this.start<=Kb||0===Kb){var Vb=this.createBullet(y,da,ea,J),Lb=this.labelText;if(Lb){var Bb=this.createLabel(y,da,
ea,Lb);(Bb=this.positionLabel(sa,ta,Bb,Vb,L,ca))&&this.allBullets.push(Bb)}if("regular"==V||"100%"==V){var Mb=f.totalText;if(Mb){var Ma=this.createLabel(y,0,0,Mb,f.totalTextColor);this.allBullets.push(Ma);var Nb=Ma.getBBox(),Ob=Nb.width,Pb=Nb.height,Ta,Ua,Qb=f.totals[J];Qb&&Qb.remove();var Va=0;"column"!=g&&(Va=bulletSize);q?(Ua=C,Ta=0>U?D-Ob/2-2-Va:D+Ob/2+3+Va):(Ta=D,Ua=0>U?C+Pb/2+Va:C-Pb/2-3-Va);Ma.translate(Ta,Ua);f.totals[J]=Ma;q?(0>Ua||Ua>n)&&Ma.remove():(0>Ta||Ta>m)&&Ma.remove()}}}}}}if("line"==
g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(v,s,P,Q):this.drawLineGraph(v,s,P,Q),aa||this.launchAnimation();this.bulletsHidden&&this.hideBullets()},animateColumns:function(a,b,c,d,e,f){var g=this;c=g.chart.startDuration;0<c&&!g.animationPlayed&&(g.seqAn?(a.set.hide(),g.animationArray.push(a),a=setTimeout(function(){g.animate.call(g)},c/(g.end-g.start+1)*(b-g.start)*1E3),g.timeOuts.push(a)):g.animate(a))},createLabel:function(a,b,c,d,e){var f=this.chart,g=a.labelColor;
g||(g=this.color);g||(g=f.color);e&&(g=e);e=this.fontSize;void 0===e&&(this.fontSize=e=f.fontSize);var h=this.labelFunction;d=f.formatString(d,a);d=AmCharts.cleanFromEmpty(d);h&&(d=h(a,d));a=AmCharts.text(this.container,d,g,f.fontFamily,e);a.node.style.pointerEvents="none";a.translate(b,c);this.bulletSet.push(a);return a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,
d){var e=this;if(1<a.length){var f=e.set,g=e.chart,h=e.container,k=h.set(),l=h.set();f.push(l);f.push(k);var m=e.lineAlpha,n=e.lineThickness,f=e.fillAlphas,p=e.lineColorR,q=e.negativeLineAlpha;isNaN(q)&&(q=m);var r=e.lineColorSwitched;r&&(p=r);var r=e.fillColorsR,t=e.fillColorsSwitched;t&&(r=t);var w=e.dashLength;(t=e.dashLengthSwitched)&&(w=t);var t=e.negativeLineColor,v=e.negativeFillColors,s=e.negativeFillAlphas,u=e.baseCoord;0!==e.negativeBase&&(u=e.valueAxis.getCoordinate(e.negativeBase));m=
AmCharts.line(h,a,b,p,m,n,w,!1,!0);k.push(m);k.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});void 0===t||e.useNegativeColorIfDown||(n=AmCharts.line(h,a,b,t,q,n,w,!1,!0),l.push(n));if(0<f||0<s)if(n=a.join(";").split(";"),q=b.join(";").split(";"),m=g.type,"serial"==m?0<c.length?(c.reverse(),d.reverse(),n=a.concat(c),q=b.concat(d)):e.rotate?(q.push(q[q.length-1]),n.push(u),
q.push(q[0]),n.push(u),q.push(q[0]),n.push(n[0])):(n.push(n[n.length-1]),q.push(u),n.push(n[0]),q.push(u),n.push(a[0]),q.push(q[0])):"xy"==m&&(b=e.fillToAxis)&&(AmCharts.isString(b)&&(b=g.getValueAxisById(b)),"H"==b.orientation?(u="top"==b.position?0:b.viH,n.push(n[n.length-1]),q.push(u),n.push(n[0]),q.push(u),n.push(a[0]),q.push(q[0])):(u="left"==b.position?0:b.viW,q.push(q[q.length-1]),n.push(u),q.push(q[0]),n.push(u),q.push(q[0]),n.push(n[0]))),a=e.gradientRotation,0<f&&(g=AmCharts.polygon(h,n,
q,r,f,1,"#000",0,a),g.pattern(e.pattern),k.push(g)),v||void 0!==t)isNaN(s)&&(s=f),v||(v=t),h=AmCharts.polygon(h,n,q,v,s,1,"#000",0,a),h.pattern(e.pattern),l.push(h),l.click(function(a){e.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){e.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){e.handleGraphEvent(a,"rollOutGraph")});e.applyMask(l,k)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,
b,c,d){if(1<a.length){var e=this.set,f=this.container,g=f.set(),h=f.set();e.push(h);e.push(g);var k=this.lineAlpha,l=this.lineThickness,e=this.dashLength,m=this.fillAlphas,n=this.lineColorR,p=this.fillColorsR,q=this.negativeLineColor,r=this.negativeFillColors,t=this.negativeFillAlphas,w=this.baseCoord,v=this.lineColorSwitched;v&&(n=v);(v=this.fillColorsSwitched)&&(p=v);v=this.negativeLineAlpha;isNaN(v)&&(v=k);k=new AmCharts.Bezier(f,a,b,n,k,l,p,0,e);g.push(k.path);void 0!==q&&(l=new AmCharts.Bezier(f,
a,b,q,v,l,p,0,e),h.push(l.path));0<m&&(k=a.join(";").split(";"),n=b.join(";").split(";"),l="",0<c.length?(c.push("M"),d.push("M"),c.reverse(),d.reverse(),k=a.concat(c),n=b.concat(d)):(this.rotate?(l+=" L"+w+","+b[b.length-1],l+=" L"+w+","+b[0]):(l+=" L"+a[a.length-1]+","+w,l+=" L"+a[0]+","+w),l+=" L"+a[0]+","+b[0]),c=new AmCharts.Bezier(f,k,n,NaN,0,0,p,m,e,l),c.path.pattern(this.pattern),g.push(c.path),r||void 0!==q)&&(t||(t=m),r||(r=q),a=new AmCharts.Bezier(f,a,b,NaN,0,0,r,t,e,l),a.path.pattern(this.pattern),
h.push(a.path));this.applyMask(h,g)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,d=a.bulletSet;AmCharts.VML||(c.attr({opacity:a.startAlpha}),d.attr({opacity:a.startAlpha}));c.hide();d.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,d=this.x,e=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;
b&&(this.rotate?(b.translate(-1E3,e),c.translate(-1E3,e)):(b.translate(d,-1E3),c.translate(d,-1E3)),b.animate({opacity:1,translate:d+","+e},f,a),c.animate({opacity:1,translate:d+","+e},f,a))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=AmCharts[AmCharts.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=
this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c,d){if(!isNaN(b)&&!isNaN(c)){d=this.container;var e=this.bulletOffset,f=this.bulletSize;isNaN(a.bulletSize)||(f=a.bulletSize);var g=a.values.value,h=this.maxValue,k=this.minValue,l=this.maxBulletSize,m=this.minBulletSize;
isNaN(h)||(isNaN(g)||(f=(g-k)/(h-k)*(l-m)+m),k==h&&(f=l));h=f;this.bulletAxis&&(f=a.values.error,isNaN(f)||(g=f),f=this.bulletAxis.stepWidth*g);f<this.minBulletSize&&(f=this.minBulletSize);this.rotate?b=a.isNegative?b-e:b+e:c=a.isNegative?c+e:c-e;var n,m=this.bulletColorR;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(m=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(m=this.bulletColorNegative);void 0!==a.color&&(m=a.color);var p;"xy"==this.chart.type&&
this.valueField&&(p=this.pattern,a.pattern&&(p=a.pattern));e=this.bullet;a.bullet&&(e=a.bullet);var g=this.bulletBorderThickness,k=this.bulletBorderColorR,l=this.bulletBorderAlpha,q=this.bulletAlpha;k||(k=m);this.useLineColorForBulletBorder&&(k=this.lineColorR);var r=a.alpha;isNaN(r)||(q=r);if("none"!=this.bullet||a.bullet)n=AmCharts.bullet(d,e,f,m,q,g,k,l,h,0,p);if(this.customBullet||a.customBullet)p=this.customBullet,a.customBullet&&(p=a.customBullet),p&&(n&&n.remove(),"function"==typeof p?(n=new p,
n.chart=this.chart,a.bulletConfig&&(n.availableSpace=c,n.graph=this,n.graphDataItem=a,n.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,n.bulletConfig=a.bulletConfig),n.write(d),n=n.set):(this.chart.path&&(p=this.chart.path+p),n=d.set(),d=d.image(p,0,0,f,f),n.push(d),this.centerCustomBullets&&d.translate(-f/2,-f/2)));n&&((a.url||this.showHandOnHover)&&n.setAttr("cursor","pointer"),"serial"==this.chart.type&&(0>b-0||b-0>this.width||c<-f/2||c-0>this.height)&&(n.remove(),n=null),n&&(this.bulletSet.push(n),
n.translate(b,c),this.addListeners(n,a),this.allBullets.push(n)),a.bx=b,a.by=c);n?(n.size=f||0,a.bulletGraphics=n):n={size:0};n.graphDataItem=a;return n}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,
a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},handleRollOver:function(a,b){if(a){var c=this.chart,d={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",d);c.fire("rollOverGraphItem",d);clearTimeout(c.hoverInt);d=this.showBalloon;c.chartCursor&&
"serial"==c.type&&(d=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(d=!0));if(d){var d=c.formatString(this.balloonText,a,!0),e=this.balloonFunction;e&&(d=e(a,a.graph));d=AmCharts.cleanFromEmpty(d);e=c.getBalloonColor(this,a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);c.showBalloon(d,e,!0,f+c.marginLeftReal,g+c.marginTopReal)}}this.handleGraphEvent(b,"rollOverGraph")},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c=
{type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}this.handleGraphEvent(b,"rollOutGraph")},handleClick:function(a,b){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);AmCharts.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")},handleGraphEvent:function(a,
b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(b,c);this.chart.fire(b,c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);
this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var d=b[c].set;d&&d.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}});AmCharts.ChartCursor=AmCharts.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","draw","selected","moved");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition=
"middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container;a.rotate=b.rotate;a.container=c;c=c.set();c.translate(a.x,a.y);a.set=c;b.cursorSet.push(c);c=new AmCharts.AmBalloon;c.chart=b;a.categoryBalloon=c;AmCharts.copyProperties(b.balloon,
c);c.cornerRadius=0;c.shadowAlpha=0;c.borderThickness=1;c.borderAlpha=1;c.showBullet=!1;var d=a.categoryBalloonColor;void 0===d&&(d=a.cursorColor);c.fillColor=d;c.fillAlpha=a.categoryBalloonAlpha;c.borderColor=d;c.color=a.color;d=a.valueLineAxis;AmCharts.isString(d)&&(d=b.getValueAxisById(d));d||(d=b.valueAxes[0]);a.valueLineAxis=d;a.valueLineBalloonEnabled&&(d=new AmCharts.AmBalloon,a.vaBalloon=d,AmCharts.copyProperties(c,d),d.animationDuration=0,a.rotate||(d.pointerOrientation="H"));a.rotate&&(c.pointerOrientation=
"H");a.extraWidth=0;a.prevX=[];a.prevY=[];a.prevTX=[];a.prevTY=[];if(a.valueBalloonsEnabled)for(c=0;c<b.graphs.length;c++)d=new AmCharts.AmBalloon,d.chart=b,AmCharts.copyProperties(b.balloon,d),b.graphs[c].valueBalloon=d;"cursor"==a.type?a.createCursor():a.createCrosshair();a.interval=setInterval(function(){a.detectMovement.call(a)},40)},updateData:function(){var a=this.chart;this.data=a.chartData;this.firstTime=a.firstTime;this.lastTime=a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,
c=a.categoryAxis,d=this.categoryBalloon,e,f,g,h;g=a.dx;h=a.dy;var k=this.width,l=this.height,a=a.rotate;d.pointerWidth=c.tickLength;a?(e=[0,k,k+g],f=[0,0,h],g=[g,0,0],h=[h,0,l]):(e=[g,0,0],f=[h,0,l],g=[0,k,k+g],h=[0,0,h]);this.line=e=AmCharts.line(this.container,e,f,this.cursorColor,b,1);(f=this.fullRectSet)?(f.push(e),f.translate(this.x,this.y)):this.set.push(e);this.valueLineEnabled&&(e=this.valueLineAlpha,isNaN(e)||(b=e),this.vLine=b=AmCharts.line(this.container,g,h,this.cursorColor,b,1),this.set.push(b));
this.setBalloonBounds(d,c,a);(c=this.vaBalloon)&&this.setBalloonBounds(c,this.valueLineAxis,!a);this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,c=AmCharts.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=AmCharts.line(b,[0,this.width],[0,0],this.cursorColor,a,1);this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},detectMovement:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;-.5<b&&b<this.width+
1&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=!0,(this.valueLineEnabled||this.valueLineBalloonEnabled)&&this.updateVLine(b,c),this.setPosition()):this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},updateVLine:function(a,b){var c=this.vLine,d=this.vaBalloon;if((c||d)&&!this.panning&&!this.drawing){c&&c.show();var e=this.valueLineAxis,
f,g=this.rotate;g?(c&&c.translate(a,0),e&&(f=e.coordinateToValue(a)),c=a):(c&&c.translate(0,b),e&&(f=e.coordinateToValue(b)),c=b-1);if(d&&!isNaN(f)&&this.prevLineValue!=f){var h=e.formatValue(f,!0);d&&(this.setBalloonPosition(d,e,c,!g),d.showBalloon(h))}this.prevLineValue=f}},getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x-1,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,
b=a.mouseX-this.x,c=a.mouseY-this.y,d=this.vLine,e=this.hLine,b=AmCharts.fitToBounds(b,0,this.width),c=AmCharts.fitToBounds(c,0,this.height);0<this.cursorAlpha&&(d.show(),e.show(),d.translate(b,0),e.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=NaN),this.updateSelectionSize(b,c));this.fireMoved();a.mouseIsOver||this.zooming||this.hideCursor()},fireMoved:function(){var a=this.chart,b={type:"moved",target:this};b.chart=a;b.zooming=this.zooming;b.x=a.mouseX-this.x;b.y=
a.mouseY-this.y;this.fire("moved",b)},updateSelectionSize:function(a,b){AmCharts.remove(this.selection);var c=this.selectionPosX,d=this.selectionPosY,e=0,f=0,g=this.width,h=this.height;isNaN(a)||(c>a&&(e=a,g=c-a),c<a&&(e=c,g=a-c),c==a&&(e=a,g=0),g+=this.extraWidth,e-=this.extraWidth/2);isNaN(b)||(d>b&&(f=b,h=d-b),d<b&&(f=d,h=b-d),d==b&&(f=b,h=0),h+=this.extraWidth,f-=this.extraWidth/2);0<g&&0<h&&(c=AmCharts.rect(this.container,g,h,this.cursorColor,this.selectionAlpha),c.translate(e+this.x,f+this.y),
this.selection=c)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,c=this.y,d=this.height+c;a.sort(this.compareY);var e;for(e=0;e<a.length;e++){var f=a[e].balloon;f.setBounds(b,c,b+this.width,d);f.prevX=this.prevX[e];f.prevY=this.prevY[e];f.prevTX=this.prevTX[e];f.prevTY=this.prevTY[e];f.draw();d=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,d,e,f=a.length;for(e=0;e<f;e++){var g=
a[e].balloon;b=g.bottom;var h=g.bottom-g.yPos,k=f-e-1;0<e&&b-h<d+3&&(g.setBounds(c,d+3,c+this.width,d+h+3),g.prevX=this.prevX[k],g.prevY=this.prevY[k],g.prevTX=this.prevTX[k],g.prevTY=this.prevTY[k],g.draw());g.set&&g.set.show();this.prevX[k]=g.prevX;this.prevY[k]=g.prevY;this.prevTX[k]=g.prevTX;this.prevTY[k]=g.prevTY;d=g.bottom}},showBullets:function(){AmCharts.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=
0;c<b.length;c++){var d=b[c];if(!d.hidden&&d.balloonText){var e=this.data[this.index].axes[d.valueAxis.id].graphs[d.id],f=e.y;if(!isNaN(f)){var g,h;g=e.x;this.rotate?(h=f,f=g):h=g;d=AmCharts.circle(a,this.bulletSize/2,this.chart.getBalloonColor(d,e,!0),d.cursorBulletAlpha);d.translate(h,f);this.allBullets.push(d)}}}},destroy:function(){this.clear();AmCharts.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();(a=this.vaBalloon)&&a.destroy();this.destroyValueBalloons();
AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},zoom:function(a,b,c,d){var e=this.chart;this.destroyValueBalloons();this.zooming=!1;var f;this.rotate?this.selectionPosY=f=e.mouseY:this.selectionPosX=f=e.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=d;this.zoomed=!0;d=e.categoryAxis;e=this.rotate;b=this.width;c=this.height;a=d.stepWidth;this.fullWidth&&
(f=1,d.parseDates&&!d.equalSpacing&&(f=d.minDuration()),e?this.extraWidth=c=a*f:(this.extraWidth=b=a*f,this.categoryBalloon.minWidth=b),this.line&&this.line.remove(),this.line=AmCharts.rect(this.container,b,c,this.cursorColor,this.cursorAlpha,0),this.fullRectSet&&this.fullRectSet.push(this.line));this.stepWidth=a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===
a&&(a=!0);this.hideObj(this.set);this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.vaBalloon);this.hideObj(this.allBullets);this.destroyValueBalloons();this.selectWithoutZooming||AmCharts.remove(this.selection);this.previousIndex=NaN;a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this});this.drawing||this.chart.setMouseCursor("auto");this.normalizeBulletSize()},setPosition:function(a,b,c){void 0===
b&&(b=!0);if("cursor"==this.type){if(this.tempPosition=NaN,AmCharts.ifArray(this.data))isNaN(a)&&(a=this.getMousePosition()),(a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)&&("mouse"==this.cursorPosition&&(this.tempPosition=a),isNaN(c)&&(c=this.chart.categoryAxis.xToIndex(a)),c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)&&(this.updateCursor(c,b),this.zoomed=!1),this.previousMousePosition=a}else this.updateCrosshair()},normalizeBulletSize:function(){var a=
this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],d=c.bulletGraphics;d&&(d.translate(c.bx,c.by,1),c=c.graph,isNaN(this.graphBulletAlpha)||(d.setAttr("fill-opacity",c.bulletAlpha),d.setAttr("stroke-opacity",c.bulletBorderAlpha)))}},updateCursor:function(a,b){var c=this.chart,d=this.fullWidth,e=c.mouseX-this.x,f=c.mouseY-this.y;this.drawingNow&&(AmCharts.remove(this.drawingLine),this.drawingLine=AmCharts.line(this.container,[this.x+this.drawStartX,this.x+e],[this.y+this.drawStartY,this.y+
f],this.cursorColor,1,1));if(this.enabled){void 0===b&&(b=!0);this.index=a+=this.adjustment;var g=c.categoryAxis,h=c.dx,k=c.dy,l=this.x+1,m=this.y+1,n=this.width,p=this.height,q=this.data[a];this.fireMoved();if(q){var r=q.x[g.id],t=c.rotate,w=this.stepWidth,v=this.categoryBalloon,s=this.firstTime,u=this.lastTime,x=this.cursorPosition,F=this.zooming,B=this.panning,z=c.graphs;if(c.mouseIsOver||F||B||this.forceShow)if(this.forceShow=!1,B){var h=this.panClickPos,c=this.panClickEndTime,F=this.panClickStartTime,
I=this.panClickEnd,l=this.panClickStart,e=(t?h-f:h-e)/w;if(!g.parseDates||g.equalSpacing)e=Math.round(e);0!==e&&(h={type:"zoomed",target:this},h.chart=this.chart,g.parseDates&&!g.equalSpacing?(c+e>u&&(e=u-c),F+e<s&&(e=s-F),h.start=Math.round(F+e),h.end=Math.round(c+e),this.fire(h.type,h)):I+e>=this.data.length||0>l+e||(h.start=l+e,h.end=I+e,this.fire(h.type,h)))}else{"start"==x?r-=g.cellWidth/2:"mouse"==x&&(c.mouseIsOver?r=t?f-2:e-2:isNaN(this.tempPosition)||(r=this.tempPosition-2));if(t){if(0>r)if(F)r=
0;else{this.hideCursor();return}if(r>p+1)if(F)r=p+1;else{this.hideCursor();return}}else{if(0>r)if(F)r=0;else{this.hideCursor();return}if(r>n)if(F)r=n;else{this.hideCursor();return}}if(0<this.cursorAlpha){var E=this.line;t?(s=0,u=r+k,d&&(u-=g.cellWidth/2)):(s=r,u=0,d&&(s-=g.cellWidth/2));w=this.animationDuration;0<w&&!this.zooming?isNaN(this.previousX)?E.translate(s,u):(E.translate(this.previousX,this.previousY),E.animate({translate:s+","+u},w,"easeOutSine")):E.translate(s,u);this.previousX=s;this.previousY=
u;E.show()}this.linePos=t?r+k:r;F&&(d&&E.hide(),t?this.updateSelectionSize(NaN,r):this.updateSelectionSize(r,NaN));w=!0;F&&(w=!1);this.categoryBalloonEnabled&&w?(this.setBalloonPosition(v,g,r,t),(s=this.categoryBalloonFunction)?v.showBalloon(s(q.category)):g.parseDates?(g=AmCharts.formatDate(q.category,this.categoryBalloonDateFormat,c),-1!=g.indexOf("fff")&&(g=AmCharts.formatMilliseconds(g,q.category)),v.showBalloon(g)):v.showBalloon(AmCharts.fixNewLines(q.category))):v.hide();z&&this.bulletsEnabled&&
this.showBullets();if(this.oneBalloonOnly){r=Infinity;for(g=0;g<z.length;g++)s=z[g],s.showBalloon&&!s.hidden&&s.balloonText&&(u=q.axes[s.valueAxis.id].graphs[s.id],v=u.y,isNaN(v)||(t?Math.abs(e-v)<r&&(r=Math.abs(e-v),I=s):Math.abs(f-v)<r&&(r=Math.abs(f-v),I=s)));this.mostCloseGraph&&(I=this.mostCloseGraph)}if(a!=this.previousIndex||I!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),this.resizedBullets=[],z&&this.valueBalloonsEnabled&&w&&c.balloon.enabled){this.valueBalloons=
w=[];for(g=0;g<z.length;g++)if(s=z[g],v=NaN,(!this.oneBalloonOnly||s==I)&&s.showBalloon&&!s.hidden&&s.balloonText&&("step"==s.type&&"left"==s.stepDirection&&(q=this.data[a+1]),q)){if(u=q.axes[s.valueAxis.id].graphs[s.id])v=u.y;if(this.showNextAvailable&&isNaN(v)&&a+1<this.data.length)for(r=a+1;r<this.data.length;r++)if(d=this.data[r])if(u=d.axes[s.valueAxis.id].graphs[s.id],v=u.y,!isNaN(v))break;if(!isNaN(v)){d=u.x;k=!0;if(t){if(r=v,0>d||d>p)k=!1}else if(r=d,d=v,0>r||r>n+h+1)k=!1;k&&(k=this.graphBulletSize,
E=this.graphBulletAlpha,1==k&&isNaN(E)||!AmCharts.isModern||!(x=u.bulletGraphics)||(x.getBBox(),x.translate(u.bx,u.by,k),this.resizedBullets.push(u),isNaN(E)||(x.setAttr("fill-opacity",E),x.setAttr("stroke-opacity",E))),k=s.valueBalloon,E=c.getBalloonColor(s,u),k.setBounds(l,m,l+n,m+p),k.pointerOrientation="H",x=this.balloonPointerOrientation,"vertical"==x&&(k.pointerOrientation="V"),"horizontal"==x&&(k.pointerOrientation="H"),k.changeColor(E),void 0!==s.balloonAlpha&&(k.fillAlpha=s.balloonAlpha),
void 0!==s.balloonTextColor&&(k.color=s.balloonTextColor),k.setPosition(r+l,d+m),r=c.formatString(s.balloonText,u,!0),(d=s.balloonFunction)&&(r=d(u,s).toString()),""!==r&&(t?k.showBalloon(r):(k.text=r,k.show=!0),w.push({yy:v,balloon:k})),!t&&k.set&&(k.set.hide(),s=k.textDiv)&&(s.style.visibility="hidden"))}}this.avoidBalloonOverlapping&&this.arrangeBalloons()}b?(h={type:"changed"},h.index=a,h.chart=this.chart,h.zooming=F,h.mostCloseGraph=I,h.position=t?f:e,h.target=this,c.fire("changed",h),this.fire("changed",
h),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=I}}}else this.hideCursor()},setBalloonPosition:function(a,b,c,d){var e=b.position,f=b.inside;b=b.axisThickness;var g=this.chart,h=g.dx,g=g.dy,k=this.x,l=this.y,m=this.width,n=this.height;d?(f&&("right"==e?a.setBounds(k,l+g,k+m+h,l+c+g):a.setBounds(k,l+g,k+m+h,l+c)),"right"==e?f?a.setPosition(k+m+h,l+c+g):a.setPosition(k+m+h+b,l+c+g):f?a.setPosition(k,l+c):a.setPosition(k-
b,l+c)):"top"==e?f?a.setPosition(k+c+h,l+g):a.setPosition(k+c+h,l+g-b+1):f?a.setPosition(k+c,l+n):a.setPosition(k+c,l+n+b-1)},setBalloonBounds:function(a,b,c){var d=b.position,e=b.inside,f=b.axisThickness,g=b.tickLength,h=this.chart,k=h.dx,h=h.dy,l=this.x,m=this.y,n=this.width,p=this.height;c?(e&&(a.pointerWidth=0),"right"==d?e?a.setBounds(l,m+h,l+n+k,m+p+h):a.setBounds(l+n+k+f,m+h,l+n+1E3,m+p+h):e?a.setBounds(l,m,n+l,p+m):a.setBounds(-1E3,-1E3,l-g-f,m+p+15)):(a.maxWidth=n,b.parseDates&&(g=0,a.pointerWidth=
0),"top"==d?e?a.setBounds(l+k,m+h,n+k+l,p+m):a.setBounds(l+k,-1E3,n+k+l,m+h-g-f):e?a.setBounds(l,m,n+l,p+m-g):a.setBounds(l,m+p+g+f-1,l+n,m+p+g+f))},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();else{this.index=void 0;var a={type:"changed",index:void 0,target:this};
a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var d=a.mouseX-this.x,e=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;AmCharts.remove(this.drawingLine);c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-d)||2<Math.abs(f-e))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:d,finalY:e},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=
!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=e:this.selectionPosX=e=d,4>Math.abs(e-this.initialMouse)&&this.fromIndex==this.index||(this.index<this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),e=a.categoryAxis,e.parseDates&&!e.equalSpacing&&(b[c.start]&&(c.start=b[c.start].time),b[c.end]&&(c.end=a.getEndTime(b[c.end].time))),
this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,h=this.initialMouseY;3>Math.abs(d-g)&&3>Math.abs(e-h)||(b=Math.min(g,d),f=Math.min(h,e),d=Math.abs(g-d),e=Math.abs(h-e),a.hideXScrollbar&&(b=0,d=this.width),a.hideYScrollbar&&(f=0,e=this.height),c.selectionHeight=e,c.selectionWidth=d,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||AmCharts.remove(this.selection)}this.skipZoomDispatch=!1}}this.panning=this.zooming=!1},showCursorAt:function(a){var b=
this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,!1)},clearSelection:function(){AmCharts.remove(this.selection)},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,c=this.chart,d=c.mouseX-this.x,e=c.mouseY-this.y;if(0<d&&d<this.width&&0<e&&e<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&AmCharts.remove(this.selection),this.drawing?(this.drawStartY=
e,this.drawStartX=d,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?e:d,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=e,this.selectionPosY=this.linePos):(this.initialMouse=d,this.selectionPosX=this.linePos)):(this.initialMouseX=d,this.initialMouseY=e,this.selectionPosX=d,this.selectionPosY=
e),this.zooming=!0)}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(a){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconWidth=18;this.dragIconHeight=25;AmCharts.applyTheme(this,a,"SimpleChartScrollbar")},draw:function(){var a=
this;a.destroy();a.interval=setInterval(function(){a.updateScrollbar.call(a)},40);var b=a.chart.container,c=a.rotate,d=a.chart,e=b.set();a.set=e;d.scrollbarsSet.push(e);var f,g;c?(f=a.scrollbarHeight,g=d.plotAreaHeight):(g=a.scrollbarHeight,f=d.plotAreaWidth);a.width=f;if((a.height=g)&&f){var h=AmCharts.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);a.bg=h;e.push(h);h=AmCharts.rect(b,f,g,"#000",.005);e.push(h);a.invisibleBg=h;h.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});
h=AmCharts.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);a.selectedBG=h;e.push(h);f=AmCharts.rect(b,f,g,"#000",.005);a.dragger=f;e.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});f=d.pathToImages;c?(h=f+"dragIconH.gif",f=a.dragIconWidth,c=a.dragIconHeight):(h=f+"dragIcon.gif",
c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(h,0,0,c,f);var h=b.image(h,0,0,c,f),k=10,l=20;d.panEventsEnabled&&(k=25,l=a.scrollbarHeight);var m=AmCharts.rect(b,k,l,"#000",.005),n=AmCharts.rect(b,k,l,"#000",.005);n.translate(-(k-c)/2,-(l-f)/2);m.translate(-(k-c)/2,-(l-f)/2);c=b.set([g,n]);b=b.set([h,m]);a.iconLeft=c;e.push(a.iconLeft);a.iconRight=b;e.push(b);c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.leftDragStart()}).touchend(function(){a.leftDragStop()});
b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(b){a.rightDragStart()}).touchend(function(){a.rightDragStop()});AmCharts.ifArray(d.chartData)?e.show():e.hide();a.hideDragIcons();a.clipDragger(!1)}e.translate(a.x,a.y);e.node.style.msTouchAction="none"},updateScrollbarSize:function(a,b){a=Math.round(a);b=Math.round(b);var c=this.dragger,d,e,f,g;this.rotate?(d=0,e=a,f=
this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",e)):(d=a,e=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",d));this.clipAndUpdate(d,e,f,g)},updateScrollbar:function(){var a,b=!1,c,d,e=this.x,f=this.y,g=this.dragger,h=this.getDBox();if(h){c=h.x+e;d=h.y+f;var k=h.width,h=h.height,l=this.rotate,m=this.chart,n=this.width,p=this.height,q=m.mouseX,r=m.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);m.mouseIsOver&&(this.dragging&&(m=this.initialCoord,l?(a=m+(r-a),0>
a&&(a=0),m=p-h,a>m&&(a=m),g.setAttr("y",a)):(a=m+(q-a),0>a&&(a=0),m=n-k,a>m&&(a=m),g.setAttr("x",a)),this.clipDragger(!0)),this.resizingRight&&(l?(a=r-d,a+d>p+f&&(a=p-d+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("height",a))):(a=q-c,a+c>n+e&&(a=n-c+e),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("width",a))),this.clipDragger(!0)),this.resizingLeft&&(l?(c=d,d=r,d<f&&(d=f),d>p+f&&(d=p+f),a=!0===b?c-d:h+c-d,0>a?(this.resizingRight=!0,
this.resizingLeft=!1,g.setAttr("y",c+h-f)):(0===a&&(a=.1),g.setAttr("y",d-f),g.setAttr("height",a))):(d=q,d<e&&(d=e),d>n+e&&(d=n+e),a=!0===b?c-d:k+c-d,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+k-e)):(0===a&&(a=.1),g.setAttr("x",d-e),g.setAttr("width",a))),this.clipDragger(!0)))}},stopForceClip:function(){this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,d=b.y,e=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,e=this.width+1,this.clipY!=d||this.clipH!=
b)f=!0}else if(d=0,b=this.height+1,this.clipX!=c||this.clipW!=e)f=!0;f&&(this.clipAndUpdate(c,d,e,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,d){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=d;this.selectedBG.clipRect(a,b,c,d);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=
b.y,e=b.width,b=b.height;this.rotate?(c=d,e=this.height/b):e=this.width/e;a={type:"zoomed",position:c,chart:a,target:this,multiplier:e};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,d=this.iconLeft,e=this.iconRight,f,g,h=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate((h-g)/2,c-f/2),e.translate((h-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,d.translate(b-g/2,(h-f)/2),e.translate(b-g/2+a.width,
(h-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.dragger.stop();this.multiplier=a;this.position=b;this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/
a)},destroy:function(){this.clear();AmCharts.remove(this.set);AmCharts.remove(this.iconRight);AmCharts.remove(this.iconLeft)},clear:function(){clearInterval(this.interval)},handleDragStart:function(){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)},handleDragStop:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=
!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();this.updateScrollbar()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},
iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,d=a.scrollDuration,e=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var h=a.y,k=a.x,l=a.rotate;l?(b="y",c=c.mouseY-f/2-h,c=AmCharts.fitToBounds(c,0,
a.height-f)):(b="x",c=c.mouseX-g/2-k,c=AmCharts.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?(a.skipEvent=!1,e.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(c=Math.round(c),l?e.animate({y:c},d,">"):e.animate({x:c},d,">"),a.forceClip=!0,clearTimeout(a.forceTO),a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*d))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||
this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.updateScrollbar()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}});AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";AmCharts.ChartScrollbar.base.construct.call(this,a);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;this.skipEvent=this.autoGridCount=
!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.offset=0;AmCharts.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new AmCharts.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.markPeriodChange=b.categoryAxis.markPeriodChange;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=AmCharts.RecItem;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.inside=!0;a.fontSize=
this.fontSize;a.tickLength=0;a.axisAlpha=0;AmCharts.isString(this.graph)&&(this.graph=AmCharts.getObjById(b.graphs,this.graph));if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new AmCharts.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=AmCharts.RecItem,c.axisRenderer=AmCharts.RecAxis,c.guideFillRenderer=AmCharts.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=
a.noStepRisers);b=this.selectedGraph;b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=this;AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,d=a.categoryAxis,e=a.rotate,f=a.x,g=a.y,h=a.width,k=a.height,l=b.categoryAxis,m=a.set;d.setOrientation(!e);d.parseDates=l.parseDates;d.rotate=e;d.equalSpacing=l.equalSpacing;d.minPeriod=l.minPeriod;
d.startOnAxis=l.startOnAxis;d.viW=h;d.viH=k;d.width=h;d.height=k;d.gridCount=a.gridCount;d.gridColor=a.gridColor;d.gridAlpha=a.gridAlpha;d.color=a.color;d.tickLength=0;d.axisAlpha=0;d.autoGridCount=a.autoGridCount;d.parseDates&&!d.equalSpacing&&d.timeZoom(b.firstTime,b.lastTime);d.zoom(0,c.length-1);if(l=a.graph){var n=a.valueAxis,p=l.valueAxis;n.id=p.id;n.rotate=e;n.setOrientation(e);n.width=h;n.height=k;n.viW=h;n.viH=k;n.dataProvider=c;n.reversed=p.reversed;n.logarithmic=p.logarithmic;n.gridAlpha=
0;n.axisAlpha=0;m.push(n.set);e?(n.y=g,n.x=0):(n.x=f,n.y=0);var f=Infinity,g=-Infinity,q;for(q=0;q<c.length;q++){var r=c[q].axes[p.id].graphs[l.id].values,t;for(t in r)if(r.hasOwnProperty(t)&&"percents"!=t&&"total"!=t){var w=r[t];w<f&&(f=w);w>g&&(g=w)}}Infinity!=f&&(n.minimum=f);-Infinity!=g&&(n.maximum=g+.1*(g-f));f==g&&(--n.minimum,n.maximum+=1);void 0!==a.minimum&&(n.minimum=a.minimum);void 0!==a.maximum&&(n.maximum=a.maximum);n.zoom(0,c.length-1);t=a.unselectedGraph;t.id=l.id;t.rotate=e;t.chart=
b;t.data=c;t.valueAxis=n;t.chart=l.chart;t.categoryAxis=a.categoryAxis;t.periodSpan=l.periodSpan;t.valueField=l.valueField;t.openField=l.openField;t.closeField=l.closeField;t.highField=l.highField;t.lowField=l.lowField;t.lineAlpha=a.graphLineAlpha;t.lineColorR=a.graphLineColor;t.fillAlphas=a.graphFillAlpha;t.fillColorsR=a.graphFillColor;t.connect=l.connect;t.hidden=l.hidden;t.width=h;t.height=k;t.pointPosition=l.pointPosition;t.stepDirection=l.stepDirection;t.periodSpan=l.periodSpan;p=a.selectedGraph;
p.id=l.id;p.rotate=e;p.chart=b;p.data=c;p.valueAxis=n;p.chart=l.chart;p.categoryAxis=d;p.periodSpan=l.periodSpan;p.valueField=l.valueField;p.openField=l.openField;p.closeField=l.closeField;p.highField=l.highField;p.lowField=l.lowField;p.lineAlpha=a.selectedGraphLineAlpha;p.lineColorR=a.selectedGraphLineColor;p.fillAlphas=a.selectedGraphFillAlpha;p.fillColorsR=a.selectedGraphFillColor;p.connect=l.connect;p.hidden=l.hidden;p.width=h;p.height=k;p.pointPosition=l.pointPosition;p.stepDirection=l.stepDirection;
p.periodSpan=l.periodSpan;b=a.graphType;b||(b=l.type);t.type=b;p.type=b;c=c.length-1;t.zoom(0,c);p.zoom(0,c);p.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});t.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});m.push(t.set);m.push(p.set)}m.push(d.set);m.push(d.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();
a.iconRight.toFront()},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!AmCharts.toBoolean(c);this.zoomScrollbar();this.skipEvent||this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,d=this.dragger.getBBox();b=d.x;var e=d.y,f=d.width,d=d.height,g=this.chart;this.rotate?(b=e,c=d):c=f;f=
{type:"zoomed",target:this};f.chart=g;var h=this.categoryAxis,k=this.stepWidth,e=g.minSelectedTime,d=!1;if(h.parseDates&&!h.equalSpacing){if(a=g.lastTime,g=g.firstTime,h.minDuration(),h=Math.round(b/k)+g,b=this.dragging?h+this.timeDifference:Math.round((b+c)/k)+g,h>b&&(h=b),0<e&&b-h<e&&(b=Math.round(h+(b-h)/2),d=Math.round(e/2),h=b-d,b+=d,d=!0),b>a&&(b=a),b-e<h&&(h=b-e),h<g&&(h=g),h+e>b&&(b=h+e),h!=this.startTime||b!=this.endTime)this.startTime=h,this.endTime=b,f.start=h,f.end=b,f.startDate=new Date(h),
f.endDate=new Date(b),this.fire(f.type,f)}else if(h.startOnAxis||(b+=k/2),c-=this.stepWidth/2,e=h.xToIndex(b),b=h.xToIndex(b+c),e!=this.start||this.end!=b)h.startOnAxis&&(this.resizingRight&&e==b&&b++,this.resizingLeft&&e==b&&(0<e?e--:b=1)),this.start=e,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,h.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),this.fire(f.type,f);d&&this.zoomScrollbar()}},
zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,d=this.categoryAxis;d.parseDates&&!d.equalSpacing?(c=d.stepWidth,d=a.firstTime,a=c*(this.startTime-d),b=c*(this.endTime-d)):(a=c[this.start].x[d.id],b=c[this.end].x[d.id],c=d.stepWidth,d.startOnAxis||(d=c/2,a-=d,b+=d));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,d){var e=this.selectedGraph;e&&e.set.clipRect(a,b,c,d)},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);this.difference=
this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}});AmCharts.AmBalloon=AmCharts.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor="#000000";this.fadeOutDuration=
this.animationDuration=.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;this.textAlign="center";AmCharts.isModern||(this.offsetY*=1.5);AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY;this.deltaSignX=this.deltaSignY=1;var c=this.chart;AmCharts.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var d=this.follow,e=c.container,f=this.set;AmCharts.remove(f);this.removeDiv();f=e.set();f.node.style.pointerEvents=
"none";this.set=f;c.balloonsSet.push(f);if(this.show){var g=this.l,h=this.t,k=this.r,l=this.b,m=this.balloonColor,n=this.fillColor,p=this.borderColor,q=n;void 0!=m&&(this.adjustBorderColor?q=p=m:n=m);var r=this.horizontalPadding,t=this.verticalPadding,w=this.pointerWidth,v=this.pointerOrientation,s=this.cornerRadius,u=c.fontFamily,x=this.fontSize;void 0==x&&(x=c.fontSize);var m=document.createElement("div"),F=m.style;F.pointerEvents="none";F.position="absolute";var B=this.minWidth,z="";isNaN(B)||
(z="min-width:"+(B-2*r)+"px; ");m.innerHTML='<div style="text-align:'+this.textAlign+"; "+z+"max-width:"+this.maxWidth+"px; font-size:"+x+"px; color:"+this.color+"; font-family:"+u+'">'+this.text+"</div>";c.chartDiv.appendChild(m);this.textDiv=m;x=m.offsetWidth;u=m.offsetHeight;m.clientHeight&&(x=m.clientWidth,u=m.clientHeight);u+=2*t;z=x+2*r;!isNaN(B)&&z<B&&(z=B);window.opera&&(u+=2);var I=!1,x=this.offsetY;c.handDrawn&&(x+=c.handDrawScatter+2);"H"!=v?(B=a-z/2,b<h+u+10&&"down"!=v?(I=!0,d&&(b+=x),
x=b+w,this.deltaSignY=-1):(d&&(b-=x),x=b-u-w,this.deltaSignY=1)):(2*w>u&&(w=u/2),x=b-u/2,a<g+(k-g)/2?(B=a+w,this.deltaSignX=-1):(B=a-z-w,this.deltaSignX=1));x+u>=l&&(x=l-u);x<h&&(x=h);B<g&&(B=g);B+z>k&&(B=k-z);var h=x+t,l=B+r,t=this.shadowAlpha,E=this.shadowColor,r=this.borderThickness,H=this.bulletSize,V;0<s||0===w?(0<t&&(a=AmCharts.rect(e,z,u,n,0,r+1,E,t,this.cornerRadius),AmCharts.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),n=AmCharts.rect(e,z,u,n,this.fillAlpha,r,p,this.borderAlpha,
this.cornerRadius),this.showBullet&&(V=AmCharts.circle(e,H,q,this.fillAlpha),f.push(V))):(q=[],s=[],"H"!=v?(g=a-B,g>z-w&&(g=z-w),g<w&&(g=w),q=[0,g-w,a-B,g+w,z,z,0,0],s=I?[0,0,b-x,0,0,u,u,0]:[u,u,b-x,u,u,0,0,u]):(q=b-x,q>u-w&&(q=u-w),q<w&&(q=w),s=[0,q-w,b-x,q+w,u,u,0,0],q=a<g+(k-g)/2?[0,0,B<a?0:a-B,0,0,z,z,0]:[z,z,B+z>a?z:a-B,z,z,0,0,z]),0<t&&(a=AmCharts.polygon(e,q,s,n,0,r,E,t),a.translate(1,1),f.push(a)),n=AmCharts.polygon(e,q,s,n,this.fillAlpha,r,p,this.borderAlpha));this.bg=n;f.push(n);n.toFront();
e=1*this.deltaSignX;F.left=l+"px";F.top=h+"px";f.translate(B-e,x);n=n.getBBox();this.bottom=x+u+1;this.yPos=n.y+x;V&&V.translate(this.pointToX-B+e,b-x);b=this.animationDuration;0<this.animationDuration&&!d&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),f.animate({translate:B-e+","+x},b,"easeOutSine"),m&&(F.left=this.prevTX+"px",F.top=this.prevTY+"px",this.xAnim=c.animate({node:m},"left",this.prevTX,l,b,"easeOutSine","px"),this.yAnim=c.animate({node:m},"top",this.prevTY,h,b,"easeOutSine",
"px")));this.prevX=B-e;this.prevY=x;this.prevTX=l;this.prevTY=h}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,e=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);e<this.t&&(e=b+10);c.translate(a,e);
b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=e+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=a;this.show=!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(){var a=this,b=a.fadeOutDuration,
c=a.chart;if(0<b){a.destroyTO=setTimeout(function(){a.destroy.call(a)},1E3*b);a.follow=!1;a.show=!1;var d=a.set;d&&(d.setAttr("opacity",a.fillAlpha),a.fadeAnim1=d.animate({opacity:0},b,"easeInSine"));a.textDiv&&(a.fadeAnim2=c.animate({node:a.textDiv},"opacity",1,0,b,"easeInSine",""))}else a.show=!1,a.follow=!1,a.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=
this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,d=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);AmCharts.remove(this.set);this.removeDiv();
this.set=null}});AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){AmCharts.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;AmCharts.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);var a=this.categoryAxis;a&&(this.categoryAxis=AmCharts.processObject(a,AmCharts.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();AmCharts.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&
this.gridSet.toFront()},createValueAxes:function(){if(0===this.valueAxes.length){var a=new AmCharts.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(){var a=this.graphs,b,c={},d=this.seriesIdField;d||(d=this.categoryField);this.chartData=[];var e=this.dataProvider;if(e){var f=!1,g,h=this.categoryAxis,k,l;h&&(f=h.parseDates,k=h.forceShowField,l=h.labelColorField,g=h.categoryFunction);var m,n,p={},q;f&&(b=AmCharts.extractPeriod(h.minPeriod),
m=b.period,n=b.count,q=AmCharts.getPeriodDuration(m,n));var r={};this.lookupTable=r;var t,w=this.dataDateFormat,v={};for(t=0;t<e.length;t++){var s={},u=e[t];b=u[this.categoryField];s.dataContext=u;s.category=g?g(b,u,h):String(b);k&&(s.forceShow=u[k]);l&&(s.labelColor=u[l]);r[u[d]]=s;if(f&&(b=h.categoryFunction?h.categoryFunction(b,u,h):b instanceof Date?AmCharts.newDate(b,h.minPeriod):w?AmCharts.stringToDate(b,w):new Date(b),b=AmCharts.resetDateToMin(b,m,n,h.firstDayOfWeek),s.category=b,s.time=b.getTime(),
isNaN(s.time)))continue;var x=this.valueAxes;s.axes={};s.x={};var F;for(F=0;F<x.length;F++){var B=x[F].id;s.axes[B]={};s.axes[B].graphs={};var z;for(z=0;z<a.length;z++){b=a[z];var I=b.id,E=b.periodValue;if(b.valueAxis.id==B){s.axes[B].graphs[I]={};var H={};H.index=t;var V=u;b.dataProvider&&(V=c);H.values=this.processValues(V,b,E);!b.connect&&v&&v[I]&&s.time-p[I]>1.1*q&&(v[I].gap=!0);this.processFields(b,H,V);H.category=s.category;H.serialDataItem=s;H.graph=b;s.axes[B].graphs[I]=H;p[I]=s.time;v[I]=
H}}}this.chartData[t]=s}}for(c=0;c<a.length;c++)b=a[c],b.dataProvider&&this.parseGraphData(b)},processValues:function(a,b,c){var d={},e,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);e=Number(a[b.valueField+c]);isNaN(e)||(d.value=e);e=Number(a[b.errorField+c]);isNaN(e)||(d.error=e);f&&(c="Open");e=Number(a[b.openField+c]);isNaN(e)||(d.open=e);f&&(c="Close");e=Number(a[b.closeField+c]);isNaN(e)||(d.close=e);f&&(c="Low");e=Number(a[b.lowField+c]);isNaN(e)||(d.low=e);f&&(c="High");e=Number(a[b.highField+
c]);isNaN(e)||(d.high=e);return d},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var e=b[d],f=this.lookupTable[String(e[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(e,a,a.periodValue),this.processFields(a,g,e))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,
b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},
processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.ValueAxis,this.theme);a[b]=c;c.chart=this;c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var d=a[c];(void 0!==d.category||void 0!==d.date)&&b&&b.addGuide(d);var e=d.valueAxis;e?(AmCharts.isString(e)&&(e=this.getValueAxisById(e)),
e?e.addGuide(d):this.valueAxes[0].addGuide(d)):isNaN(d.value)||this.valueAxes[0].addGuide(d)}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;AmCharts.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime())}},formatString:function(a,b,c){var d=b.graph,
e=d.valueAxis;e.duration&&b.values.value&&(e=AmCharts.formatDuration(b.values.value,e.duration,"",e.durationUnits,e.maxInterval,e.numberFormatter),a=a.split("[[value]]").join(e));a=AmCharts.massReplace(a,{"[[title]]":d.title,"[[description]]":b.description});a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=AmCharts.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var d=a.lineColor,e=a.balloonColor;c&&(e=d);c=a.fillColorsR;"object"==typeof c?d=c[0]:void 0!==c&&(d=c);b.isNegative&&(c=a.negativeLineColor,
a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(d=c));void 0!==b.color&&(d=b.color);void 0===e&&(e=d);return e},getGraphById:function(a){return AmCharts.getObjById(this.graphs,a)},getValueAxisById:function(a){return AmCharts.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var d=a.itemColors,e=b.index;b.color=e<d.length?d[e]:AmCharts.randomColor()}d="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern".split(" ");
for(e=0;e<d.length;e++){var f=d[e],g=a[f+"Field"];g&&(g=c[g],AmCharts.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:AmCharts.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=
this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden,d=a.showBalloon;switch(b){case "clickMarker":this.textClickEnabled&&(d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case "clickLabel":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "rollOverItem":c||this.highlightGraph(a);break;case "rollOutItem":c||this.unhighlightGraph();break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},
highlightGraph:function(a){var b=this.graphs,c,d=.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var e=b[c];e!=a&&e.changeOpacity(d)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&
(this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}});AmCharts.AmSlicedChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");AmCharts.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";this.groupedPulled=
!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=.2;this.hideLabelsPercent=0;this.urlTarget="_self";this.autoMarginOffset=
10;this.gradientRatio=[];this.maxLabelWidth=200;AmCharts.applyTheme(this,a,"AmSlicedChart")},initChart:function(){AmCharts.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type,c=a.dataItem,d=this.legend;if(!d.data&&c){var e=c.hidden;a=a.event;switch(b){case "clickMarker":e||d.switchable||this.clickSlice(c,a);break;case "clickLabel":e||
this.clickSlice(c,a,!1);break;case "rollOverItem":e||this.rollOverSlice(c,!1,a);break;case "rollOutItem":e||this.rollOutSlice(c,a);break;case "hideItem":this.hideSlice(c,a);break;case "showItem":this.showSlice(c,a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,
a);c.panEventsEnabled&&c.clickSlice(b,a)}).touchstart(function(a){c.rollOverSlice(b,a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=AmCharts.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b,["percents"],this.pf);a=AmCharts.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,
b.dataContext));a=c?AmCharts.fixNewLines(a):AmCharts.fixBrakes(a);return a=AmCharts.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++){var d=b[c];d.pulled&&
this.pullSlice(d,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:1,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var d=c.label;d&&d.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?
a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var d=a.balloonX,e=a.balloonY;a.pulled&&(d+=a.pullX,e+=a.pullY);var f=this.formatString(this.balloonText,
a,!0),g=this.balloonFunction;g&&(f=g(a,f));g=AmCharts.adjustLuminosity(a.color,-.15);this.showBalloon(f,g,b,d,e);a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,1);AmCharts.getURL(a.url,
this.urlTarget);c||(a={type:"clickSlice",dataItem:a,chart:this,event:b},this.fire(a.type,a))},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var d=c.ty,d=AmCharts.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,d,d],this.labelTickColor,this.labelTickAlpha);c.tick=d;c.wedge.push(d)}}},initialStart:function(){var a=
this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(a.startSlices(),0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices(!0))},pullSlice:function(a,b,c){var d=this.pullOutDuration;!0===c&&(d=0);(c=a.wedge)&&(0<d?c.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect):c.translate(b*a.pullX,b*a.pullY));1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",
dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(a){a=this.chartData;var b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,d=0,e,f,g;for(e=0;e<
c;e++){f={};var h=b[e];f.dataContext=h;f.value=Number(h[this.valueField]);(g=h[this.titleField])||(g="");f.title=g;f.pulled=AmCharts.toBoolean(h[this.pulledField],!1);(g=h[this.descriptionField])||(g="");f.description=g;f.labelRadius=Number(h[this.labelRadiusField]);f.switchable=!0;f.url=h[this.urlField];g=h[this.patternField];!g&&this.patterns&&(g=this.patterns[e]);f.pattern=g;f.visibleInLegend=AmCharts.toBoolean(h[this.visibleInLegendField],!0);g=h[this.alphaField];f.alpha=void 0!==g?Number(g):
this.alpha;g=h[this.colorField];void 0!==g&&(f.color=AmCharts.toColor(g));f.labelColor=AmCharts.toColor(h[this.labelColorField]);d+=f.value;f.hidden=!1;a[e]=f}for(e=b=0;e<c;e++)f=a[e],f.percents=f.value/d*100,f.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/d*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,
pattern:this.groupedPattern,dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);d=this.brightnessStep;d||(d=this.pieBrightnessStep);for(e=0;e<a.length;e++)c?g=AmCharts.adjustLuminosity(c,e*d/100):(g=this.colors[e],void 0===g&&(g=AmCharts.randomColor())),void 0===a[e].color&&(a[e].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=this.chartData,b=0,c,d;for(c=0;c<a.length;c++)d=a[c],!d.hidden&&0<d.value&&(b+=d.value);for(c=0;c<a.length;c++)d=this.chartData[c],d.percents=
!d.hidden&&0<d.value?100*d.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();for(var b=0;b<a.chartData.length;b++){var c=a.chartData[b];c.started=!1;var d=c.wedge;d&&d.translate(c.startX,c.startY)}b=a.startDuration;0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices()},measureMaxLabel:function(){var a=
this.chartData,b=0,c;for(c=0;c<a.length;c++){var d=a[c],e=this.formatString(this.labelText,d),f=this.labelFunction;f&&(e=f(d,e));d=AmCharts.text(this.container,e,this.color,this.fontFamily,this.fontSize);e=d.getBBox().width;e>b&&(b=e);d.remove()}return b}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(a){AmCharts.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=
0;this.zoomOutButtonImageSize=17;this.zoomOutButtonImage="lens.png";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;AmCharts.applyTheme(this,a,"AmRectangularChart")},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),
a=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(AmCharts.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw();a=this.zoomOutText;""!==a&&a&&this.drawZoomOutButton()}},resetMargins:function(){var a={},b;if("serial"==this.type){var c=
this.valueAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||(d.setOrientation(this.rotate),d.fixAxisPosition(),a[d.position]=!0)}(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}else{d=this.xAxes;c=this.yAxes;for(b=0;b<d.length;b++){var e=d[b];e.ignoreAxisWidth||(e.setOrientation(!0),e.fixAxisPosition(),a[e.position]=!0)}for(b=0;b<c.length;b++)d=c[b],d.ignoreAxisWidth||(d.setOrientation(!1),d.fixAxisPosition(),
a[d.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,e=this.realWidth,f=this.realHeight,g=c,h=c,k=e;b=f;var l;for(l=0;l<a.length;l++)b=this.getAxisBounds(a[l],g,k,h,b),g=Math.round(b.l),k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,g,k,h,b),g=Math.round(b.l),
k=Math.round(b.r),h=Math.round(b.t),b=Math.round(b.b);d.left&&g<c&&(this.marginLeft=Math.round(-g+c));d.right&&k>=e-c&&(this.marginRight=Math.round(k-e+c));d.top&&h<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-h+c+this.titleHeight));d.bottom&&b>f-c&&(this.marginBottom=Math.round(this.marginBottom+b-f+c));this.initChart()},getAxisBounds:function(a,b,c,d,e){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&(g=0);if(f)switch(f=a.getBBox(),a.position){case "top":a=f.y;
d>a&&(d=a);break;case "bottom":a=f.y+f.height;e<a&&(e=a);break;case "right":a=f.x+f.width+g+3;c<a&&(c=a);break;case "left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:d,r:c,b:e}},drawZoomOutButton:function(){var a=this,b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,e=a.zoomOutButtonImageSize,f=a.zoomOutButtonImage,g=AmCharts.lang.zoomOutText||a.zoomOutText,h=a.zoomOutButtonColor,k=a.zoomOutButtonAlpha,l=a.zoomOutButtonFontSize,m=a.zoomOutButtonPadding;isNaN(l)||(d=l);(l=a.zoomOutButtonFontColor)&&
(c=l);var l=a.zoomOutButton,n;l&&(l.fontSize&&(d=l.fontSize),l.color&&(c=l.color),l.backgroundColor&&(h=l.backgroundColor),isNaN(l.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=l.backgroundAlpha));var p=l=0;void 0!==a.pathToImages&&f&&(n=a.container.image(a.pathToImages+f,0,0,e,e),b.push(n),n=n.getBBox(),l=n.width+5);void 0!==g&&(c=AmCharts.text(a.container,g,c,a.fontFamily,d,"start"),d=c.getBBox(),p=n?n.height/2-3:d.height/2,c.translate(l,p),b.push(c));n=b.getBBox();c=1;AmCharts.isModern||(c=0);
h=AmCharts.rect(a.container,n.width+2*m+5,n.height+2*m-2,h,1,1,h,c);h.setAttr("opacity",k);h.translate(-m,-m);b.push(h);h.toBack();a.zbBG=h;n=h.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-n.width+m,a.marginTopReal+m);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(k=0;k<b.length;k++)b[k].attr({cursor:"pointer"});a.zbSet=b},rollOverZB:function(){this.zbBG.setAttr("opacity",
this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,e=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,h=this.plotAreaFillAlphas,k=this.plotAreaBorderColor,l=this.plotAreaBorderAlpha;this.trendLinesSet.clipRect(c,d,e,f);"object"==typeof h&&
(h=h[0]);g=AmCharts.polygon(this.container,[0,e,e,0,0],[0,0,f,f,0],g,h,1,k,l,this.plotAreaGradientAngle);g.translate(c+a,d+b);this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=AmCharts.adjustLuminosity(g,-.15),e=AmCharts.polygon(this.container,[0,a,e+a,e,0],[0,b,b,0,0],g,h,1,k,l),e.translate(c,d+f),this.set.push(e),a=AmCharts.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,h,1,k,l),a.translate(c,d),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},
updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=
Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy+a;this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,d=this.plotAreaHeight,e=this.plotAreaWidth,
f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=AmCharts.RecAxis;g.guideFillRenderer=AmCharts.RecFill;g.axisItemRenderer=AmCharts.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=e-1;g.viH=d-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){var a=
this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=this.rotate}},updateChartCursor:function(){var a=this.chartCursor;a&&(a=AmCharts.processObject(a,AmCharts.ChartCursor,this.theme),this.addChartCursor(a),a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-
1,a.height=this.plotAreaHeight-1,a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=AmCharts.processObject(a,AmCharts.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},addChartCursor:function(a){AmCharts.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){AmCharts.callMethod("destroy",[this.chartCursor]);
this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.scrollbarHeight+a.offset;"top"==a.position?b?
this.marginLeftReal+=c:this.marginTopReal+=c:b?this.marginRightReal+=c:this.marginBottomReal+=c},getScrollbarPosition:function(a,b,c){a.position=b?"bottom"==c||"left"==c?"bottom":"top":"top"==c||"right"==c?"bottom":"top"},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=this.marginLeftReal,e=a.scrollbarHeight,f=this.dx,g=this.dy,h=a.offset;"top"==a.position?b?(a.y=c,a.x=d-e-h):(a.y=c-e+g-1-h,a.x=d+f):b?(a.y=c+g,a.x=d+this.plotAreaWidth+f+h):(a.y=c+this.plotAreaHeight+
h,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;b&&(a?b.show():b.hide(),this.rollOutZB())},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside()},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(a){}});AmCharts.TrendLine=AmCharts.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;AmCharts.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,d,e,f,g,h=a.categoryAxis,k=a.initialDate,l=a.initialCategory,m=a.finalDate,n=a.finalCategory,p=a.valueAxis,q=a.valueAxisX,r=a.initialXValue,t=a.finalXValue,w=a.initialValue,v=a.finalValue,
s=p.recalculateToPercents,u=b.dataDateFormat;h&&(k&&(k instanceof Date||(k=u?AmCharts.stringToDate(k,u):new Date(k)),a.initialDate=k,d=h.dateToCoordinate(k)),l&&(d=h.categoryToCoordinate(l)),m&&(m instanceof Date||(m=u?AmCharts.stringToDate(m,u):new Date(m)),a.finalDate=m,e=h.dateToCoordinate(m)),n&&(e=h.categoryToCoordinate(n)));q&&!s&&(isNaN(r)||(d=q.getCoordinate(r)),isNaN(t)||(e=q.getCoordinate(t)));p&&!s&&(isNaN(w)||(f=p.getCoordinate(w)),isNaN(v)||(g=p.getCoordinate(v)));isNaN(d)||isNaN(e)||
isNaN(f)||isNaN(f)||(b.rotate?(h=[f,g],e=[d,e]):(h=[d,e],e=[f,g]),f=a.lineColor,d=AmCharts.line(c,h,e,f,a.lineAlpha,a.lineThickness,a.dashLength),g=h,k=e,n=h[1]-h[0],p=e[1]-e[0],0===n&&(n=.01),0===p&&(p=.01),l=n/Math.abs(n),m=p/Math.abs(p),p=n*p/Math.abs(n*p)*Math.sqrt(Math.pow(n,2)+Math.pow(p,2)),n=Math.asin(n/p),p=90*Math.PI/180-n,n=Math.abs(5*Math.cos(p)),p=Math.abs(5*Math.sin(p)),g.push(h[1]-l*p,h[0]-l*p),k.push(e[1]+m*n,e[0]+m*n),h=AmCharts.polygon(c,g,k,f,.005,0),c=c.set([h,d]),c.translate(b.marginLeftReal,
b.marginTopReal),b.trendLinesSet.push(c),a.line=d,a.set=c,h.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),h.touchend&&h.touchend(function(){a.handleLineClick()}))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){AmCharts.remove(this.set)}});AmCharts.circle=function(a,b,c,d,e,f,g,h,k){if(void 0==e||0===e)e=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);d={fill:c,stroke:f,"fill-opacity":d,"stroke-width":e,"stroke-opacity":g};a=isNaN(k)?a.circle(0,0,b).attr(d):a.ellipse(0,0,b,k).attr(d);h&&a.gradient("radialGradient",[c,AmCharts.adjustLuminosity(c,-.6)]);return a};
AmCharts.text=function(a,b,c,d,e,f,g,h){f||(f="middle");"right"==f&&(f="end");isNaN(h)&&(h=1);void 0!==b&&(b=String(b),AmCharts.isIE&&!AmCharts.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":d,"font-size":e,opacity:h};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};
AmCharts.polygon=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=.01);isNaN(h)&&(h=e);var n=d,p=!1;"object"==typeof n&&1<n.length&&(p=!0,n=n[0]);void 0===g&&(g=n);e={fill:n,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);m=AmCharts.dx;f=AmCharts.dy;a.handDrawn&&(c=AmCharts.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;l&&(g=AmCharts.doNothing);l="M"+(g(b[0])+m)+","+(g(c[0])+f);for(h=1;h<b.length;h++)l+=" L"+(g(b[h])+m)+","+(g(c[h])+
f);a=a.path(l+" Z").attr(e);p&&a.gradient("linearGradient",d,k);return a};
AmCharts.rect=function(a,b,c,d,e,f,g,h,k,l,m){isNaN(f)&&(f=0);void 0===k&&(k=0);void 0===l&&(l=270);isNaN(e)&&(e=0);var n=d,p=!1;"object"==typeof n&&(n=n[0],p=!0);void 0===g&&(g=n);void 0===h&&(h=e);b=Math.round(b);c=Math.round(c);var q=0,r=0;0>b&&(b=Math.abs(b),q=-b);0>c&&(c=Math.abs(c),r=-c);q+=AmCharts.dx;r+=AmCharts.dy;e={fill:n,stroke:g,"fill-opacity":e,"stroke-opacity":h};void 0!==m&&0<m&&(e["stroke-dasharray"]=m);a=a.rect(q,r,b,c,k,f).attr(e);p&&a.gradient("linearGradient",d,l);return a};
AmCharts.bullet=function(a,b,c,d,e,f,g,h,k,l,m){var n;"circle"==b&&(b="round");switch(b){case "round":n=AmCharts.circle(a,c/2,d,e,f,g,h);break;case "square":n=AmCharts.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "rectangle":n=AmCharts.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],d,e,f,g,h,l-180);break;case "diamond":n=AmCharts.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],d,e,f,g,h);break;case "triangleUp":n=AmCharts.triangle(a,c,0,d,e,f,g,h);break;case "triangleDown":n=AmCharts.triangle(a,
c,180,d,e,f,g,h);break;case "triangleLeft":n=AmCharts.triangle(a,c,270,d,e,f,g,h);break;case "triangleRight":n=AmCharts.triangle(a,c,90,d,e,f,g,h);break;case "bubble":n=AmCharts.circle(a,c/2,d,e,f,g,h,!0);break;case "line":n=AmCharts.line(a,[-c/2,c/2],[0,0],d,e,f,g,h);break;case "yError":n=a.set();n.push(AmCharts.line(a,[0,0],[-c/2,c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[-c/2,-c/2],d,e,f));n.push(AmCharts.line(a,[-k,k],[c/2,c/2],d,e,f));break;case "xError":n=a.set(),n.push(AmCharts.line(a,[-c/
2,c/2],[0,0],d,e,f)),n.push(AmCharts.line(a,[-c/2,-c/2],[-k,k],d,e,f)),n.push(AmCharts.line(a,[c/2,c/2],[-k,k],d,e,f))}n&&n.pattern(m);return n};
AmCharts.triangle=function(a,b,c,d,e,f,g,h){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===h&&(h=0);d={fill:d,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};b/=2;var k;0===c&&(k=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(k=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(k=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(k=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(k).attr(d)};
AmCharts.line=function(a,b,c,d,e,f,g,h,k,l,m){if(a.handDrawn&&!m)return AmCharts.handDrawnLine(a,b,c,d,e,f,g,h,k,l,m);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d=Math.round;l&&(d=AmCharts.doNothing);l=AmCharts.dx;e=AmCharts.dy;g="M"+(d(b[0])+l)+","+(d(c[0])+e);for(h=1;h<b.length;h++)g+=" L"+(d(b[h])+l)+","+(d(c[h])+e);if(AmCharts.VML)return a.path(g,void 0,!0).attr(f);k&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};
AmCharts.makeHD=function(a,b,c){for(var d=[],e=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),h=Number(b[f-1]),k=Number(a[f]),l=Number(b[f]),m=Math.sqrt(Math.pow(k-g,2)+Math.pow(l-h,2)),m=Math.round(m/50)+1,k=(k-g)/m,l=(l-h)/m,n=0;n<=m;n++){var p=g+n*k+Math.random()*c,q=h+n*l+Math.random()*c;d.push(p);e.push(q)}return[d,e]};
AmCharts.handDrawnLine=function(a,b,c,d,e,f,g,h,k,l,m){var n=a.set();for(m=1;m<b.length;m++)for(var p=[b[m-1],b[m]],q=[c[m-1],c[m]],q=AmCharts.makeHD(p,q,a.handDrawScatter),p=q[0],q=q[1],r=1;r<p.length;r++)n.push(AmCharts.line(a,[p[r-1],p[r]],[q[r-1],q[r]],d,e,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,h,k,l,!0));return n};AmCharts.doNothing=function(a){return a};
AmCharts.wedge=function(a,b,c,d,e,f,g,h,k,l,m,n){var p=Math.round;f=p(f);g=p(g);h=p(h);var q=p(g/f*h),r=AmCharts.VML,t=359.5+f/100;359.94<t&&(t=359.94);e>=t&&(e=t);var w=1/180*Math.PI,t=b+Math.sin(d*w)*h,v=c-Math.cos(d*w)*q,s=b+Math.sin(d*w)*f,u=c-Math.cos(d*w)*g,x=b+Math.sin((d+e)*w)*f,F=c-Math.cos((d+e)*w)*g,B=b+Math.sin((d+e)*w)*h,w=c-Math.cos((d+e)*w)*q,z={fill:AmCharts.adjustLuminosity(l.fill,-.2),"stroke-opacity":0,"fill-opacity":l["fill-opacity"]},I=0;180<Math.abs(e)&&(I=1);d=a.set();var E;
r&&(t=p(10*t),s=p(10*s),x=p(10*x),B=p(10*B),v=p(10*v),u=p(10*u),F=p(10*F),w=p(10*w),b=p(10*b),k=p(10*k),c=p(10*c),f*=10,g*=10,h*=10,q*=10,1>Math.abs(e)&&1>=Math.abs(x-s)&&1>=Math.abs(F-u)&&(E=!0));e="";var H;n&&(z["fill-opacity"]=0,z["stroke-opacity"]=l["stroke-opacity"]/2,z.stroke=l.stroke);0<k&&(H=" M"+t+","+(v+k)+" L"+s+","+(u+k),r?(E||(H+=" A"+(b-f)+","+(k+c-g)+","+(b+f)+","+(k+c+g)+","+s+","+(u+k)+","+x+","+(F+k)),H+=" L"+B+","+(w+k),0<h&&(E||(H+=" B"+(b-h)+","+(k+c-q)+","+(b+h)+","+(k+c+q)+
","+B+","+(k+w)+","+t+","+(k+v)))):(H+=" A"+f+","+g+",0,"+I+",1,"+x+","+(F+k)+" L"+B+","+(w+k),0<h&&(H+=" A"+h+","+q+",0,"+I+",0,"+t+","+(v+k))),H=a.path(H+" Z",void 0,void 0,"1000,1000").attr(z),d.push(H),H=a.path(" M"+t+","+v+" L"+t+","+(v+k)+" L"+s+","+(u+k)+" L"+s+","+u+" L"+t+","+v+" Z",void 0,void 0,"1000,1000").attr(z),k=a.path(" M"+x+","+F+" L"+x+","+(F+k)+" L"+B+","+(w+k)+" L"+B+","+w+" L"+x+","+F+" Z",void 0,void 0,"1000,1000").attr(z),d.push(H),d.push(k));r?(E||(e=" A"+p(b-f)+","+p(c-g)+
","+p(b+f)+","+p(c+g)+","+p(s)+","+p(u)+","+p(x)+","+p(F)),f=" M"+p(t)+","+p(v)+" L"+p(s)+","+p(u)+e+" L"+p(B)+","+p(w)):f=" M"+t+","+v+" L"+s+","+u+(" A"+f+","+g+",0,"+I+",1,"+x+","+F)+" L"+B+","+w;0<h&&(r?E||(f+=" B"+(b-h)+","+(c-q)+","+(b+h)+","+(c+q)+","+B+","+w+","+t+","+v):f+=" A"+h+","+q+",0,"+I+",0,"+t+","+v);a.handDrawn&&(b=AmCharts.line(a,[t,s],[v,u],l.stroke,l.thickness*Math.random()*a.handDrawThickness,l["stroke-opacity"]),d.push(b));a=a.path(f+" Z",void 0,void 0,"1000,1000").attr(l);
if(m){b=[];for(c=0;c<m.length;c++)b.push(AmCharts.adjustLuminosity(l.fill,m[c]));0<b.length&&a.gradient("linearGradient",b)}a.pattern(n);d.push(a);return d};AmCharts.adjustLuminosity=function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,e;for(e=0;3>e;e++)d=parseInt(a.substr(2*e,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c};AmCharts.Bezier=AmCharts.Class({construct:function(a,b,c,d,e,f,g,h,k,l){"object"==typeof g&&(g=g[0]);"object"==typeof h&&(h=h[0]);f={fill:g,"fill-opacity":h,"stroke-width":f};void 0!==k&&0<k&&(f["stroke-dasharray"]=k);isNaN(e)||(f["stroke-opacity"]=e);d&&(f.stroke=d);d="M"+Math.round(b[0])+","+Math.round(c[0]);e=[];for(k=0;k<b.length;k++)e.push({x:Number(b[k]),y:Number(c[k])});1<e.length&&(b=this.interpolate(e),d+=this.drawBeziers(b));l?d+=l:AmCharts.VML||(d+="M0,0 L0,0");this.path=a.path(d).attr(f)},
interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,d=a[1].y-a[0].y,e=AmCharts.bezierX,f=AmCharts.bezierY;b.push({x:a[0].x+c/e,y:a[0].y+d/f});var g;for(g=1;g<a.length-1;g++){var h=a[g-1],k=a[g],d=a[g+1];isNaN(d.x)&&(d=k);isNaN(k.x)&&(k=h);isNaN(h.x)&&(h=k);c=d.x-k.x;d=d.y-h.y;h=k.x-h.x;h>c&&(h=c);b.push({x:k.x-h/e,y:k.y-d/f});b.push({x:k.x,y:k.y});b.push({x:k.x+h/e,y:k.y+d/f})}d=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-a[a.length-2].x;b.push({x:a[a.length-1].x-
c/e,y:a[a.length-1].y-d/f});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var e=Math.round,f=this.getPointOnSegment(a,b,.75),g=this.getPointOnSegment(d,c,.75),h=(d.x-a.x)/16,k=(d.y-a.y)/16,l=this.getPointOnSegment(a,b,.375);a=this.getPointOnSegment(f,g,.375);a.x-=h;a.y-=k;b=this.getPointOnSegment(g,f,.375);b.x+=h;b.y+=
k;c=this.getPointOnSegment(d,c,.375);h=this.getMiddle(l,a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);l=" Q"+e(l.x)+","+e(l.y)+","+e(h.x)+","+e(h.y);l+=" Q"+e(a.x)+","+e(a.y)+","+e(f.x)+","+e(f.y);l+=" Q"+e(b.x)+","+e(b.y)+","+e(g.x)+","+e(g.y);return l+=" Q"+e(c.x)+","+e(c.y)+","+e(d.x)+","+e(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}});AmCharts.AmDraw=AmCharts.Class({construct:function(a,b,c,d){AmCharts.SVG_NS="http://www.w3.org/2000/svg";AmCharts.SVG_XLINK="http://www.w3.org/1999/xlink";AmCharts.hasSVG=!!document.createElementNS&&!!document.createElementNS(AmCharts.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");if(AmCharts.hasSVG){AmCharts.SVG=!0;var e=this.createSvgElement("svg");e.style.position="absolute";e.style.width=b+"px";e.style.height=c+
"px";b=this.createSvgElement("desc");b.appendChild(document.createTextNode("JavaScript chart by amCharts "+d.version));e.appendChild(b);AmCharts.rtl&&(e.setAttribute("direction","rtl"),e.style.left="auto",e.style.right="0px");e.setAttribute("version","1.1");a.appendChild(e);this.container=e;this.R=new AmCharts.SVGRenderer(this)}else AmCharts.isIE&&AmCharts.VMLRenderer&&(AmCharts.VML=!0,AmCharts.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?
(e=document.createStyleSheet(),e.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),AmCharts.vmlStyleSheet=e):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new AmCharts.VMLRenderer(this,d),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(AmCharts.SVG_NS,a)},circle:function(a,b,c,d){var e=new AmCharts.AmDObject("circle",this);e.attr({r:c,
cx:a,cy:b});this.addToContainer(e.node,d);return e},ellipse:function(a,b,c,d,e){var f=new AmCharts.AmDObject("ellipse",this);f.attr({rx:c,ry:d,cx:a,cy:b});this.addToContainer(f.node,e);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,d,e,f,g){var h=new AmCharts.AmDObject("rect",this);AmCharts.VML&&(e=Math.round(100*e/Math.min(c,d)),c+=2*f,d+=2*f,h.bw=f,h.node.style.marginLeft=-f,h.node.style.marginTop=-f);1>c&&(c=
1);1>d&&(d=1);h.attr({x:a,y:b,width:c,height:d,rx:e,ry:e,"stroke-width":f});this.addToContainer(h.node,g);return h},image:function(a,b,c,d,e,f){var g=new AmCharts.AmDObject("image",this);g.attr({x:b,y:c,width:d,height:e});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,d){var e=new AmCharts.AmDObject("path",this);d||(d="100,100");e.attr({cs:d});c?e.attr({dd:a}):
e.attr({d:a});this.addToContainer(e.node,b);return e},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;.5<a&&--a;.5<c&&--c;a&&(b.left=a+"px");c&&(b.top=c+"px")},update:function(){this.R.update()}});AmCharts.AmDObject=AmCharts.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},
rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var d in a)if(a.hasOwnProperty(d)){var e=d,f=a[d];c=AmCharts.getEffect(c);this.R.animate(this,e,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},
hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;
c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,
"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(a){AmCharts.removeFromArray(this.R.animations,this.an_x);AmCharts.removeFromArray(this.R.animations,this.an_y)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,
b){a&&this.R.pattern(this,a,b)}});AmCharts.VMLRenderer=AmCharts.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type=
"image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var e=document.createElement("amvml:fill");c.appendChild(e);a.fill=e;e.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var d;8===document.documentMode&&(d=!0);
var e=a.node,f=a.type,g=e.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-AmCharts.removePx(g.width)/2);"cy"==b&&(g.top=c-AmCharts.removePx(g.height)/2);var h=this.styleMap[b];void 0!==h&&(g[h]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,h=e.clientWidth,"end"==c&&(g.marginLeft=-h+"px"),"middle"==c&&(g.marginLeft=-(h/2)+"px",g.textAlign=
"center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(h=0;h<g.length;h++)g[h].setAttr(b,c);if("shape"==f){"cs"==b&&(e.style.width="100px",e.style.height="100px",e.setAttribute("coordsize",c));"d"==b&&e.setAttribute("path",this.svgPathToVml(c));"dd"==b&&e.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(d?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(d?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&
(d?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),d?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?d?a.on=!1:a.setAttribute("on",!1):d?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(d?a.color=c:a.setAttribute("color",c));"rx"==b&&(d?e.arcSize=c+"%":e.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,
b,c){var d=new AmCharts.AmDObject("text",this.D),e=d.node;e.style.whiteSpace="pre";e.innerHTML=a;this.D.addToContainer(e,c);this.attr(d,b);return d},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,e=a.offsetHeight,f;if(a.hasChildNodes()){var g,h,k;for(k=0;k<a.childNodes.length;k++){f=this.getBox(a.childNodes[k]);var l=f.x;isNaN(l)||(isNaN(g)?g=l:l<g&&(g=l));var m=f.y;isNaN(m)||(isNaN(h)?h=m:m<h&&(h=m));l=f.width+l;isNaN(l)||(d=Math.max(d,
l));f=f.height+m;isNaN(f)||(e=Math.max(e,f))}0>g&&(b+=g);0>h&&(c+=h)}return{x:b,y:c,width:d,height:e}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var d=a.node,e=d.style;"text"==a.type&&(c-=AmCharts.removePx(e.fontSize)/2-1);"oval"==a.shapeType&&(b-=AmCharts.removePx(e.width)/2,c-=AmCharts.removePx(e.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(d.style.left=b+"px",d.style.top=
c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,e;for(e=0;e<b.length;e++){var f=b[e],g=f.substring(0,1),f=f.substring(1),h=f.split(","),k=d(h[0])+","+d(h[1]);"M"==g&&(a+=" m "+k);"L"==g&&(a+=" l "+k);"Z"==g&&(a+=" x e");if("Q"==g){var l=c.length,m=c[l-1],n=h[0],p=h[1],k=h[2],q=h[3];c=d(c[l-2]/3+2/3*n);m=d(m/3+2/3*p);n=d(2/3*n+k/3);p=d(2/3*p+q/3);a+=" c "+c+","+m+","+n+","+p+","+k+","+q}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=h}return a},animate:function(a,b,c,d,
e){var f=a.node,g=this.chart;if("translate"==b){b=c.split(",");c=b[1];var h=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,e,"px");g.animate(a,"top",h,c,d,e,"px")}},clipRect:function(a,b,c,d,e){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=e+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+e)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var d=a.node;a=d.style;c||(c=this.getBGColor(d.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/
180;var e=Math.cos(c),f=Math.sin(c),g=AmCharts.removePx(a.left),h=AmCharts.removePx(a.top),k=d.offsetWidth,d=d.offsetHeight;b/=Math.abs(b);a.left=g+k/2-k/2*Math.cos(c)-b*d/2*Math.sin(c)+3;a.top=h-b*k/2*Math.sin(c)+b*d/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+e+"', M12='"+-f+"', M21='"+f+"', M22='"+e+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},
set:function(a){var b=new AmCharts.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var e="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),e=e+(g+"% "+c[f]);f<c.length-1&&(e+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",
b),a.setAttribute("angle",d));e&&(a.colors.value=e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b){var c=a.node,d=a.fill,e="none";b.color&&(e=b.color);c.fillColor=e;8===document.documentMode?(d.type="tile",d.src=b.url):(d.setAttribute("type","tile"),d.setAttribute("src",b.url))},update:function(){}});AmCharts.SVGRenderer=AmCharts.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(AmCharts.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,d,e){var f=a.node;a["an_"+b]&&AmCharts.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=
f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:d,effect:e};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],d=1E3*c.time/AmCharts.updateRate,e=c.frame+1,f=c.obj,g=c.attribute,h,k,l;e<=d?(c.frame++,"translate"==g?(h=c.from.split(","),g=Number(h[0]),h=Number(h[1]),isNaN(h)&&(h=0),k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),l=0===l-g?l:
Math.round(AmCharts[c.effect](0,e,g,l-g,d)),c=0===k-h?k:Math.round(AmCharts[c.effect](0,e,h,k-h,d)),g="transform",c="translate("+l+","+c+")"):(k=Number(c.from),h=Number(c.to),l=h-k,c=AmCharts[c.effect](0,e,k,l,d),isNaN(c)&&(c=h),0===l&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(k=c.to.split(","),l=Number(k[0]),k=Number(k[1]),f.translate(l,k)):(h=Number(c.to),this.setAttr(f,g,h)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,
height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(AmCharts.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,d,e){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var h=f.parentNode;h&&(f=document.createElementNS(AmCharts.SVG_NS,"clipPath"),g=AmCharts.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,d,e,0,0,f),h.appendChild(f),b="#",AmCharts.baseHref&&!AmCharts.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},
text:function(a,b,c){var d=new AmCharts.AmDObject("text",this.D);a=String(a).split("\n");var e=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(e+2)*f+Math.round(e/2));g.setAttribute("x",0);g.style.fontSize=e+"px";d.node.appendChild(g)}d.node.setAttribute("y",Math.round(e/2));this.attr(d,b);this.D.addToContainer(d.node,c);return d},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},
move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new AmCharts.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,d){var e=a.node,f=
a.grad;f&&this.D.remove(f);b=document.createElementNS(AmCharts.SVG_NS,b);f=AmCharts.getUniqueId();b.setAttribute("id",f);if(!isNaN(d)){var g=0,h=0,k=0,l=0;90==d?k=100:270==d?l=100:180==d?g=100:0===d&&(h=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",h+"%");b.setAttribute("y1",k+"%");b.setAttribute("y2",l+"%")}for(d=0;d<c.length;d++)g=document.createElementNS(AmCharts.SVG_NS,"stop"),h=100*d/(c.length-1),0===d&&(h=0),g.setAttribute("offset",h+"%"),g.setAttribute("stop-color",c[d]),b.appendChild(g);
e.parentNode.appendChild(b);c="#";AmCharts.baseHref&&!AmCharts.isIE&&(c=this.removeTarget(window.location.href)+c);e.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){urlArr=a.split("#");return urlArr[0]},pattern:function(a,b,c){var d=a.node;isNaN(c)&&(c=1);var e=a.patternNode;e&&this.D.remove(e);var e=document.createElementNS(AmCharts.SVG_NS,"pattern"),f=AmCharts.getUniqueId(),g=b;b.url&&(g=b.url);var h=Number(b.width);isNaN(h)&&(h=4);var k=Number(b.height);isNaN(k)&&(k=4);h/=
c;k/=c;c=b.x;isNaN(c)&&(c=0);var l=-Math.random()*Number(b.randomX);isNaN(l)||(c=l);l=b.y;isNaN(l)&&(l=0);var m=-Math.random()*Number(b.randomY);isNaN(m)||(l=m);e.setAttribute("id",f);e.setAttribute("width",h);e.setAttribute("height",k);e.setAttribute("patternUnits","userSpaceOnUse");e.setAttribute("xlink:href",g);b.color&&(m=document.createElementNS(AmCharts.SVG_NS,"rect"),m.setAttributeNS(null,"height",h),m.setAttributeNS(null,"width",k),m.setAttributeNS(null,"fill",b.color),e.appendChild(m));this.D.image(g,
0,0,h,k,e).translate(c,l);g="#";AmCharts.baseHref&&!AmCharts.isIE&&(g=this.removeTarget(window.location.href)+g);d.setAttribute("fill","url("+g+f+")");a.patternNode=e;d.parentNode.appendChild(e)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}});AmCharts.AmDSet=AmCharts.Class({construct:function(a){this.create("g")},attr:function(a){this.R.attr(this.node,a)},move:function(a,b){this.R.move(this.node,a,b)}});AmCharts.AmLegend=AmCharts.Class({construct:function(a){this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=
this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=
!1;this.showEntries=!0;AmCharts.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];(AmCharts.ifArray(this.legendData)||AmCharts.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,d=a.divRealWidth,e=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.data);isNaN(this.fontSize)&&(this.fontSize=a.fontSize);if("right"==
b||"left"==b)this.maxColumns=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var h=a.autoMarginOffset;"bottom"==b?(this.marginBottom=h,this.marginTop=0):(this.marginTop=h,this.marginBottom=0)}var k;void 0!==c?k=AmCharts.toCoordinate(c,d):"right"!=b&&"left"!=b&&(k=a.realWidth);"outside"==b?(k=f.offsetWidth,e=f.offsetHeight,f.clientHeight&&(k=f.clientWidth,e=f.clientHeight)):(isNaN(k)||(f.style.width=k+"px"),
f.className="amChartsLegend");this.divWidth=k;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.setSize(k,e)):b=new AmCharts.AmDraw(f,k,e,a);this.container=b;this.lx=0;this.ly=8;e=this.markerSize;e>this.fontSize&&(this.ly=e/2-1);0<e&&(this.lx+=e+this.markerLabelGap);this.titleWidth=0;if(e=this.title)a=AmCharts.text(this.container,e,this.color,a.fontFamily,this.fontSize,"start",!0),a.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=a.getBBox(),this.titleWidth=
a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,c=this.marginRight,d=this.marginTop,e=this.marginBottom,f=this.horizontalGap,g=this.div,h=this.divWidth,k=this.maxColumns,l=this.verticalGap,m=this.spacing,n=h-c-b,p=0,q=0,r=this.container;
this.set&&this.set.remove();var t=r.set();this.set=t;var w=r.set();t.push(w);var v=this.entries,s,u;for(u=0;u<v.length;u++){s=v[u].getBBox();var x=s.width;x>p&&(p=x);s=s.height;s>q&&(q=s)}var x=q=0,F=f,B=0,z=0;for(u=0;u<v.length;u++){var I=v[u];this.reversedOrder&&(I=v[v.length-u-1]);s=I.getBBox();var E;this.equalWidths?E=f+x*(p+m+this.markerLabelGap):(E=F,F=F+s.width+f+m);s.height>z&&(z=s.height);E+s.width>n&&0<u&&0!==x&&(q++,x=0,E=f,F=E+s.width+f+m,B=B+z+l,z=0);I.translate(E,B);x++;!isNaN(k)&&x>=
k&&(x=0,q++,B=B+z+l,z=0);w.push(I)}s=w.getBBox();k=s.height+2*l-1;"left"==a||"right"==a?(h=s.width+2*f,g.style.width=h+b+c+"px"):h=h-b-c-1;c=AmCharts.polygon(this.container,[0,h,h,0],[0,0,k,k],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);t.push(c);t.translate(b,d);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(h-s.width)/2:"right"==this.align&&(b=f+h-s.width);w.translate(b,l+1);this.titleHeight>k&&(k=this.titleHeight);
a=k+d+e+1;0>a&&(a=0);g.style.height=Math.round(a)+"px";r.setSize(this.divWidth,a)},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;a.legendEntryWidth=this.markerSize;c||(c=this.markerType);var d=a.color,e=a.alpha;a.legendKeyColor&&(d=a.legendKeyColor());a.legendKeyAlpha&&(e=a.legendKeyAlpha());var f;!0===a.hidden&&(f=d=this.markerDisabledColor);var g=a.pattern,h=a.customMarker;h||(h=this.customMarker);var k=this.container,l=this.markerSize,m=0,n=0,p=l/2;if(this.useGraphSettings)if(m=
a.type,this.switchType=void 0,"line"==m||"step"==m||"smoothedLine"==m||"ohlc"==m)g=k.set(),a.hidden||(d=a.lineColorR,f=a.bulletBorderColorR),n=AmCharts.line(k,[0,2*l],[l/2,l/2],d,a.lineAlpha,a.lineThickness,a.dashLength),g.push(n),a.bullet&&(a.hidden||(d=a.bulletColorR),n=AmCharts.bullet(k,a.bullet,a.bulletSize,d,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(n.translate(l+1,l/2),g.push(n)),p=0,m=l,n=l/3;else{var q;a.getGradRotation&&(q=a.getGradRotation());m=a.fillColorsR;!0===a.hidden&&
(m=d);if(g=this.createMarker("rectangle",m,a.fillAlphas,a.lineThickness,d,a.lineAlpha,q,g))p=l,g.translate(p,l/2);m=l}else h?(b.path&&(h=b.path+h),g=k.image(h,0,0,l,l)):(g=this.createMarker(c,d,e,void 0,void 0,void 0,void 0,g))&&g.translate(l/2,l/2);this.addListeners(g,a);k=k.set([g]);this.switchable&&a.switchable&&k.setAttr("cursor","pointer");(f=this.switchType)&&"none"!=f&&("x"==f?(q=this.createX(),q.translate(l/2,l/2)):q=this.createV(),q.dItem=a,!0!==a.hidden?"x"==f?q.hide():q.show():"x"!=f&&
q.hide(),this.switchable||q.hide(),this.addListeners(q,a),a.legendSwitch=q,k.push(q));f=this.color;a.showBalloon&&this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=d);!0===a.hidden&&(f=this.markerDisabledColor);d=AmCharts.massReplace(this.labelText,{"[[title]]":a.title});q=this.fontSize;g&&(l<=q&&g.translate(p,l/2+this.ly-q/2+(q+2-l)/2-n),a.legendEntryWidth=g.getBBox().width);var r;d&&(d=AmCharts.fixBrakes(d),a.legendTextReal=d,r=this.labelWidth,
r=isNaN(r)?AmCharts.text(this.container,d,f,b.fontFamily,q,"start"):AmCharts.wrappedText(this.container,d,f,b.fontFamily,q,"start",!1,r,0),r.translate(this.lx+m,this.ly),k.push(r),b=r.getBBox().width,this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=k;a.legendEntry=this.entries[this.index];a.legendLabel=r;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,
a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),
this.dispatch("rollOverItem",a,b))},rollOutLabel:function(a,b){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var c=this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)}},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",
a,b))},dispatch:function(a,b,c){this.fire(a,{type:a,dataItem:b,target:this,event:c,chart:this.chart})},createValue:function(a){var b=this,c=b.fontSize;if(!1!==a.visibleInLegend){var d=b.maxLabelWidth;b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(d=a.legendEntry.getBBox().width);var e=d;if(b.valueText&&0<b.valueWidth){var f=b.color;b.useMarkerColorForValues&&(f=a.color,a.legendKeyColor&&(f=a.legendKeyColor()));!0===a.hidden&&(f=b.markerDisabledColor);var g=b.valueText,d=d+b.lx+b.markerLabelGap+
b.valueWidth,h="end";"left"==b.valueAlign&&(d-=b.valueWidth,h="start");f=AmCharts.text(b.container,g,f,b.chart.fontFamily,c,h);f.translate(d,b.ly);b.entries[b.index].push(f);e+=b.valueWidth+2*b.markerLabelGap;f.dItem=a;b.valueLabels.push(f)}b.index++;f=b.markerSize;f<c+7&&(f=c+7,AmCharts.VML&&(f+=3));c=b.container.rect(a.legendEntryWidth,0,e,f,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,c)}).mouseout(function(c){b.rollOutLabel(a,
c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=this.markerSize;return AmCharts.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,d=AmCharts.line(c,[-a,a],[-a,a]).attr(b),a=AmCharts.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([d,a])},createMarker:function(a,b,c,d,e,f,g,h){var k=this.markerSize,l=this.container;e||(e=this.markerBorderColor);
e||(e=b);isNaN(d)&&(d=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);return AmCharts.bullet(l,a,k,b,c,d,e,f,k,g,h)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,d=this.data;for(c=0;c<a.length;c++){var e=a[c],f=e.dItem,g=" ";if(d)f.value?e.text(f.value):e.text("");else{if(void 0!==f.type){var h=f.currentDataItem,k=this.periodValueText;f.legendPeriodValueText&&(k=f.legendPeriodValueText);h?(g=this.valueText,f.legendValueText&&
(g=f.legendValueText),g=b.formatString(g,h)):k&&(g=b.formatPeriodString(k,f))}else g=b.formatString(this.valueText,f);if(k=this.valueFunction)h&&(f=h),g=k(f,g);e.text(g)}}},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";AmCharts.remove(this.set)}});AmCharts.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};AmCharts.extractPeriod=function(a){var b=AmCharts.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};
AmCharts.newDate=function(a,b){return date="fff"==b?AmCharts.useUTC?new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()):new Date(a)};
AmCharts.resetDateToMin=function(a,b,c,d){void 0===d&&(d=1);var e,f,g,h,k,l,m;AmCharts.useUTC?(e=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),m=a.getUTCMilliseconds(),a=a.getUTCDay()):(e=a.getFullYear(),f=a.getMonth(),g=a.getDate(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),m=a.getMilliseconds(),a=a.getDay());switch(b){case "YYYY":e=Math.floor(e/c)*c;f=0;g=1;m=l=k=h=0;break;case "MM":f=Math.floor(f/c)*c;g=1;m=l=k=h=0;break;case "WW":0===
a&&0<d&&(a=7);g=g-a+d;m=l=k=h=0;break;case "DD":m=l=k=h=0;break;case "hh":h=Math.floor(h/c)*c;m=l=k=0;break;case "mm":k=Math.floor(k/c)*c;m=l=0;break;case "ss":l=Math.floor(l/c)*c;m=0;break;case "fff":m=Math.floor(m/c)*c}AmCharts.useUTC?(a=new Date,a.setUTCFullYear(e,f,g),a.setUTCHours(h,k,l,m)):a=new Date(e,f,g,h,k,l,m);return a};
AmCharts.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case "YYYY":c=316224E5;break;case "MM":c=26784E5;break;case "WW":c=6048E5;break;case "DD":c=864E5;break;case "hh":c=36E5;break;case "mm":c=6E4;break;case "ss":c=1E3;break;case "fff":c=1}return c*b};AmCharts.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};
AmCharts.getMaxInterval=function(a,b){var c=AmCharts.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,AmCharts.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};AmCharts.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");AmCharts.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");AmCharts.monthNames="January February March April May June July August September October November December".split(" ");AmCharts.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};
AmCharts.stringToDate=function(a,b){var c={},d=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",
period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],e=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(e=!1));var f=b,g,h,k;for(k=0;k<d.length;k++)h=d[k].period,c[h]=0,"date"==h&&(c[h]=1);for(k=0;k<d.length;k++)if(g=d[k].pattern,h=d[k].period,-1!=b.indexOf(g)){var l=AmCharts.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==
g||"L"==g)e||(l+=12);c[h]=l}AmCharts.useUTC?(d=new Date,d.setUTCFullYear(c.year,c.month,c.date),d.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):d=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return d};AmCharts.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=b.substr(c,a.length),"0"==b.charAt(0)&&(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};
AmCharts.formatDate=function(a,b,c){c||(c=AmCharts);var d,e,f,g,h,k,l,m=AmCharts.getWeekNumber(a);AmCharts.useUTC?(d=a.getUTCFullYear(),e=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),h=a.getUTCHours(),k=a.getUTCMinutes(),l=a.getUTCSeconds(),a=a.getUTCMilliseconds()):(d=a.getFullYear(),e=a.getMonth(),f=a.getDate(),g=a.getDay(),h=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),a=a.getMilliseconds());var n=String(d).substr(2,2),p=e+1;9>e&&(p="0"+p);var q="0"+g;b=b.replace(/W/g,m);m=h;24==m&&(m=0);
var r=m;10>r&&(r="0"+r);b=b.replace(/JJ/g,r);b=b.replace(/J/g,m);r=h;0===r&&(r=24,-1!=b.indexOf("H")&&f--);m=f;10>f&&(m="0"+f);var t=r;10>t&&(t="0"+t);b=b.replace(/HH/g,t);b=b.replace(/H/g,r);r=h;11<r&&(r-=12);t=r;10>t&&(t="0"+t);b=b.replace(/KK/g,t);b=b.replace(/K/g,r);r=h;0===r&&(r=12);12<r&&(r-=12);t=r;10>t&&(t="0"+t);b=b.replace(/LL/g,t);b=b.replace(/L/g,r);r=k;10>r&&(r="0"+r);b=b.replace(/NN/g,r);b=b.replace(/N/g,k);k=l;10>k&&(k="0"+k);b=b.replace(/SS/g,k);b=b.replace(/S/g,l);l=a;10>l&&(l="00"+
l);100>l&&(l="0"+l);k=a;10>k&&(k="00"+k);b=b.replace(/QQQ/g,l);b=b.replace(/QQ/g,k);b=b.replace(/Q/g,a);b=12>h?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,d);b=
b.replace(/@II@/g,n);b=b.replace(/@XXXX@/g,c.monthNames[e]);b=b.replace(/@XXX@/g,c.shortMonthNames[e]);b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,e+1);b=b.replace(/@RR@/g,m);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,q);return b=b.replace(/@P@/g,g)};
AmCharts.changeDate=function(a,b,c,d,e){if(AmCharts.useUTC)return AmCharts.changeUTCDate(a,b,c,d,e);var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setFullYear(a.getFullYear()+c*f);d||e||a.setDate(a.getDate()+1);break;case "MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);d||e||a.setDate(a.getDate()+1);break;case "DD":a.setDate(a.getDate()+c*f);break;case "WW":a.setDate(a.getDate()+c*f*7);break;case "hh":a.setHours(a.getHours()+
c*f);break;case "mm":a.setMinutes(a.getMinutes()+c*f);break;case "ss":a.setSeconds(a.getSeconds()+c*f);break;case "fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};
AmCharts.changeUTCDate=function(a,b,c,d,e){var f=-1;void 0===d&&(d=!0);void 0===e&&(e=!1);!0===d&&(f=1);switch(b){case "YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||e||a.setUTCDate(a.getUTCDate()+1);break;case "MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||e||a.setUTCDate(a.getUTCDate()+1);break;case "DD":a.setUTCDate(a.getUTCDate()+c*f);break;case "WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case "hh":a.setUTCHours(a.getUTCHours()+
c*f);break;case "mm":a.setUTCMinutes(a.getUTCMinutes()+c*f);break;case "ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case "fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a};

AmCharts.AmPieChart=AmCharts.Class({inherits:AmCharts.AmSlicedChart,construct:function(e){this.type="pie";AmCharts.AmPieChart.base.construct.call(this,e);this.cname="AmPieChart";this.pieBrightnessStep=30;this.minRadius=10;this.depth3D=0;this.startAngle=90;this.angle=this.innerRadius=0;this.startRadius="500%";this.pullOutRadius="20%";this.labelRadius=20;this.labelText="[[title]]: [[percents]]%";this.balloonText="[[title]]: [[percents]]% ([[value]])\n[[description]]";this.previousScale=1;AmCharts.applyTheme(this,
e,this.cname)},drawChart:function(){AmCharts.AmPieChart.base.drawChart.call(this);var e=this.chartData;if(AmCharts.ifArray(e)){if(0<this.realWidth&&0<this.realHeight){AmCharts.VML&&(this.startAlpha=1);var f=this.startDuration,c=this.container,b=this.updateWidth();this.realWidth=b;var h=this.updateHeight();this.realHeight=h;var d=AmCharts.toCoordinate,k=d(this.marginLeft,b),a=d(this.marginRight,b),t=d(this.marginTop,h)+this.getTitleHeight(),m=d(this.marginBottom,h),w,x,g,v=AmCharts.toNumber(this.labelRadius),
q=this.measureMaxLabel();q>this.maxLabelWidth&&(q=this.maxLabelWidth);this.labelText&&this.labelsEnabled||(v=q=0);w=void 0===this.pieX?(b-k-a)/2+k:d(this.pieX,this.realWidth);x=void 0===this.pieY?(h-t-m)/2+t:d(this.pieY,h);g=d(this.radius,b,h);g||(b=0<=v?b-k-a-2*q:b-k-a,h=h-t-m,g=Math.min(b,h),h<b&&(g/=1-this.angle/90,g>b&&(g=b)),h=AmCharts.toCoordinate(this.pullOutRadius,g),g=(0<=v?g-1.8*(v+h):g-1.8*h)/2);g<this.minRadius&&(g=this.minRadius);h=d(this.pullOutRadius,g);t=AmCharts.toCoordinate(this.startRadius,
g);d=d(this.innerRadius,g);d>=g&&(d=g-1);m=AmCharts.fitToBounds(this.startAngle,0,360);0<this.depth3D&&(m=270<=m?270:90);m-=90;b=g-g*this.angle/90;for(k=0;k<e.length;k++)if(a=e[k],!0!==a.hidden&&0<a.percents){var n=360*a.percents/100,q=Math.sin((m+n/2)/180*Math.PI),y=-Math.cos((m+n/2)/180*Math.PI)*(b/g),p=this.outlineColor;p||(p=a.color);var z=this.alpha;isNaN(a.alpha)||(z=a.alpha);p={fill:a.color,stroke:p,"stroke-width":this.outlineThickness,"stroke-opacity":this.outlineAlpha,"fill-opacity":z};a.url&&
(p.cursor="pointer");p=AmCharts.wedge(c,w,x,m,n,g,b,d,this.depth3D,p,this.gradientRatio,a.pattern);this.addEventListeners(p,a);a.startAngle=m;e[k].wedge=p;0<f&&(this.chartCreated||p.setAttr("opacity",this.startAlpha));a.ix=q;a.iy=y;a.wedge=p;a.index=k;if(this.labelsEnabled&&this.labelText&&a.percents>=this.hideLabelsPercent){var l=m+n/2;360<l&&(l-=360);var r=v;isNaN(a.labelRadius)||(r=a.labelRadius);var n=w+q*(g+r),z=x+y*(g+r),A,u=0;if(0<=r){var B;90>=l&&0<=l?(B=0,A="start",u=8):90<=l&&180>l?(B=1,
A="start",u=8):180<=l&&270>l?(B=2,A="end",u=-8):270<=l&&360>l&&(B=3,A="end",u=-8);a.labelQuarter=B}else A="middle";var l=this.formatString(this.labelText,a),s=this.labelFunction;s&&(l=s(a,l));s=a.labelColor;s||(s=this.color);l=AmCharts.wrappedText(c,l,s,this.fontFamily,this.fontSize,A,!1,this.maxLabelWidth);l.translate(n+1.5*u,z);l.node.style.pointerEvents="none";a.tx=n+1.5*u;a.ty=z;0<=r?(r=l.getBBox(),s=AmCharts.rect(c,r.width+5,r.height+5,"#FFFFFF",.005),s.translate(n+1.5*u+r.x,z+r.y),a.hitRect=
s,p.push(l),p.push(s)):this.freeLabelsSet.push(l);a.label=l;a.tx=n;a.tx2=n+u;a.tx0=w+q*g;a.ty0=x+y*g}n=d+(g-d)/2;a.pulled&&(n+=this.pullOutRadiusReal);a.balloonX=q*n+w;a.balloonY=y*n+x;a.startX=Math.round(q*t);a.startY=Math.round(y*t);a.pullX=Math.round(q*h);a.pullY=Math.round(y*h);this.graphsSet.push(p);(0===a.alpha||0<f&&!this.chartCreated)&&p.hide();m+=360*a.percents/100}0<v&&!this.labelRadiusField&&this.arrangeLabels();this.pieXReal=w;this.pieYReal=x;this.radiusReal=g;this.innerRadiusReal=d;0<
v&&this.drawTicks();this.initialStart();this.setDepths()}(e=this.legend)&&e.invalidateSize()}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},setDepths:function(){var e=this.chartData,f;for(f=0;f<e.length;f++){var c=e[f],b=c.wedge,c=c.startAngle;0<=c&&180>c?b.toFront():180<=c&&b.toBack()}},arrangeLabels:function(){var e=this.chartData,f=e.length,c,b;for(b=f-1;0<=b;b--)c=e[b],0!==c.labelQuarter||c.hidden||this.checkOverlapping(b,c,0,!0,0);for(b=0;b<f;b++)c=e[b],1!=c.labelQuarter||c.hidden||
this.checkOverlapping(b,c,1,!1,0);for(b=f-1;0<=b;b--)c=e[b],2!=c.labelQuarter||c.hidden||this.checkOverlapping(b,c,2,!0,0);for(b=0;b<f;b++)c=e[b],3!=c.labelQuarter||c.hidden||this.checkOverlapping(b,c,3,!1,0)},checkOverlapping:function(e,f,c,b,h){var d,k,a=this.chartData,t=a.length,m=f.label;if(m){if(!0===b)for(k=e+1;k<t;k++)a[k].labelQuarter==c&&(d=this.checkOverlappingReal(f,a[k],c))&&(k=t);else for(k=e-1;0<=k;k--)a[k].labelQuarter==c&&(d=this.checkOverlappingReal(f,a[k],c))&&(k=0);!0===d&&100>
h&&(d=f.ty+3*f.iy,f.ty=d,m.translate(f.tx2,d),f.hitRect&&(m=m.getBBox(),f.hitRect.translate(f.tx2+m.x,d+m.y)),this.checkOverlapping(e,f,c,b,h+1))}},checkOverlappingReal:function(e,f,c){var b=!1,h=e.label,d=f.label;e.labelQuarter!=c||e.hidden||f.hidden||!d||(h=h.getBBox(),c={},c.width=h.width,c.height=h.height,c.y=e.ty,c.x=e.tx,e=d.getBBox(),d={},d.width=e.width,d.height=e.height,d.y=f.ty,d.x=f.tx,AmCharts.hitTest(c,d)&&(b=!0));return b}});
AmCharts.themes.light = {

	themeName:"light",

	AmChart: {
		color: "#000000", backgroundColor: "#FFFFFF"
	},

	AmCoordinateChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmStockChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"]
	},

	AmSlicedChart: {
		colors: ["#67b7dc", "#fdd400", "#84b761", "#cc4748", "#cd82ad", "#2f4074", "#448e4d", "#b7b83f", "#b9783f", "#b93e3d", "#913167"],
		outlineAlpha: 1,
		outlineThickness: 2,
		labelTickColor: "#000000",
		labelTickAlpha: 0.3
	},

	AmRectangularChart: {
		zoomOutButtonColor: '#000000',
		zoomOutButtonRollOverAlpha: 0.15,
		zoomOutButtonImage: "lens.png"
	},

	AxisBase: {
		axisColor: "#000000",
		axisAlpha: 0.3,
		gridAlpha: 0.1,
		gridColor: "#000000"
	},

	ChartScrollbar: {
		backgroundColor: "#000000",
		backgroundAlpha: 0.12,
		graphFillAlpha: 0.5,
		graphLineAlpha: 0,
		selectedBackgroundColor: "#FFFFFF",
		selectedBackgroundAlpha: 0.4,
		gridAlpha: 0.15
	},

	ChartCursor: {
		cursorColor: "#000000",
		color: "#FFFFFF",
		cursorAlpha: 0.5
	},

	AmLegend: {
		color: "#000000"
	},

	AmGraph: {
		lineAlpha: 0.9
	},
	GaugeArrow: {
		color: "#000000",
		alpha: 0.8,
		nailAlpha: 0,
		innerRadius: "40%",
		nailRadius: 15,
		startWidth: 15,
		borderAlpha: 0.8,
		nailBorderAlpha: 0
	},

	GaugeAxis: {
		tickColor: "#000000",
		tickAlpha: 1,
		tickLength: 15,
		minorTickLength: 8,
		axisThickness: 3,
		axisColor: '#000000',
		axisAlpha: 1,
		bandAlpha: 0.8
	},

	TrendLine: {
		lineColor: "#c03246",
		lineAlpha: 0.8
	},

	// ammap
	AreasSettings: {
		alpha: 0.8,
		color: "#67b7dc",
		colorSolid: "#003767",
		unlistedAreasAlpha: 0.4,
		unlistedAreasColor: "#000000",
		outlineColor: "#FFFFFF",
		outlineAlpha: 0.5,
		outlineThickness: 0.5,
		rollOverColor: "#3c5bdc",
		rollOverOutlineColor: "#FFFFFF",
		selectedOutlineColor: "#FFFFFF",
		selectedColor: "#f15135",
		unlistedAreasOutlineColor: "#FFFFFF",
		unlistedAreasOutlineAlpha: 0.5
	},

	LinesSettings: {
		color: "#000000",
		alpha: 0.8
	},

	ImagesSettings: {
		alpha: 0.8,
		labelColor: "#000000",
		color: "#000000",
		labelRollOverColor: "#3c5bdc"
	},

	ZoomControl: {
		buttonRollOverColor: "#3c5bdc",
		buttonFillColor: "#3994e2",
		buttonBorderColor: "#3994e2",
		buttonFillAlpha: 0.8,
		gridBackgroundColor: "#FFFFFF",
		buttonBorderAlpha:0,
		buttonCornerRadius:2,
		gridColor:"#FFFFFF",
		gridBackgroundColor:"#000000",
		buttonIconAlpha:0.6,
		gridAlpha: 0.6,
		buttonSize:20
	},

	SmallMap: {
		mapColor: "#000000",
		rectangleColor: "#f15135",
		backgroundColor: "#FFFFFF",
		backgroundAlpha: 0.7,
		borderThickness: 1,
		borderAlpha: 0.8
	},

	// the defaults below are set using CSS syntax, you can use any existing css property
	// if you don't use Stock chart, you can delete lines below
	PeriodSelector: {
		color: "#000000"
	},

	PeriodButton: {
		color: "#000000",
		background: "transparent",
		opacity: 0.7,
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		boxSizing: "border-box"
	},

	PeriodButtonSelected: {
		color: "#000000",
		backgroundColor: "#b9cdf5",
		border: "1px solid rgba(0, 0, 0, .3)",
		MozBorderRadius: "5px",
		borderRadius: "5px",
		margin: "1px",
		outline: "none",
		opacity: 1,
		boxSizing: "border-box"
	},

	PeriodInputField: {
		color: "#000000",
		background: "transparent",
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	},

	DataSetSelector: {

		color: "#000000",
		selectedBackgroundColor: "#b9cdf5",
		rollOverBackgroundColor: "#a8b0e4"
	},

	DataSetCompareList: {
		color: "#000000",
		lineHeight: "100%",
		boxSizing: "initial",
		webkitBoxSizing: "initial",
		border: "1px solid rgba(0, 0, 0, .3)"
	},

	DataSetSelect: {
		border: "1px solid rgba(0, 0, 0, .3)",
		outline: "none"
	}

};