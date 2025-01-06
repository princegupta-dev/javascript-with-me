## 1. How Memory Works in Computers (Simplified)

### Physical Memory (RAM):

RAM (Random Access Memory) is where your programs and data are temporarily stored while the computer is on. When you run a JavaScript program, the code is loaded into RAM, and the CPU executes instructions by accessing memory locations.

### Binary Representation (0s and 1s):

At the core of memory and data storage, everything is represented as binary — 0s and 1s. Each 0 or 1 is called a bit. A group of 8 bits forms a byte.
Example: The letter "A" is represented as 01000001 in binary (ASCII format).

## 2. How 0s and 1s Work (Binary Logic and Transistors)

### Transistors:

Computers are made up of billions of tiny switches called transistors. These switches can be either on (1) or off (0).

### Logic Gates:

Transistors are combined to form logic gates (AND, OR, NOT). Logic gates perform basic operations that lead to complex calculations and program execution.

### Example

```c
1 AND 1 = 1
1 AND 0 = 0
0 OR 1  = 1
```

### Registers and Cache:

The **CPU** has registers (small memory) that temporarily hold data during calculations.
**Cache** is faster memory closer to the CPU, storing frequently used data to speed up operations.

## 3. How JavaScript Works with Hardware (JS in the Stack)

JavaScript runs in a browser or Node.js environment, not directly on hardware. However, JS interacts with memory and CPU through:
**Call Stack**: Manages function calls.
**Heap: Stores** objects and data dynamically allocated.
**Event Loop:** Handles asynchronous tasks.
**Web APIs**: Interact with hardware indirectly (e.g., camera, microphone).
**Node.js APIs:** Enable file system access, networking, and OS-level interactions.

## Example of Memory Management in JS

```js
let x = 10; // Stored in stack (primitive)
let obj = { a: 5 }; // Stored in heap (object reference)
```

# Core Javascript

## 1. What are the differences between var, let, and const?

**1. Scope Differences**
**var** – Function-scoped
Accessible throughout the entire function.
If declared outside any function, it becomes global.
**let** and **const** – Block-scoped
Accessible only within the block **{}** where they are declared (like loops or conditionals).

```js
function test() {
  if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
  }
  console.log(x); // 10
  console.log(y); // ReferenceError
  console.log(z); // ReferenceError
}
test();
```

**2. Re-declaration**
**var** – Can be re-declared in the same scope.
**let** and **const** – Cannot be re-declared in the same scope.

```js
var a = 1;
var a = 2; // No error

let b = 1;
let b = 2; // Error: Identifier 'b' has already been declared

const c = 1;
const c = 2; // Error: Identifier 'c' has already been declared
```

**3. Hoisting Behavior**
**var** – Hoisted to the top with undefined value.
**let** and **const** – Hoisted but not initialized (Temporal Dead Zone - TDZ).

```js
console.log(x); // undefined
var x = 10;

console.log(y); // ReferenceError (TDZ)
let y = 20;

console.log(z); // ReferenceError (TDZ)
const z = 30;
```

**4. Mutability**
**var and let** – Can be reassigned.
**const** – Cannot be reassigned. However, objects declared with const can have their properties modified.

```js
let a = 5;
a = 10; // Works

const b = 15;
b = 20; // Error: Assignment to constant variable

const obj = { key: "value" };
obj.key = "newValue"; // Works (mutating object)
```

**5. Global Object Property**
**var** – Attaches to the window object (in browsers).
**let and const** – Do not attach to window.

```js
var a = 1;
let b = 2;
const c = 3;

console.log(window.a); // 1
console.log(window.b); // undefined
console.log(window.c); // undefined
```

**6. Temporal Dead Zone (TDZ)**
**let and const** stay in the TDZ from the start of the block until the declaration is encountered.
ccessing variables during this period results in a ReferenceError.

```js
{
  console.log(a); // ReferenceError
  let a = 10;
}
``;
```
