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
