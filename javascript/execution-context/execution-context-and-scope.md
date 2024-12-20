# Execution Context & Scope

An execution context is the environment in JS Engines like v8 where JavaScript code is evaluated and executed. Think of it like a container that holds information about which code is running, which variables are available, and how the control flow is managed.
An execution context is an environment where JavaScript code is executed. It contains everything required to execute the code — memory, variables, functions, and the value of this.

When you run your JavaScript code, the JavaScript engine (like Google's V8) creates an execution context to manage variables, functions, and control flow. You can think of it as a "container" or "environment" where the code runs. It holds important information like:

Where am I? (current scope)
What variables do I have? (memory/variable environment)
Who called me? (call stack reference)

An execution context is an environment where JavaScript code is executed. It contains everything required to execute the code — memory, variables, functions, and the value of this.

Each function gets its own execution context, and only one execution context runs at a time, managed using the Call Stack.

## 🔥 How is it Implemented?

The JavaScript engine (like V8) is written in C++. When the engine runs your JavaScript code, it performs these steps:

Tokenization/Parsing — Your JavaScript code is broken into small parts (tokens).
Abstract Syntax Tree (AST) — The tokens are converted into a tree-like structure.
Interpreter/Compiler — The AST is converted into machine code or bytecode.
Execution Context is Created — For every function call, the engine creates a new execution context and pushes it onto the call stack.
So, C/C++ is used to implement the execution context logic in the V8 engine.

## 🔍 Can We See the Execution Context?

No, you can't directly see or touch the execution context.
However, you can visualize it through call stacks and memory allocation in your browser's DevTools.

Open Chrome DevTools (F12 or Ctrl + Shift + I).
Go to the "Sources" tab.
Set a breakpoint in your code.
Check the Call Stack — You can see which function is currently being executed.
Check Scope — You'll see the variables that are part of the execution context.

### Think of it as a box that holds everything needed to run your code.

Every time a function is called, a new execution context is created.

There are 3 types of execution contexts:
Global Execution Context (GEC) — Created when the file starts running.
Function Execution Context (FEC) — Created every time a function is called.
Eval Execution Context — Used when eval() is called (rarely used).

## 📂 What is Inside an Execution Context?

1. Memory/Variable Environment — Stores variables, function declarations, and references to objects.
2. Code/Thread of Execution — Line-by-line execution of your code.
3. Scope Chain — A chain of references to outer lexical environments for variable lookup.

## 📦 How Does It Work?

1.  Creation Phase
    . Memory Allocation — Variables, functions, and arguments are stored in memory with undefined as their initial value.
    . Lexical Environment Setup — The outer environment reference is created (for closures).
    . this Binding — Determines the value of this (global, function, or object context).

2.  Execution Phase
    . JavaScript executes code line-by-line.
    . Variables are assigned actual values.

Each function gets its own execution context, and only one execution context runs at a time, managed using the Call Stack.

## Example of GEC

```javascript
var x = 10; // Global Execution Context

function outerFunction(y) {
  var z = 20; // Function Execution Context (FEC1)

  function innerFunction() {
    var a = 30; // Function Execution Context (FEC2)
    console.log(x, y, z, a); // Access to outer lexical environments (scope chain)
  }

  innerFunction();
}

outerFunction(40);
```

## Explanation:

1. Global Execution Context (GEC) is created and x is stored as x = 10.
2. Function Execution Context (FEC1) is created when outerFunction(40) is called. It has y = 40 and z = 20.
3. Function Execution Context (FEC2) is created when innerFunction() is called. It has a = 30.
4. Inside console.log(x, y, z, a), JavaScript looks for x, y, z, a in the current scope, and if not found, it moves up the scope chain to the parent.

## 🌐 What is Scope?

Scope determines where variables can be accessed.
Global Scope — Variables accessible everywhere (e.g., var x = 10; in the top level).
Function Scope — Variables declared inside a function (var, let, const).
Block Scope — Variables declared with let or const inside {}.

### Scope Chain — If JavaScript can't find a variable in the current scope, it looks in the parent scope, and so on, up to the global scope.

## 🔥 Important Concepts

Lexical Environment — Where the code is written (determines outer variables).
Hoisting — During the creation phase, variable declarations are "hoisted" to the top of the scope.
this Binding — Determines the value of this (based on context — global, object, function, etc.).

## 🔥 2. Parts of the Execution Context

Every execution context has 3 main parts:

1. Memory/Variable Environment

Stores all variables, functions, and objects in memory.
Variables declared with var are hoisted and placed in Global Memory.
Variables declared with let and const are hoisted but placed in the Temporal Dead Zone (TDZ) until initialized.
Code/Thread of Execution

2. Executes the actual code line-by-line.
   Follows the order of function calls and statements.
   this Binding

3. Determines the value of this.
   In the global context, this refers to the global object (window or global).
   Inside functions, the value of this depends on how the function is called.

## 🔥 3. Memory Creation (Hoisting) — Global vs. Local

When the execution context is created, JavaScript does 2 phases for every scope (global or function):

1. Memory Creation Phase (Hoisting)

All variables and functions are stored in memory.
Variables declared with var are initialized with undefined.
Functions are stored completely in memory (not undefined).
Variables declared with let and const are put in a Temporal Dead Zone (TDZ) and are only accessible after the line where they are initialized.

2.  Execution Phase

Code is executed line-by-line.
Variables get their assigned values.

### 🔥 4. Why Does "var" Go to Global, But "let" and "const" Stay in Block Scope?

var declarations are function-scoped and attached to the global object (window or global).
let and const are block-scoped (only accessible within the block { } they are declared).
let and const are stored in the script or block environment rather than the global object.
When the engine sees let and const, it puts them in the Temporal Dead Zone (TDZ), which means you can't use them until the execution reaches the line where they're declared.

### 🔥 5. Call Stack — Why Separate Execution Context for Every Function Call?

The Call Stack tracks which function is being executed at any point.

Only one function can run at a time (single-threaded nature of JavaScript).

### How It Works:

Global Execution Context (GEC) is created first and pushed to the Call Stack.
Each time a function is called, a new execution context is created and pushed to the stack.
When the function finishes, its execution context is popped off the stack.

Why separate execution contexts?
Each function call has its own variables, memory, and this value.
It allows recursion and function nesting to happen independently.

## Call Stack Example:

```javascript
function a() {
  console.log("a");
  b();
}
function b() {
  console.log("b");
}
a();
```

### Call Stack at different points:

```javascript
| b() Execution Context  |  👈 Current execution
| a() Execution Context  |
| Global Execution Context |
```

Once b() finishes, it is popped from the stack. Then a() finishes, and finally, the Global Execution Context remains.

## Complete Diagram of Execution Context

```javascript
+------------------------+
|   Global Execution Context   |
+------------------------+
|  Memory:               |
|  x: 10                 |
|  greet: [Function]     |
|                        |
|  Call Stack:           |
|  +-----------------+   |
|  | greet() Context  |   | 👈 Current
|  +-----------------+   |
|  | Global Context   |   |
|  +-----------------+   |
+------------------------+
```

When greet() is called, it creates a new execution context and pushes it to the stack.

## 🔥 Where are Variables and Functions Stored?

When you run JavaScript code, the JavaScript Engine (like V8 in Chrome or Node.js) is responsible for allocating memory space in RAM for variables, functions, and objects.

Summary:

Variables (primitive and reference types) are stored in Heap or Stack memory.
Functions (as objects) are stored in the Heap.
The Call Stack resides in RAM, and it keeps track of function execution.

## 🧠 How Does Memory Work?

JavaScript uses two main areas of RAM to store data:

### Stack (for primitive data and execution context)

Stores primitives (like numbers, booleans, undefined, null, etc.).
Stores the call stack and keeps track of function execution.
Faster access, but memory is limited.

### Heap (for objects, arrays, and functions)

Used to store objects, arrays, and functions.
Functions are treated as objects in JavaScript.
More flexible but slower access due to its unordered nature.

```java
+---------------------+
|       Call Stack     |
| +-----------------+ |
| | greet() Context  | |
| +-----------------+ |
| | Global Context   | |
| +-----------------+ |
+---------------------+

+------------------------+
|       Heap (RAM)        |
|  greet: { code inside } |
+------------------------+

+------------------------+
|       Stack (RAM)       |
|  name = 'Prince'        |
+------------------------+
```

### What Happens during garbage collection?

JavaScript has automatic garbage collection.
When variables or objects are no longer referenced, they are removed from memory.

### How does this work?

JavaScript uses a technique called "Mark-and-Sweep".
If a variable is no longer accessible (like a local variable in a finished function), it is "marked for deletion."
The Garbage Collector (GC) frees up the memory.

```java
Stack                    Heap
+------------------+    +------------------------+
| user (Reference) | -> | { name: 'Prince', age: 21 } |
+------------------+    +------------------------+
| arr (Reference)  | -> | [1, 2, 3]                |
+------------------+    +------------------------+
```

## 🔥 Key Properties of the Stack

Fast access — Data is stored sequentially, so it’s very fast.
Limited memory size — Since the stack is limited in size, stack overflow occurs when too many recursive function calls are made.
LIFO (Last In, First Out) — The most recently used function is the first to complete and be removed from the stack.

## 🔥 Key Properties of the Heap

Unstructured memory — Objects are stored in random locations, unlike the stack.
Larger memory pool — Heap has more space than the stack.
Slower access — Accessing data in the heap takes longer due to pointers.
Garbage collection — When no references to an object exist, the garbage collector removes it.
