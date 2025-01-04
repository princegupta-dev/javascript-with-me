With the introduction of ES6 (ECMAScript 2015), JavaScript added the class syntax, which provides a cleaner and more traditional way to work with objects and inheritance (similar to class-based OOP languages like Java, Python, etc.). However, it's important to note that even though JavaScript uses class syntax, it is still function-based under the hood.

The class syntax is just a syntactic sugar (a more readable and modern way) on top of the function-based system.

```js
class Car {
  constructor(model, color, year) {
    this.model = model;
    this.color = color;
    this.year = year;
  }

  displayCarDetails() {
    console.log(`${this.year} ${this.color} ${this.model}`);
  }
}

const car1 = new Car("Tesla Model 3", "Red", 2023);
car1.displayCarDetails(); // 2023 Red Tesla Model 3
```

# Prototypes & Inheritance

In JavaScript, prototypes are the foundation of inheritance. Every object in JavaScript is linked to another object called its prototype. This forms a prototype chain that enables inheritance and shared methods across multiple objects.

## 1. What is a Prototype?

A prototype is an object from which other objects inherit properties and methods.
Every JavaScript object has an internal link to its prototype (**proto**).

## 2. Prototype Chain

When accessing a property on an object, JavaScript looks for the property on the object itself.
If not found, it searches up the prototype chain until the property is found or the chain ends at null.

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype and acts as the final link in this prototype chain. It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript.

There are several ways to specify the [[Prototype]] of an object, which are listed in a later section. For now, we will use the **proto** syntax for illustration. It's worth noting that the { **proto**: ... } syntax is different from the obj.**proto** accessor: the former is standard and not deprecated.

In an object literal like { a: 1, b: 2, **proto**: c }, the value c (which has to be either null or another object) will become the [[Prototype]] of the object represented by the literal, while the other keys like a and b will become the own properties of the object. This syntax reads very naturally, since [[Prototype]] is just an "internal property" of the object.

```js
const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
  },
};

// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype (we will explain
// what that means later).
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.
// This is the end of the prototype chain, as null,
// by definition, has no [[Prototype]].
// Thus, the full prototype chain looks like:
// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> Object.prototype ---> null

console.log(o.a); // 1
// Is there an 'a' own property on o? Yes, and its value is 1.

console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing

console.log(o.c); // 4
// Is there a 'c' own property on o? No, check its prototype.
// Is there a 'c' own property on o.[[Prototype]]? Yes, its value is 4.

console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and
// there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.
```

```js
const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[Prototype]]. It's specified here
  // as another object literal.
  __proto__: {
    b: 3,
    c: 4,
    __proto__: {
      d: 5,
    },
  },
};

// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> { d: 5 } ---> Object.prototype ---> null

console.log(o.d); // 5
```

## Inheriting "methods"

JavaScript does not have "methods" in the form that class-based languages define them. In JavaScript, any function can be added to an object in the form of a property. An inherited function acts just as any other property, including property shadowing as shown above (in this case, a form of method overriding).

When an inherited function is executed, the value of this points to the inheriting object, not to the prototype object where the function is an own property.

```js
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method()); // 3
// When calling parent.method in this case, 'this' refers to parent

// child is an object that inherits from parent
const child = {
  __proto__: parent,
};
console.log(child.method()); // 3
// When child.method is called, 'this' refers to child.
// So when child inherits the method of parent,
// The property 'value' is sought on child. However, since child
// doesn't have an own property called 'value', the property is
// found on the [[Prototype]], which is parent.value.

child.value = 4; // assign the value 4 to the property 'value' on child.
// This shadows the 'value' property on parent.
// The child object now looks like:
// { value: 4, __proto__: { value: 2, method: [Function] } }
console.log(child.method()); // 5
// Since child now has the 'value' property, 'this.value' means
// child.value instead
```

The reason the parent's value property is not updated to 4 when you set child.value = 4 is because of JavaScript's prototypal inheritance and property shadowing.

Here's what's happening step by step:

## child.**proto** = parent;

child inherits from parent through the prototype chain.
When you call child.method(), it looks for method in child. Since child doesn’t have it, it finds method on the prototype (parent).

## 2. child.value = 4;

This adds a new property value directly to child (own property).
child now has its own value property separate from parent.value.
This shadows the value property on parent.
parent.value remains 2 because no direct modification is made to it.

## Why Parent's Value Is Not Updated:

Prototypes in JavaScript work by reference, but own properties on an object don't affect the prototype.
When child.value = 4 is executed, JavaScript doesn't overwrite parent.value. Instead, it creates a new value property directly on child.

## How this Works in method():

When calling child.method(), this refers to child.
this.value looks for the value property on child first. Since child has its own value, it uses that (4).
If child didn't have value, it would fallback to parent.value through the prototype chain.

Key Concept:
Prototype properties are not updated when you set a value on an inheriting object.
Only direct properties on the object are modified.

## Shadowing

Shadowing in JavaScript happens when a property or variable in a child scope (like inside a function or object) hides a property or variable with the same name in the outer (parent) scope.

## How Shadowing Works:

The inner (local) variable or property takes precedence over the outer (global) one.
The outer variable/property is not overwritten—it still exists but is inaccessible directly from the inner scope while shadowed.

```js
let value = 10;

function test() {
  let value = 20; // Shadows the outer 'value'
  console.log(value); // 20 (inner 'value' is used)
}

test();
console.log(value); // 10 (outer 'value' remains unchanged)
```

## Example 2: Object Property Shadowing

```js
const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

const child = {
  __proto__: parent,
  value: 5, // Shadows 'value' from parent
};

console.log(child.method()); // 6 (child.value is used)
console.log(parent.method()); // 3 (parent.value is used)
```

child shadows parent.value by defining its own value property.
child.method() uses child.value, not parent.value.

## Avoiding Shadowing Issues:

Use const and let to reduce unintentional redeclaration.
Unique variable names for inner scopes.
Be mindful of this context when dealing with prototypes and inheritance.

```js
// Object literals (without the `__proto__` key) automatically
// have `Object.prototype` as their `[[Prototype]]`
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true

// Array literals automatically have `Array.prototype` as their `[[Prototype]]`
const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true

// RegExp literals automatically have `RegExp.prototype` as their `[[Prototype]]`
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true
```

It may be interesting to note that due to historical reasons, some built-in constructors' prototype property are instances themselves. For example, Number.prototype is a number 0, Array.prototype is an empty array, and RegExp.prototype is /(?:)/.

```js
Number.prototype + 1; // 1
Array.prototype.map((x) => x + 1); // []
String.prototype + "a"; // "a"
RegExp.prototype.source; // "(?:)"
Function.prototype(); // Function.prototype is a no-op function by itself
```

However, this is not the case for user-defined constructors, nor for modern constructors like Map.

```c
Map.prototype.get(1);
// Uncaught TypeError: get method called on incompatible Map.prototype
```

## Different ways of creating and mutating prototype chains

We have encountered many ways to create objects and change their prototype chains. We will systematically summarize the different ways, comparing each approach's pros and cons.

### Objects created with syntax constructs

```js
const o = { a: 1 };
// The newly created object o has Object.prototype as its [[Prototype]]
// Object.prototype has null as its [[Prototype]].
// o ---> Object.prototype ---> null

const b = ["yo", "sup", "?"];
// Arrays inherit from Array.prototype
// (which has methods indexOf, forEach, etc.)
// The prototype chain looks like:
// b ---> Array.prototype ---> Object.prototype ---> null

function f() {
  return 2;
}
// Functions inherit from Function.prototype
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null

const p = { b: 2, __proto__: o };
// It is possible to point the newly created object's [[Prototype]] to
// another object via the __proto__ literal property. (Not to be confused
// with Object.prototype.__proto__ accessors)
// p ---> o ---> Object.prototype ---> null
```

## With constructor functions

```js
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype.addVertex = function (v) {
  this.vertices.push(v);
};

const g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.
```

Constructor functions have been available since very early JavaScript. Therefore, it is very fast, very standard, and very JIT-optimizable. However, it's also hard to "do properly" because methods added this way are enumerable by default, which is inconsistent with the class syntax or how built-in methods behave. Doing longer inheritance chains is also error-prone, as previously demonstrated.

## With Object.create()

Calling Object.create() creates a new object. The [[Prototype]] of this object is the first argument of the function:

```js
const a = { a: 1 };
// a ---> Object.prototype ---> null

const b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (inherited)

const c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

const d = Object.create(null);
// d ---> null (d is an object that has null directly as its prototype)
console.log(d.hasOwnProperty);
// undefined, because d doesn't inherit from Object.prototype
```

Similar to the **proto** key in object initializers, Object.create() allows directly setting the prototype of an object at creation time, which permits the runtime to further optimize the object. It also allows the creation of objects with null prototype, using Object.create(null). The second parameter of Object.create() allows you to precisely specify the attributes of each property in the new object, which can be a double-edged sword:

It allows you to create non-enumerable properties, etc., during object creation, which is not possible with object literals.
It is much more verbose and error-prone than object literals.
It may be slower than object literals, especially when creating many properties.

## With classes

```js
class Rectangle {
  constructor(height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }
}

class FilledRectangle extends Rectangle {
  constructor(height, width, color) {
    super(height, width);
    this.name = "Filled rectangle";
    this.color = color;
  }
}

const filledRectangle = new FilledRectangle(5, 10, "blue");
// filledRectangle ---> FilledRectangle.prototype ---> Rectangle.prototype ---> Object.prototype ---> null
```

## With Object.setPrototypeOf()

While all methods above will set the prototype chain at object creation time, Object.setPrototypeOf() allows mutating the [[Prototype]] internal property of an existing object. It can even force a prototype on a prototype-less object created with Object.create(null) or remove the prototype of an object by setting it to null.

```js
const obj = { a: 1 };
const anotherObj = { b: 2 };
Object.setPrototypeOf(obj, anotherObj);
// obj ---> anotherObj ---> Object.prototype ---> null
```

## Object.create()

Object.create() in JavaScript is a method used to create a new object with a specified prototype. It's a fundamental part of JavaScript's prototype-based inheritance system.

## syntax

```js
const obj = Object.create(prototype, propertiesObject);
```

## How Object.create() Works:

It creates a new object and sets its prototype (**proto**) to the object passed as the first argument.
This allows the new object to inherit directly from the specified object.

### example

```js
const carPrototype = {
  displayDetails() {
    console.log(`${this.model} - ${this.color}`);
  },
};

const car1 = Object.create(carPrototype);
car1.model = "Tesla Model 3";
car1.color = "Red";

car1.displayDetails(); // Tesla Model 3 - Red
```

car1 inherits the displayDetails method from carPrototype.
This is prototypal inheritance, a core concept in JavaScript.

## Difference between proto and prototype

**proto** is a reference to the prototype of the object instance. It points to the object that the instance inherits from.

```js
const car = {
  wheels: 4,
};

const tesla = Object.create(car); // tesla's __proto__ points to car

console.log(tesla.__proto__); // { wheels: 4 }
console.log(tesla.wheels); // 4 (inherited from car)
```

### Conclusion

JavaScript may be a bit confusing for developers coming from Java or C++, as it's all dynamic, all runtime, and it has no static types at all. Everything is either an object (instance) or a function (constructor), and even functions themselves are instances of the Function constructor. Even the "classes" as syntax constructs are just constructor functions at runtime.

All constructor functions in JavaScript have a special property called prototype, which works with the new operator. The reference to the prototype object is copied to the internal [[Prototype]] property of the new instance. For example, when you do const a1 = new A(), JavaScript (after creating the object in memory and before running function A() with this defined to it) sets a1.[[Prototype]] = A.prototype. When you then access properties of the instance, JavaScript first checks whether they exist on that object directly, and if not, it looks in [[Prototype]]. [[Prototype]] is looked at recursively, i.e. a1.doSomething, Object.getPrototypeOf(a1).doSomething, Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething etc., until it's found or Object.getPrototypeOf returns null. This means that all properties defined on prototype are effectively shared by all instances, and you can even later change parts of prototype and have the changes appear in all existing instances.

If, in the example above, you do const a1 = new A(); const a2 = new A();, then a1.doSomething would actually refer to Object.getPrototypeOf(a1).doSomething — which is the same as the A.prototype.doSomething you defined, i.e. Object.getPrototypeOf(a1).doSomething === Object.getPrototypeOf(a2).doSomething === A.prototype.doSomething.

It is essential to understand the prototypal inheritance model before writing complex code that makes use of it. Also, be aware of the length of the prototype chains in your code and break them up if necessary to avoid possible performance problems. Further, the native prototypes should never be extended unless it is for the sake of compatibility with newer JavaScript features.
