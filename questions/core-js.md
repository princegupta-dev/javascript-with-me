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
