## 1. Destructuring (Arrays and Objects)

Destructuring allows extracting values from arrays or objects into separate variables.

Array Destructuring

```js
const numbers = [10, 20, 30];
const [first, second, third] = numbers;
console.log(first, second, third); // 10, 20, 30

// Skipping elements
const [, , last] = numbers;
console.log(last); // 30

// Default values
const [a, b, c = 50] = [1, 2];
console.log(c); // 50
```

Object Destructuring

```js
const person = { name: "John", age: 30 };
const { name, age } = person;
console.log(name, age); // John, 30

// Renaming variables
const { name: fullName } = person;
console.log(fullName); // John

// Default values
const { city = "Unknown" } = person;
console.log(city); // Unknown
```

## 2. Rest and Spread Operators

The **...** operator has two primary uses:

- Collecting remaining elements (rest).
- Expanding elements (spread).

**Rest Operator**

```js
// Arrays
const [first, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2, 3, 4]

// Objects
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(others); // { b: 2, c: 3 }
```

**Spread Operator**

```js
// Arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

// Objects
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, z: 3 };
console.log(obj2); // { x: 1, y: 2, z: 3 }
```

## 3. Arrow Functions (Lexical this)

Arrow functions provide a concise syntax for writing functions and use lexical scoping for this.

```js
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
```

**Lexical this**
Arrow functions don’t have their own this context; they inherit it from the enclosing scope.

```js
function Counter() {
  this.count = 0;
  setInterval(() => {
    this.count++; // Uses `this` from Counter
    console.log(this.count);
  }, 1000);
}
new Counter();
```

## 4. Template Literals

Template literals make working with strings easier by allowing embedded expressions and multi-line strings.

```js
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, Alice!

// Multi-line strings
const text = `This is
a multi-line
string.`;
console.log(text);
```

## 5. Modules (ESM) and Imports/Exports

ES6 introduced modules, which allow you to split code into reusable files.
**Exporting**

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

**Importing**

```js
// main.js
import { add, subtract } from "./math.js";
console.log(add(5, 3)); // 8
```

**Default Export**

```js
// math.js
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply from "./math.js";
console.log(multiply(2, 3)); // 6
```

## 6. Generators & Iterators

**Generators**

A generator is a function that can pause execution and resume later using the **yield** keyword.

```js
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatorFunction();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Iterators**
An iterator is an object that defines a next() method to produce a sequence of values.

```js
const iterable = [10, 20, 30];
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## 7. Optional Chaining (?.)

Optional chaining allows you to safely access deeply nested properties without checking each level for null or undefined.

```js
const user = { profile: { name: "John" } };
console.log(user.profile?.name); // John
console.log(user.address?.city); // undefined (doesn't throw an error)
```

## 8. Nullish Coalescing (??)

The nullish coalescing operator (??) returns the right-hand operand if the left-hand operand is null or undefined.

```js
const name = null;
const defaultName = name ?? "Guest";
console.log(defaultName); // Guest

const age = 0;
const defaultAge = age ?? 18;
console.log(defaultAge); // 0 (because 0 is not null or undefined)
```
