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

## 🔹 1. Call Stack (Execution Context)

What it is: A data structure that tracks function calls.
How it works:
When a function is invoked, it’s pushed onto the stack.
When the function completes, it’s popped off the stack.
The stack operates in LIFO (Last In, First Out) order.
Blocking Behavior: If a long-running function (like while(true)) is on the stack, no other code executes.

```javascript
function a() {
  b();
  console.log("a");
}
function b() {
  console.log("b");
}
a();
```

call-stack execution

```javascript
a() -> b() -> console.log('b') -> console.log('a')
```

## 🔹 2. Web APIs (Node.js or Browser APIs)

What they are: Asynchronous operations like:
setTimeout, setInterval
DOM Events (click, keypress)
Fetch/HTTP requests
Timers, File I/O (in Node.js)
These APIs don’t block the call stack.
Instead, the operation is handed off to background threads managed by the environment (Node.js/libuv or browser).

```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 1000);
console.log("End");
```

code execution

```javascript
Call Stack: console.log('Start') -> console.log('End')
Web API: setTimeout(1000ms)
```

## 3. Callback Queue / Task Queue

When the Web API finishes (like setTimeout), the callback is placed in the Task Queue (Macrotask Queue).
Callbacks wait here until the call stack is empty.

## 4. Event Loop (Heart of Asynchronous Execution)

Role: Continuously checks if the call stack is empty. If it is:
It dequeues the next task from the Task Queue and pushes it to the call stack.
The event loop ensures JavaScript remains single-threaded yet non-blocking.
Event Loop Flow:

Look for tasks in the Microtask Queue (Priority).
If empty, look for tasks in the Macrotask Queue.
Push the task to the call stack and execute.

## 5. Microtask Queue vs. Macrotask Queue (Execution Order)

Microtasks: Higher priority (executed immediately after the current stack is cleared).
Examples:
Promises (.then, .catch, .finally)
MutationObserver
queueMicrotask()
Macrotasks: Lower priority (executed after microtasks).
Examples:
setTimeout, setInterval
setImmediate (Node.js)
I/O tasks

## Order of Execution (Example):

```c
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```

```c
Call Stack: console.log('Start') -> console.log('End')
Microtask Queue: Promise.then()
Macrotask Queue: setTimeout()

Output:
Start
End
Promise
Timeout
```

## 🔹 Visualizing the Flow

Call Stack (executes sync code)
Web API (handles async tasks)
Callback Queue (holds finished async tasks)
Microtask Queue (Promises are prioritized)
Event Loop (moves tasks to call stack)

## What is an I/O Task?

I/O (Input/Output) tasks refer to operations that involve interacting with external resources or devices, such as:

Reading/Writing files (File System)

Network requests (HTTP, WebSockets, etc.)

Database queries

User input/output (keyboard/mouse events, console logs)

## How Node.js Handles I/O Tasks:

Node.js uses non-blocking I/O powered by libuv (a C library). When an I/O task is triggered, Node.js:

Hands off the operation to the OS (handled in a separate thread).

Continues executing other code (doesn't block).

Once the I/O task finishes, the callback is queued.

The event loop processes the callback and pushes it to the call stack.

```js
const fs = require("fs");

console.log("Start");
fs.readFile("file.txt", "utf8", (err, data) => {
  console.log(data);
});
console.log("End");
```

Execution order

```js
Start
End
(file.txt content)
```

## image

![image js-engine](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TgK7W2VWsQJBcQawgDOSAg.png)

Every browser has a JavaScript engine. The most popular engine is Google’s V8 engine. This engine is the engine of Google Chrome and also of Node.js.
Of course, all other browsers have their own JavaScript engines.
A JavaScript engine will always consist of a Call Stack and a Memory Heap and will run on one thread (The JavaScript engine itself
runs in several threads (processes) that do different things: compressor for example, garbage collection, etc.,

## How Asynchronous JavaScript works behind the scenes

As previously mentioned, the JavaScript runtime environment serves as a container that encompasses all the various components required
for executing JavaScript code. At the core of any JavaScript runtime lies the JavaScript engine, which is responsible for code
execution and object storage in memory, and operates on a single thread. Code execution and object storage occur in the Call Stack
and the Memory Heap. Notably, JavaScript is single-threaded, allowing it to perform only one task at a time, in contrast to languages like Java that can execute multiple code pieces simultaneously.

Next, we have the Web APIs environment, which provides APIs to the engine that aren’t part of the JavaScript language itself. These include timers, the DOM, the fetch API, the Geolocation API, and so on. Additionally, there’s the Callback Queue, a data structure containing all the Callback Functions ready to be executed and attached to upcoming events. When the Call Stack is empty, the Event Loop transfers callbacks from the Callback Queue to the Call Stack for execution.

The Event Loop is crucial for enabling asynchronous behavior in JavaScript, allowing for the Non-Blocking Concurrency Model. The term “Concurrency Model” refers to how a language handles multiple tasks occurring simultaneously.

So, how does JavaScript’s Non-Blocking Concurrency Model truly function, and why is the Event Loop so vital? We’ll concentrate on the essential components of the runtime environment for this topic, including the Call Stack, Event Loop, Web APIs, and Callback Queue. Although the JavaScript engine operates on a single thread, asynchronous code can still be executed non-blockingly. We’ll soon explore how the JavaScript concurrency model operates behind the scenes, using all the parts of the JavaScript runtime we’ve already discussed, by examining a real code sample. We’ve seen how the Call Stack functions, and now we’ll focus on the code in the Web APIs and Callback Queue.

Consider the following image element, ‘el’. In the second line, we define the ‘src’ of this image as ‘dog.jpg’, and the image begins to load asynchronously in the background (image loading occurs asynchronously in JavaScript).

![alt text](https://miro.medium.com/v2/resize:fit:784/format:webp/1*UaNBuZiT4qRwxWzZq1hfaA.png)

What exactly is this enigmatic “background”? As we’re aware, everything associated with the DOM isn’t truly part of JavaScript but belongs to Web APIs. Consequently, asynchronous tasks related to the DOM will operate in the Web APIs environment, not within the JavaScript engine itself! In fact, this holds true for timers, AJAX calls, and all other asynchronous tasks as well.

Thus, these asynchronous tasks will execute in the browser’s Web APIs environment.

![alt text](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7rbJ1LUhwBSUrBL9z-tiFQ.png)

Should the image load within the Call Stack, it would result in obstructing the execution of the remaining code. Consequently, image loading in JavaScript is asynchronous and does not occur in the Call Stack or the Main Thread of Execution but rather in the separate Web APIs environment, as previously mentioned.

Now, if we desire to perform an action after the image completes loading, we must listen for the loading event. This is precisely what we do in the following line of code.

![alt text](https://miro.medium.com/v2/resize:fit:784/format:webp/1*UaNBuZiT4qRwxWzZq1hfaA.png)

Here, we attach an eventListener to the load event of the image and pass it a callback function, as usual. In practice, this involves registering the callback function in the Web APIs environment, precisely where the image is being loaded, and this callback function will remain there until the loading event concludes.

In the subsequent line, we execute an AJAX call using the fetch API, and the asynchronous fetch operation also occurs in the Web APIs environment to avoid blocking the aforementioned Call Stack. Finally, we employ the ‘then’ method on the Promise returned by the fetch function, which registers a Callback Function in the Web APIs environment, allowing us to respond to the future resolved value of the Promise. This Callback Function is associated with a Promise that retrieves data from the API, a detail that will be significant later on.

Thus, we have an image loading in the background and data being fetched from the API, all taking place within the Web APIs environment.

Now we’ve arrived at a particularly intriguing point. Imagine the image has completed loading, and the Load event occurs for that same image. What follows is the callback for this event being sent to the Callback Queue.

Essentially, the Callback Queue is an ordered list of all the Callback Functions waiting in line for execution. You can think of the Callback Queue as a to-do list containing all tasks to be carried out, with the Call Stack being the one to perform those tasks in the end.

In our example, there are no other callbacks in the Callback Queue, but there could be. If there were other callbacks in the queue, then the new callback would be placed at the end and wait patiently for its turn to run.

This has significant implications that are crucial to note. Consider a situation where you set setTimeOut to five seconds. After five seconds, the callback in setTimeOut will not immediately go to the Call Stack but to the Callback Queue. If there are already other callbacks in the Callback Queue waiting to be executed, and it takes one second to execute all of them, the setTimeOut callback will run only after six seconds, not five! These six seconds consist of the five seconds elapsed for the timer, plus the additional second it took to execute all the other queued callbacks. This means that the time set for setTimeOut functions is not a guarantee. The only certainty is that setTimeOuts will not run before the specified time, but they may run after it. This all depends on the state of the Callback Queue and the Call Stack (which also needs to be clear to receive callbacks).

Another important point to mention is that the Callback Queue also holds callbacks resulting from DOM events, such as mouse clicks, key presses, or others. It’s worth noting that many DOM events, like Click Events, are not asynchronous, but they still utilize the Callback Queue to trigger their callbacks. Therefore, if a button with an added Event Listener is clicked, the same process will occur as with the asynchronous loading event.

The Event Loop
Now, let’s observe the Event Loop in action. The Event Loop examines the Call Stack to determine if it is empty, excluding the ever-present Global Execution Context, of course. If the Call Stack is indeed empty, indicating that no code is currently being executed, the Event Loop will take the first callback from the Callback Queue and place it onto the Call Stack.

This process is called an Event Loop Tick. Each time the Event Loop retrieves a Callback Function from the Callback Queue and places it on the Call Stack, we say an Event Loop Tick has occurred. The Event Loop plays a crucial role in coordinating the Call Stack with the Callbacks in the Callback Queue. Essentially, the Event Loop decides when each Callback Function will be executed, orchestrating the entire JavaScript runtime environment.

It’s important to note that JavaScript itself doesn’t have a sense of time since all asynchronous actions occur outside its engine. The rest of the runtime manages the asynchronous behavior, with the Event Loop determining when and where the JavaScript engine will execute the code it receives.

To summarize the process, the image began loading asynchronously in the Web APIs environment, not in the Call Stack. We then used addEventListener to attach a callback function to the image load event. The callback function represents the deferred asynchronous code, which we only want to execute after the image has loaded, allowing the rest of the code to continue running. addEventListener registered the callback in the Web APIs environment, where it waited for the loading event. Once the event occurred, the Web APIs environment moved the callback to the Callback Queue. The callback then waited in the Callback Queue for the Event Loop to transfer it to the Call Stack.

This transfer occurred when the callback was first in line and the Call Stack was empty. The entire process ensures that the image loads in the background in a non-blocking manner.

In conclusion, the Web APIs environment, Callback Queue, and Event Loop work together to enable asynchronous code execution in a non-blocking way, even with only one thread in the JavaScript engine.

## The Microtasks Queue

Alright, we still need to address the function waiting for the AJAX call in the background.

This is where Promises come into play. With Promises, the process works slightly differently. Suppose the data has finally arrived. The callbacks associated with Promises, such as the one we registered with the ‘then’ method of the Promise, don’t go to the Callback Queue. Instead, Promise-related Callback Functions have their own dedicated queue, called the Microtasks Queue.

The Microtasks Queue has a unique feature: it takes priority over the Callback Queue. The Event Loop will first check for any callbacks in the Microtasks Queue, and if there are any, it will execute them before running additional callbacks from the Callback Queue. Promise-related Callback Functions are referred to as Microtasks, hence the name Microtasks Queue. While there are other types of Microtasks, they are not relevant at the moment. In our example, we currently have a Microtask in the Microtasks Queue, and the Call Stack is empty.

The Event Loop will now take the Microtask and place it on the Call Stack, just like it did with the Callback Function from the Callback Queue, regardless of whether the Callback Queue is empty or not. This behavior would be the same even if multiple callbacks were in the Callback Queue, because Microtasks always take precedence. In practical terms, this means that Microtasks can effectively skip ahead of regular callbacks in the queue.

If another Microtask arrives, it will also be executed before any Callback Function in the Callback Queue. This situation implies that the Microtasks Queue can potentially starve the Callback Queue, as continuously adding more Microtasks may prevent Callback Functions in the Callback Queue from ever being executed. While this scenario is unlikely to occur, it is still important to be aware of this possibility. The execution of asynchronous code with both normal callbacks and microtasks originating from promises is quite similar, with the only difference being that they enter distinct queues and the Event Loop prioritizes microtasks over normal callbacks.

In conclusion, we explored the inner workings of asynchronous JavaScript, the runtime environment, the Call Stack, Web APIs, the Callback Queue, the Event Loop, and the Microtasks Queue.

JavaScript’s Non-Blocking Concurrency Model, despite operating on a single thread, has been made possible by the intricate interplay between these components. We have demonstrated how the Event Loop manages and coordinates asynchronous code execution by transferring callbacks from the Callback Queue and Microtasks Queue to the Call Stack, with microtasks taking precedence over regular callbacks. This intricate system enables JavaScript to efficiently handle multiple tasks simultaneously, ensuring a smooth and responsive user experience.
