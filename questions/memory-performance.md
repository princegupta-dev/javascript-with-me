## 1. How do you cache API responses in JavaScript?

1. Using a Global Object or Map

```js
const apiCache = new Map();

const fetchWithCache = async (url) => {
  if (apiCache.has(url)) {
    console.log("Cache hit");
    return apiCache.get(url);
  }

  console.log("Cache miss");
  const response = await fetch(url);
  const data = await response.json();

  apiCache.set(url, data); // Store in cache
  return data;
};

// Example usage
fetchWithCache("https://api.example.com/data").then(console.log);
```

**Pros**

- Fast and simple.
- No external libraries are required.
  **Cons**
  - Cache data is lost when the page reloads.
  - Not suitable for long-term caching.

2. Using localStorage

```js
const fetchWithLocalStorageCache = async (url) => {
  const cached = localStorage.getItem(url);
  if (cached) {
    console.log("Cache hit");
    return JSON.parse(cached);
  }

  console.log("Cache miss");
  const response = await fetch(url);
  const data = await response.json();

  localStorage.setItem(url, JSON.stringify(data)); // Store in localStorage
  return data;
};

// Example usage
fetchWithLocalStorageCache("https://api.example.com/data").then(console.log);
```

**Pros**
Persistent across sessions.
Easy to implement.
**Cons**
Storage size limit (~5MB).
Data must be serialized (JSON).

3. Using sessionStorage
   Similar to localStorage, but data persists only for the duration of the browser session.

Use Case
Ideal for caching temporary data that doesn't need to persist after the tab is closed.

## 2. What are web workers, and how do they improve performance?

What Are Web Workers?
Web Workers are a feature in JavaScript that allows you to run scripts in the background, separate from the main browser thread. This means you can perform heavy computations or handle time-consuming tasks without freezing or blocking the main thread, ensuring the UI remains responsive.

Web Workers operate in their own thread, independent of the main thread (also known as the UI thread). They cannot directly manipulate the DOM or access the window object, but they can communicate with the main thread using messages.

**How Web Workers Work**
Creating a Web Worker: You create a worker by providing a JavaScript file containing the worker's logic.

Communication: The main thread and the worker communicate using the postMessage() method and respond to messages using the onmessage event.

Thread Isolation: Web Workers run in isolation, so you can't directly access variables or functions from the main thread.

### How to Use Web Workers

1. Creating a Web Worker

```js
// worker.js (Worker code)
self.onmessage = function (e) {
  console.log("Message received from main thread:", e.data);

  // Perform heavy computation
  const result = e.data * 2;

  // Send result back to the main thread
  self.postMessage(result);
};
```

2. Using the Web Worker

```js
// main.js (Main thread)
const worker = new Worker("worker.js");

// Send data to the worker
worker.postMessage(5);

// Receive data from the worker
worker.onmessage = function (e) {
  console.log("Message received from worker:", e.data); // Output: 10
};

// Handle errors in the worker
worker.onerror = function (e) {
  console.error("Worker error:", e.message);
};

// Terminate the worker when done
worker.terminate();
```

### Advantages of Web Workers

Improved Performance:

Heavy tasks (e.g., data processing, file parsing, or mathematical computations) can run in the background without blocking the UI.
Responsive UI:

Tasks running on Web Workers do not interfere with animations, user interactions, or page rendering.
Scalability:

Multiple Web Workers can be created to handle different tasks concurrently, enabling parallel processing.

## 3. How do you measure JavaScript performance?

Measuring JavaScript performance is essential for optimizing applications to ensure they run smoothly and efficiently. Here are the most common ways to measure and analyze JavaScript performance:

1. Using the console.time() and console.timeEnd()
   The simplest way to measure the time taken by a block of code is using these methods.

Example: Measuring Execution Time

```js
console.time("Execution Time"); // Start timer

// Code to measure
let sum = 0;
for (let i = 0; i < 1_000_000; i++) {
  sum += i;
}

console.timeEnd("Execution Time"); // End timer
// Output: Execution Time: XX ms
```

2. Using the performance.now()
   performance.now() provides a high-resolution timestamp (accurate to microseconds) for measuring code performance.

Example: High-Precision Timing

```js
const start = performance.now();

// Code to measure
let product = 1;
for (let i = 1; i <= 1000; i++) {
  product *= i;
}

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
```

3. Using Browser Developer Tools
   Modern browsers provide built-in tools to measure performance.

### Steps in Chrome DevTools:

- Open DevTools (Right-click > Inspect > Performance tab).
- Record performance while interacting with your app.
- Analyze the timeline, CPU usage, rendering times, and JavaScript execution.
  **Features**:
  - Visual breakdown of JavaScript execution, layout rendering, and paint operations.
  - Insights into slow-performing functions and bottlenecks.

4. Memory Usage Analysis
   Use the Memory tab in DevTools to measure memory usage and detect leaks.

**Steps to Check Memory:**

- Open DevTools > Memory tab.
- Take snapshots before and after a certain action.
- Compare snapshots to detect memory leaks or unnecessary allocations.
