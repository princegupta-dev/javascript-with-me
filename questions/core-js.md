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

**7. Use Cases**
**var** – Rarely used in modern JavaScript (legacy code).
**let** – Use when the value can change (e.g., loops, counters).
**const** – Default choice. Use when the value should not change (e.g., constants, configurations).

**1. Loops (Block Scope vs. Function Scope)**

### Example with **var**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3
  }, 1000);
}
```

### Why?

var is function-scoped, so the same i is shared across all iterations.
By the time the setTimeout runs, the loop has already finished, and i is 3.

**Example with let**

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 1000);
}
```

### Why?

let is block-scoped. Each iteration creates a new i that is unique to that block.
When setTimeout runs, it remembers the i from its respective iteration (closure behavior).

### 2. Fixing var with Closures

If you have to use var for some reason, you can fix the issue by using an IIFE (Immediately Invoked Function Expression) to create a new scope:

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i);
}
```

The IIFE creates a new function scope for each iteration, capturing the current value of i by passing it as j.

**3. Asynchronous Behavior with let and var**

### Example 1 – var with setTimeout

```js
var count = 5;
setTimeout(() => {
  var count = 10;
  console.log(count); // 10
}, 1000);
console.log(count); // 5
```

**Why?**
The count inside the setTimeout is a different count (function-scoped).
The outer count (5) remains unaffected.

**Example 2 – let with Asynchronous Code**

```js
let count = 5;
setTimeout(() => {
  let count = 10;
  console.log(count); // 10
}, 1000);
console.log(count); // 5
```

Why?
let keeps the inner count block-scoped within setTimeout.
The outer count remains 5 and is unaffected by the inner declaration.

## 4. Practical Example – Event Listeners (Var vs. Let)

```js
for (var i = 0; i < 3; i++) {
  document.body.addEventListener("click", () => {
    console.log(i); // Always 3
  });
}
```

Issue: Every click will log 3.
Fix with let:

```js
for (let i = 0; i < 3; i++) {
  document.body.addEventListener("click", () => {
    console.log(i); // Logs 0, 1, 2 in respective order
  });
}
```

## 2.Hoisting and Temporal Dead Zone (TDZ) in JavaScript

Hoisting and the Temporal Dead Zone (TDZ) are critical JavaScript concepts that explain how variables and functions are accessed before they are declared.

### 1. What is Hoisting?

Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their containing scope during compilation.
Only declarations are hoisted, not initializations (assignments).

### 2. Temporal Dead Zone (TDZ)

Definition: The time between when a variable is hoisted and when it is initialized.
Accessing a variable in this zone results in a ReferenceError.
TDZ only applies to let and const, not var.

## Mutating Objects in const and Differences Between var, let, and const for Objects

const only prevents reassignment of the variable itself, but the contents (properties) of the object can be changed.

**Trying to Reassign the Whole Object (Error Example)**

```js
person = { name: "Jane" }; // TypeError: Assignment to constant variable
```

You cannot reassign the variable person to point to a different object.

**2. Differences Between var, let, and const for Objects**
**var**- functional scope, reassignment and re-declare
**let** - block scope, no-redeclare, but can re assignments
**const** - block scope, no reassign and re-declaration

## 5. Preventing Mutation (Freezing Objects)

```js
const obj = Object.freeze({
  name: "Alice",
  age: 30,
});

obj.age = 35; // ❌ No effect (fails silently in non-strict mode)
console.log(obj.age); // 30
```

## Question 2. Explain the concept of closures and provide an example.

already explained in closure.md

## 3. What are Web APIs in JavaScript?

Web APIs are a collection of ready-to-use functions and interfaces provided by the browser (or Node.js environment) that allow JavaScript to interact with external resources, handle asynchronous tasks, and manipulate the browser environment.

They enable JavaScript to perform tasks that it cannot handle natively (like timers, HTTP requests, DOM manipulation, etc.).
**How Web APIs Work:**
JavaScript calls a Web API function (e.g., setTimeout or fetch).
The task is delegated to the browser’s Web API, and JavaScript continues executing other code (non-blocking).
Once the task completes, the Web API sends the result to the callback queue or microtask queue.
The event loop pushes the callback to the call stack when it's empty.

## Question 4- How does the JavaScript event loop work?

The event loop is the mechanism that allows JavaScript to handle asynchronous operations, enabling non-blocking execution even though JavaScript is single-threaded.

**Key Concepts to Understand:**

1. Single-threaded Nature
   JavaScript executes code line by line on a single thread (one operation at a time).
   To avoid blocking the main thread, JavaScript uses asynchronous callbacks and promises.
2. Call Stack
   A LIFO (Last In, First Out) data structure that tracks the execution of synchronous code.
   When a function is invoked, it’s pushed to the stack. Once it finishes, it’s popped off. 3. Web APIs / Node APIs

- Asynchronous tasks (like setTimeout, fetch, DOM events) are delegated to Web APIs (browser) or Node APIs (in Node.js).
  These APIs handle tasks separately and send the result back to JavaScript when ready.
  Callback Queue (Task Queue) 4. Callback Queue (Task Queue)
- Callbacks from asynchronous tasks (e.g., setTimeout, event listeners) are queued here.
  The queue follows FIFO (First In, First Out) order.
- Microtask Queue 5. Microtask Queue
  Microtasks include Promise.then(), MutationObserver, queueMicrotask().
  This queue has higher priority than the callback queue (macro-task queue). 6. Event Loop
- The event loop continuously monitors the call stack and task queues.
  If the call stack is empty, the event loop pushes the next callback from the queue to the stack for execution.

**Flow of the Event Loop:**

- Execute all synchronous code in the call stack.
- If there is an asynchronous task, delegate it to the Web API.
- Once the task completes, its callback is added to the task queue (or microtask queue).
- The event loop checks if the call stack is empty.
- If the stack is empty, the next callback from the microtask queue is pushed onto the stack.
- After all microtasks, the event loop picks the next macro-task (like setTimeout or setInterval).

## Example – Event Loop in Action:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");
```

**Execution Flow (Step by Step):**

1. Call Stack:
   **console.log('Start')** → Prints Start.
   **setTimeout()** is called → Asynchronous, moved to the Web API (delayed to queue).
   **Promise.resolve()** is called → Microtask (added to microtask queue).
   **console.log('End')** → Prints End.
2. Microtask Execution:

Promise callback from the microtask queue is executed (prints Promise callback).
**3. Task Queue Execution:**
Timeout callback from the task queue is executed (prints Timeout callback).

**Where is the Pending State Stored**
The pending state of a Promise (like the one returned by fetch) is stored in JavaScript's memory/heap—managed internally by the JavaScript engine.
The Promise has an internal hidden property ([[PromiseState]]) that stores its current state (pending, fulfilled, or rejected).

## Question 5. What is the difference between null and undefined?

The difference between null and undefined in JavaScript is subtle but significant. Both represent the absence of a value, but they are used in different contexts and have different meanings.
**undefined**
undefined is a primitive value automatically assigned to a variable that has been declared but not assigned a value.
**When it is used:**
If a variable is declared but not initialized

```js
let x;
console.log(x); // Output: undefined
```

When a function does not explicitly return a value:

```js
function test() {}
console.log(test()); // Output: undefined
```

When you try to access a property that doesn't exist in an object:

```js
const obj = { name: "Alice" };
console.log(obj.age); // Output: undefined
```

Type of **undefined**:
typeof **undefined** is **'undefined'**

## 2. null

null is a primitive value explicitly assigned to a variable to represent the absence of any object or value. It is an intentional assignment to indicate "no value."

```js
let person = null; // person has no value, it's intentionally empty
console.log(person); // Output: null
```

Type of **null**:

typeof null is 'object', which is a known JavaScript quirk. This was a bug in the language that has been retained for backward compatibility.

\*\*Example of Comparison

```js
let x;
let y = null;

console.log(x == y); // true (because both are "empty")
console.log(x === y); // false (different types: undefined vs object)
```

## Question 6. How do you implement debouncing and throttling in JavaScript?

described in debounce and throttling folder.

## Question 7. Explain the difference between == and ===.

**1. == (Loose Equality or Abstract Equality):**

- Compares values for equality after type conversion (coercion) if the types are different.
- It attempts to convert the operands to the same type before making the comparison.

```js
console.log(5 == "5"); // true  (string '5' is coerced to number 5)
console.log(false == 0); // true  (false is coerced to 0)
console.log(null == undefined); // true (special case in JS)
console.log(1 == true); // true  (true is coerced to 1)
console.log("0" == false); // true  (both are coerced to 0)
```

**2. === (Strict Equality):**

- Compares both value and type without type conversion.
- If the types are different, it immediately returns false.

```js
console.log(5 === "5"); // false (different types: number vs string)
console.log(false === 0); // false (different types: boolean vs number)
console.log(null === undefined); // false (different types)
console.log(1 === true); // false (different types)
console.log("0" === false); // false (string vs boolean)
```

**Why Use === Over ==?**

- === is generally recommended because it avoids unexpected results from type coercion.
- It ensures more predictable and bug-free comparisons.
  **Example of Potential Pitfall with ==:**

```js
let userInput = "0";
if (userInput == false) {
  console.log("User input is falsey"); // This will run (unexpected)
}
```

**Using ===**

```js
if (userInput === false) {
  console.log("User input is falsey"); // This will not run (expected)
}
```

This avoids the pitfall since the types are different **(string !== boolean)**.

**Special Cases with == (Type Coercion Rules):**

- **null == undefined** → true **(but null !== undefined)**
- **NaN == NaN** → false (NaN is not equal to itself)
- **0 == false** → **true**
- **[] == false** → true (empty array coerced to **false**)

## When to Use ==?

- Rarely. Use it only if type coercion is explicitly desired and necessary.

```js
if (value == null) {
    // This checks
```

both null and undefined without explicitly checking each: console.log('Value is null or undefined'); }

**Type Coercion in JavaScript**
Type coercion is the process of automatically converting one data type to another during operations involving values of different types. JavaScript is a loosely typed language, which means you can perform operations between different types, and the language will try to convert them to compatible types.

### Types of Coercion:

- Implicit Coercion (Automatic by JS)
- Explicit Coercion (Manual by Developer)

### Implicit Coercion (Automatic):

```js
console.log("5" - 2); // 3  ('5' is coerced to number)
console.log("5" + 2); // '52' (2 is coerced to string)
console.log(true + 1); // 2  (true is coerced to 1)
console.log(false + 1); // 1  (false is coerced to 0)
console.log("5" * "3"); // 15 ('5' and '3' are coerced to numbers)
```

Explanation:

**- , \* , / , %** trigger numeric coercion.
**+** triggers string coercion if one operand is a string.

### 2. Explicit Coercion (Manual):

```js
console.log(Number("5")); // 5
console.log(String(123)); // '123'
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
```

## Question 8. What are promises, and how do they differ from callbacks?

## Question 9. How do async and await work in JavaScript?

## Question 10. What is the purpose of the bind(), call(), and apply() methods?

The concepts of **bind(), call(),** and **apply()** in JavaScript are used to control the **this** context in functions.

- **bind():**
  Creates a new function with a specific this context. Use it when you need to pass a function to be called later with a fixed this.
  Example: Assigning methods to event handlers.

```js
const obj = { name: "Alice" };
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
const boundGreet = greet.bind(obj, "Hello");
console.log(boundGreet()); // "Hello, Alice"
```

- **call():**
  Invokes a function immediately with a specified this context and individual arguments.

```js
const obj = { name: "Alice" };
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
console.log(greet.call(obj, "Hi")); // "Hi, Alice"
```

- **apply()**
  Similar to call(), but takes arguments as an array.

```js
const obj = { name: "Alice" };
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
console.log(greet.apply(obj, ["Hey"])); // "Hey, Alice"
```

## Question 11. How would you deep clone an object in JavaScript?

To deep clone an object in JavaScript (i.e., create a new object that is a complete copy of the original, including nested objects), you can use the following methods:

### 1. Using structuredClone() (Modern Approach)

The built-in structuredClone() method is the most efficient and straightforward way to deep clone objects.

```js
const original = { name: "Alice", address: { city: "Wonderland" } };
const clone = structuredClone(original);

console.log(clone); // { name: "Alice", address: { city: "Wonderland" } }
console.log(clone.address === original.address); // false (different objects)
```

Advantages: Handles nested objects, arrays, and circular references.
Limitation: Not supported in older browsers.

### 2. Using JSON.parse(JSON.stringify())

This method serializes and deserializes the object.

```javascript
const original = { name: "Alice", address: { city: "Wonderland" } };
const clone = JSON.parse(JSON.stringify(original));

console.log(clone); // { name: "Alice", address: { city: "Wonderland" } }
console.log(clone.address === original.address); // false (different objects)
```

Advantages: Easy to use and works for simple objects.
Limitations: Fails with:
Non-JSON-compatible values (e.g., undefined, functions, symbols).
Circular references.

### 3. Using Lodash Library

The lodash library provides a cloneDeep() function for deep cloning.

```js
const _ = require("lodash");

const original = { name: "Alice", address: { city: "Wonderland" } };
const clone = _.cloneDeep(original);

console.log(clone); // { name: "Alice", address: { city: "Wonderland" } }
console.log(clone.address === original.address); // false (different objects)
```

Advantages: Reliable and handles complex structures like circular references.
Limitation: Requires installing a library.

### 4. Manual Recursive Cloning

You can write a custom function to recursively clone objects.

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

const original = { name: "Alice", address: { city: "Wonderland" } };
const clone = deepClone(original);

console.log(clone); // { name: "Alice", address: { city: "Wonderland" } }
console.log(clone.address === original.address); // false (different objects)
```

## Question 12. Timer Function

In JavaScript, timers are functions that execute code after a specified delay or repeatedly at a specified interval. The two main timer functions are:

**1. setTimeout**
Executes a function once after a specified number of milliseconds.

```js
const timeoutId = setTimeout(callback, delay, ...args);
```

- callback: The function to execute.
- delay: Time in milliseconds before executing the callback.
- ...args: Optional parameters passed to the callback.

```javascript
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
```

### Stopping a Timer

```javascript
const timeoutId = setTimeout(() => {
  console.log("This will not execute");
}, 3000);

clearTimeout(timeoutId); // Cancels the timeout
```

## 2. setInterval

Executes a function repeatedly at specified intervals.

```js
const intervalId = setInterval(callback, delay, ...args);
```

- callback: The function to execute repeatedly.
- delay: Time in milliseconds between each execution.
- ...args: Optional parameters passed to the callback.

```javascript
const intervalId = setInterval(() => {
  console.log("This message appears every second");
}, 1000);
```

### Stopping an Interval

```javascript
const intervalId = setInterval(() => {
  console.log("This will run multiple times");
}, 1000);

setTimeout(() => {
  clearInterval(intervalId); // Stops the interval after 5 seconds
  console.log("Interval cleared");
}, 5000);
```

## Question 13. All About DATE and Time

JavaScript provides powerful tools for working with date and time through the built-in Date object. Here's a comprehensive guide to understanding and using date and time in JavaScript.

## 1.1 Current Date and Time

```javascript
const now = new Date();
console.log(now); // Outputs the current date and time
```

### 1.2 Specific Date and Time

```javascript
const specificDate = new Date("2025-01-01T10:00:00");
console.log(specificDate); // Outputs: Wed Jan 01 2025 10:00:00 GMT+0000

const anotherDate = new Date(2025, 0, 1, 10, 0, 0); // Year, Month (0-based), Day, Hours, Minutes, Seconds
console.log(anotherDate); // Outputs: Wed Jan 01 2025 10:00:00 GMT+0000
```

### 1.3 From Timestamps

```javascript
const timestampDate = new Date(1672531200000); // Milliseconds since January 1, 1970
console.log(timestampDate);
```

### 1.4 Epoch Date

```javascript
const epoch = new Date(0); // January 1, 1970
console.log(epoch);
```

## 2. Date Methods

```javascript
const now = new Date();

console.log(now.getFullYear()); // Year (e.g., 2025)
console.log(now.getMonth()); // Month (0 = January, 11 = December)
console.log(now.getDate()); // Day of the month (1-31)
console.log(now.getDay()); // Day of the week (0 = Sunday, 6 = Saturday)
console.log(now.getHours()); // Hour (0-23)
console.log(now.getMinutes()); // Minutes (0-59)
console.log(now.getSeconds()); // Seconds (0-59)
console.log(now.getMilliseconds()); // Milliseconds (0-999)
console.log(now.getTime()); // Timestamp in milliseconds since January 1, 1970
```

### 2.2 Setting Components

```javascript
const now = new Date();

now.setFullYear(2023);
now.setMonth(11); // December
now.setDate(25); // 25th
now.setHours(10, 30, 0); // 10:30:00

console.log(now);
```

## 3. Formatting Dates

```js
const now = new Date();

console.log(now.toDateString()); // Human-readable date (e.g., "Fri Jan 10 2025")
console.log(now.toTimeString()); // Time (e.g., "10:45:30 GMT+0000")
console.log(now.toISOString()); // ISO format (e.g., "2025-01-10T10:45:30.000Z")
console.log(now.toLocaleDateString()); // Localized date (e.g., "1/10/2025")
console.log(now.toLocaleTimeString()); // Localized time (e.g., "10:45:30 AM")
console.log(now.toLocaleString()); // Localized date and time (e.g., "1/10/2025, 10:45:30 AM")
```

## 4. Comparing Dates

```javascript
const date1 = new Date("2025-01-01");
const date2 = new Date("2025-01-10");

console.log(date1 > date2); // false
console.log(date1 < date2); // true
console.log(date1.getTime() === date2.getTime()); // false
```

## 5. Calculating Date Differences

```javascript
const date1 = new Date("2025-01-01");
const date2 = new Date("2025-01-10");

const diffTime = Math.abs(date2 - date1); // Difference in milliseconds
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
console.log(diffDays); // Outputs: 9
```

## 6. Working with Timezones

JavaScript automatically uses the user's local timezone, but you can work with UTC or specific timezones.

```js
const now = new Date();

console.log(now.getUTCFullYear()); // UTC Year
console.log(now.getUTCMonth()); // UTC Month
console.log(now.toISOString()); // ISO 8601 with UTC
```

### 6.2 Timezone Offsets

```js
const now = new Date();
console.log(now.getTimezoneOffset()); // Difference in minutes from UTC
```

## 1. What is UTC?

- UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time. It does not change with seasons or daylight saving time.
- It serves as a universal reference for timekeeping.

## 2. What is ISO 8601 Format?

- ISO 8601 is an international standard for date and time representation.
- It can represent time in local time (with or without time zone offsets) or in UTC.
- UTC Example: 2025-01-10T12:00:00Z
- With Offset Example: 2025-01-10T12:00:00+05:30 (India Standard Time, 5 hours 30 minutes ahead of UTC)

## 3. Timezones

- A timezone is a geographical region that has the same standard time.
- Timezones are defined as offsets from UTC, such as +05:30 or -08:00.
