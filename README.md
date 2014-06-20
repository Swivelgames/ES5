ES5
===

Various polyfills for browsers that lack support for various items included in the JavaScript implementation of ECMAScript 5 (JavaScript ~1.8.5)

The following items are polyfilled:

* Array.prototype.indexOf( searchElement );
* Array.prototype.filter( filter, that );
* Object.getPrototypeOf( object );
* Object.defineProperty( object, property, descriptor );
* Object.defineProperties( object, propertyDescriptorsObj );
* Object.create( object, prototype );
* Object.keys( object );
* Object.getOwnPropertyNames( object );
* Object.getOwnPropertyDescriptor( object, elementKey );
* String.prototype.trim();
* window.addEventListener();