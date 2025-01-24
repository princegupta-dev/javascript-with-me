## Question 1. Explain prototypal inheritance in JavaScript.

## Que 2. How does the Object.create() method work?

The Object.create() method creates a new object with the specified prototype object and properties. It provides an easy way to set up inheritance between objects.

```js
const proto = {
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};

const obj = Object.create(proto);
obj.name = "Alice";
obj.greet(); // Output: "Hello, Alice"
```

## Ques 3 What are ES6 classes, and how do they relate to prototypes?

ES6 classes are syntactic sugar over JavaScript's prototypal inheritance. They provide a cleaner, more concise, and familiar syntax for creating objects and managing inheritance. Although they look like classes in other object-oriented languages, they still rely on prototypes behind the scenes.

```js
class Person {
  constructor(name, age) {
    this.name = name; // Instance property
    this.age = age;
  }

  greet() {
    // Method on the prototype
    console.log(`Hello, my name is ${this.name}.`);
  }

  static info() {
    // Static method
    console.log("This is a static method.");
  }
}

// Create an instance
const person1 = new Person("Alice", 30);
person1.greet(); // "Hello, my name is Alice."
Person.info(); // "This is a static method."
```

## Question 4. How would you implement a mixin pattern in JavaScript?

The mixin pattern in JavaScript is a way to add reusable functionality to classes or objects without using inheritance. It's particularly useful when you want to share functionality among multiple classes without creating a rigid class hierarchy.

```js
const sayHelloMixin = {
  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const walkMixin = {
  walk() {
    console.log(`${this.name} is walking`);
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

// Apply the mixins
Object.assign(Person.prototype, sayHelloMixin, walkMixin);

const person = new Person("Alice");
person.sayHello(); // Output: Hello, my name is Alice
person.walk(); // Output: Alice is walking
```

## Question 5. Explain how Object.freeze(), Object.seal(), and Object.preventExtensions() work.

1. Object.freeze()
   Purpose: Prevents any modifications to an object.

Properties cannot be added, removed, or changed (neither values nor descriptors).
The object becomes immutable.
Key Features:

You cannot add new properties.
You cannot delete existing properties.
You cannot modify the values or reassign properties.
You cannot modify the property descriptors (e.g., make a writable property writable again).

```js
const obj = { name: "John", age: 25 };
Object.freeze(obj);

obj.age = 30; // Fails silently in non-strict mode or throws an error in strict mode
obj.newProp = "Hello"; // Fails silently or throws an error
delete obj.name; // Fails silently or throws an error

console.log(obj); // { name: "John", age: 25 }
```

2. Object.seal()
   Purpose: Prevents the addition or removal of properties, but allows modification of existing property values.

The object becomes sealed—no new properties can be added, and existing properties cannot be deleted, but their values can still be changed (if writable: true).
Key Features:

You cannot add new properties.
You cannot delete existing properties.
You can modify the values of existing properties (if writable).
You cannot modify property descriptors (e.g., make a property configurable again).

```js
const obj = { name: "Alice", age: 30 };
Object.seal(obj);

obj.age = 35; // Allowed
obj.newProp = "Hi"; // Fails silently or throws an error
delete obj.name; // Fails silently or throws an error

console.log(obj); // { name: "Alice", age: 35 }
```

Object.preventExtensions()
Purpose: Prevents the addition of new properties to an object, but existing properties can still be modified or deleted.

The object becomes non-extensible—new properties cannot be added, but existing ones can be deleted or changed.
Key Features:

You cannot add new properties.
You can delete existing properties.
You can modify the values of existing properties (if writable).
Property descriptors remain editable (e.g., you can still make a property non-configurable).

```js
const obj = { name: "Bob", age: 40 };
Object.preventExtensions(obj);

obj.age = 45; // Allowed
delete obj.name; // Allowed
obj.newProp = "Hi"; // Fails silently or throws an error

console.log(obj); // { age: 45 }
```

## Question 6. How do you merge objects in JavaScript?

**Object.assign()**Method
Description: Object.assign() copies properties from one or more source objects to a target object. It mutates the target object.

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = Object.assign({}, obj1, obj2);

console.log(merged); // { a: 1, b: 3, c: 4 }
```

**Using the Spread Operator (...)**
Description: The spread operator is a concise way to copy and merge objects. It creates a shallow copy of the source objects.

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = { ...obj1, ...obj2 };

console.log(merged); // { a: 1, b: 3, c: 4 }
```

Similar to Object.assign(), later objects overwrite earlier ones in case of key conflicts.

**Using a Custom Function (Deep Merge)**
Description: For nested objects, you may need a deep merge where child objects are merged recursively instead of being replaced. You can write a custom function for this.

```js
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const obj1 = { a: 1, b: { x: 10, y: 20 } };
const obj2 = { b: { y: 30, z: 40 }, c: 3 };

const merged = deepMerge({}, obj1, obj2);
console.log(merged); // { a: 1, b: { x: 10, y: 30, z: 40 }, c: 3 }
```

**Using a Third-Party Library (e.g., Lodash)**
Description: Libraries like Lodash provide a convenient method (\_.merge()) for deep merging objects.

```js
const _ = require("lodash");

const obj1 = { a: 1, b: { x: 10, y: 20 } };
const obj2 = { b: { y: 30, z: 40 }, c: 3 };

const merged = _.merge({}, obj1, obj2);

console.log(merged); // { a: 1, b: { x: 10, y: 30, z: 40 }, c: 3 }
```

## Question 7. What are the differences between shallow and deep copies of objects?

The main difference between shallow copies and deep copies of objects in JavaScript lies in how they handle nested objects or references.

## Shallow Copy

A shallow copy duplicates the top-level properties of an object. However, if the object contains references to other objects (nested objects or arrays), the references are copied, not the actual nested objects. This means both the original and copied objects share the same reference to the nested object, and changes to the nested object in one will affect the other.
Characteristics:
Only the top level is copied.
Nested objects/arrays are shared by reference.
Not completely independent.

```js
const obj1 = {
  name: "John",
  details: {
    age: 30,
    city: "New York",
  },
};

// Shallow copy using Object.assign()
const shallowCopy = Object.assign({}, obj1);

// Modifying the nested object
shallowCopy.details.age = 35;

console.log(obj1.details.age); // 35 (affected)
console.log(shallowCopy.details.age); // 35
```

Here, modifying shallowCopy.details also changes obj1.details because they share the same reference.

Ways to Create a Shallow Copy:
Using Object.assign():

```js
const shallowCopy = Object.assign({}, originalObject);
```

Using the Spread Operator (...):

```js
const shallowCopy = { ...originalObject };
```

**Deep Copy**
A deep copy duplicates all levels of an object, including nested objects or arrays. It creates completely independent copies of all properties, meaning changes in the copied object will not affect the original object and vice versa.

Characteristics:
All levels are recursively copied.
No shared references between the original and the copy.
Completely independent.

```js
const obj1 = {
  name: "John",
  details: {
    age: 30,
    city: "New York",
  },
};

// Deep copy using structured cloning
const deepCopy = JSON.parse(JSON.stringify(obj1));

// Modifying the nested object
deepCopy.details.age = 35;

console.log(obj1.details.age); // 30 (unaffected)
console.log(deepCopy.details.age); // 35
```

Here, deepCopy is a completely independent copy of obj1, so changes in one do not affect the other.

## Ways to Create a Deep Copy:

### Using JSON.stringify() and JSON.parse():

Converts the object to a JSON string and parses it back to a new object.
Limitations: Does not handle non-JSON-compatible data types like functions, undefined, Infinity, etc.

```js
const deepCopy = JSON.parse(JSON.stringify(originalObject));
```

**Using a Recursive Function:**

Recursively copy all properties, including nested objects or arrays.

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
```

## Question 8. How do you iterate over object properties safely?

To iterate over object properties safely in JavaScript, you can use various methods depending on the use case. Here are the most common and reliable approaches:

1. for...in Loop
   Description: Iterates over all enumerable properties of an object, including those inherited from the prototype chain.

Key Point: Use Object.hasOwnProperty() to ensure you're only working with the object's own properties.

```js
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    // Filters out inherited properties
    console.log(`${key}: ${obj[key]}`);
  }
}
```

2. Object.keys()
   Description: Returns an array of the object's own enumerable property keys, excluding inherited properties.

Best Use Case: When you need only the keys.

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj).forEach((key) => {
  console.log(`${key}: ${obj[key]}`);
});
```

3. Object.entries()
   Description: Returns an array of key-value pairs for the object's own enumerable properties. You can directly destructure these pairs.

Best Use Case: When you need both keys and values.

```js
const obj = { a: 1, b: 2, c: 3 };

Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

4. Object.values()
   Description: Returns an array of the object's own enumerable property values.

Best Use Case: When you need only the values.

```js
const obj = { a: 1, b: 2, c: 3 };

Object.values(obj).forEach((value) => {
  console.log(value);
});
```

5. Using for...of with Object Methods
   Description: You can combine for...of with Object.keys(), Object.entries(), or Object.values() for a more modern iteration.

```js
const obj = { a: 1, b: 2, c: 3 };

for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

6. Reflect.ownKeys()
   Description: Returns an array of all property keys (including non-enumerable and symbol properties) that belong to the object.

Best Use Case: When you need to handle non-enumerable or symbol properties.

```js
const obj = { a: 1, b: 2, [Symbol("id")]: 123 };

Reflect.ownKeys(obj).forEach((key) => {
  console.log(`${key.toString()}: ${obj[key]}`);
});
```

7. Safeguard with Object.hasOwn()
   Description: Use Object.hasOwn() (added in ES2022) to safely check if a property belongs to the object itself and not its prototype.

```js
const obj = { a: 1, b: 2 };

for (const key in obj) {
  if (Object.hasOwn(obj, key)) {
    console.log(`${key}: ${obj[key]}`);
  }
}
```

## Question 9. Explain the hasOwnProperty method and its use case.

The hasOwnProperty method is a built-in function in JavaScript, available on all objects through the prototype chain. It is used to check whether a specific property exists directly on the object itself, rather than being inherited through the object's prototype chain.

**object**: The object on which you are checking the property.
**property**: The name of the property (as a string) to check for.

**Return Value:**
Returns true if the object contains the specified property as a direct property.
Returns false if the property is not present or is inherited from the prototype chain.

**Use Case:**
The hasOwnProperty method is particularly useful when:

**Avoiding Prototype Pollution**: You want to ensure that the property belongs directly to the object and not inherited from its prototype chain.
**Safe Object Iteration:** When iterating over an object's properties using a for...in loop, it includes both own and inherited properties. Using hasOwnProperty ensures you're dealing only with the object's own properties.

```js
const person = {
  name: "Alice",
  age: 25,
};

// Adding a property to the prototype
Object.prototype.gender = "Female";

// Checking properties
console.log(person.hasOwnProperty("name")); // true (direct property)
console.log(person.hasOwnProperty("gender")); // false (inherited property)

// Using a for...in loop
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key); // Outputs: "name", "age"
  }
}
```

## Why Not Use in Operator?

The in operator checks for the existence of a property in both the object and its prototype chain:

```js
console.log("gender" in person); // true
```

This can lead to unintended behavior if inherited properties are not filtered out.

**Practical Scenarios:**
Prevent Prototype Pollution Attacks: For example, when dealing with user input objects, hasOwnProperty ensures you're only accessing safe properties:

```js
const userInput = { username: "John" };
console.log(userInput.hasOwnProperty("constructor")); // false (safe check)
```

Iterating over JSON-like objects: When working with raw objects (e.g., data from an API), hasOwnProperty ensures you handle only direct keys:

```js
const data = { id: 1, name: "Product" };
for (let key in data) {
  if (data.hasOwnProperty(key)) {
    console.log(`${key}: ${data[key]}`);
  }
}
```

By using hasOwnProperty, you can avoid bugs and security issues caused by unintentionally accessing prototype properties.

## Question 10. What are symbols, and how do they enhance object properties?

Symbols are a unique and immutable primitive data type introduced in ES6 (ECMAScript 2015). They are used as keys for object properties to ensure that each property is unique and cannot accidentally clash with other property keys, even if they have the same name.

```js
const mySymbol = Symbol(description);
```

**description**: An optional string used only for debugging or logging purposes. It does not affect the uniqueness of the Symbol.

### Key Characteristics of Symbols:

**Unique and Immutable:**

Each Symbol is guaranteed to be unique, even if two Symbols have the same description.

```js
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false
```

**Not Automatically Coerced to Strings:**

Unlike strings, Symbols cannot be implicitly converted to a string.

```js
const sym = Symbol("test");
console.log(`Value: ${sym}`); // TypeError
console.log(sym.toString()); // "Symbol(test)" (explicit conversion)
```

**Non-Enumerable**:

Symbol properties are not included in loops like for...in or Object.keys().

```js
const obj = { [Symbol("hidden")]: "secret" };
console.log(Object.keys(obj)); // []
```

### How Symbols Enhance Object Properties:

**Avoid Key Collisions:**

Symbols ensure that property keys are unique, preventing accidental overwrites or clashes.

```js
const obj = {};
const sym1 = Symbol("key");
const sym2 = Symbol("key");
obj[sym1] = "Value 1";
obj[sym2] = "Value 2";
console.log(obj[sym1]); // 'Value 1'
console.log(obj[sym2]); // 'Value 2'
```

**Create Hidden Properties:**

Symbol properties are not included in standard property enumeration methods like Object.keys() or for...in.

```js
const obj = {
  visible: "I am visible",
  [Symbol("hidden")]: "I am hidden",
};

console.log(Object.keys(obj)); // ['visible']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(hidden)]
```

**Use in Frameworks and Libraries:**

Symbols are widely used to define internal, "hidden" behavior or APIs in libraries without affecting user-defined properties.

```js
const toStringTag = Symbol.toStringTag;
class MyClass {
  get [toStringTag]() {
    return "MyClass";
  }
}
console.log(Object.prototype.toString.call(new MyClass())); // [object MyClass]
```
