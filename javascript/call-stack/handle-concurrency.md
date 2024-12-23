## Call Stack, Event Loop, and Task Queue in JavaScript

## Threads

A thread is the smallest unit of execution in a process. It allows a program to perform tasks. In many programming languages, multiple threads can run concurrently, enabling parallel execution of different tasks.

However, JavaScript is single-threaded. This means:

- Only one piece of code is executed at a time.
- JavaScript handles one operation after another in a sequential manner.
- There is no parallel execution of code by default.

## Thread vs Call Stack (Key Differences):

## Is the Call Stack a Thread?

No, the Call Stack is not a thread.

. The Call Stack is part of the thread's execution process.
. It helps track function calls during the thread's execution but does not execute code independently.
. The thread manages the execution of code, while the Call Stack manages the order of function calls.

## Example (Call Stack and Thread Interaction):

```javascript
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Hello from third!");
}

first();
```

1. The thread executes this code.
2. The Call Stack tracks the order of function calls:
   first() → second() → third()
   The Call Stack grows as functions are called and shrinks as they return.

At any point, the thread can only execute one function (whichever is at the top of the Call Stack).

```javascript
[Main Thread] – Executes the code
   |
   |---> [Call Stack] – Tracks the current function call
             |
             |---> function first()
                      |
                      |---> function second()
                               |
                               |---> function third()
```

## Summary

The thread executes JavaScript code.
The Call Stack organizes and tracks function calls during this execution.
JavaScript is single-threaded, but the Call Stack is part of the thread’s operation and helps manage the flow of function execution.

## image

![image js-engine](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TgK7W2VWsQJBcQawgDOSAg.png)
