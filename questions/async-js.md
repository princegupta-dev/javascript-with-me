## 1. How does the fetch API differ from XMLHttpRequest?

The fetch() API and XMLHttpRequest (XHR) are both used to make HTTP requests in JavaScript, but the fetch() API is more modern, flexible, and easier to use. Here's a detailed comparison:

### 1. Syntax and Simplicity

**Fetch API:**

Uses a Promise-based syntax, which is more modern and easier to work with, especially when handling asynchronous code.

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

**XMLHttpRequest**:

Uses callback-based syntax, which can become clunky and harder to maintain with multiple nested callbacks (callback hell).

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("Error:", xhr.status);
  }
};
xhr.onerror = () => console.error("Request failed");
xhr.send();
```

### 2. Response Handling

**Fetch API:**

Separates the network request from the response parsing. For example, you need to explicitly call .json(), .text(), or other methods to parse the response body

```js
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data));
```

**XMLHttpRequest**

Automatically provides the response in xhr.responseText or xhr.response (depending on the response type). However, handling errors requires extra effort.

```js
if (xhr.status === 200) {
  const data = JSON.parse(xhr.responseText);
  console.log(data);
}
```

### 3.Streaming

**Fetch API:**

Supports streaming responses, allowing you to process data as it's received (e.g., working with large files or real-time data).

```js
fetch("https://api.example.com/large-data").then((response) => {
  const reader = response.body.getReader();
  // Process the data stream here
});
```

**XMLHttpRequest**:

- Does not natively support streaming responses.

### 4. Error Handling

**Fetch API:**

Does not automatically reject the Promise for HTTP errors (like 404 or 500). You need to manually check response.ok or the response.status.

```js
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => console.error("Error:", error));
```

**XMLHttpRequest**:

You need to handle errors manually in the onerror and onload callbacks, making the code more verbose.

### 5. Cross-Origin Requests (CORS)

**Fetch API:**

Fully supports CORS and is designed to work seamlessly with modern APIs.
**XMLHttpRequest**:

Also supports CORS, but configuring it can be more complex.

### When to Use Each

Use **fetch()** when:

- Writing modern, clean, and readable asynchronous code.
- You need advanced features like streaming or working with async/await.

  Use **XMLHttpRequest** when:

- You need compatibility with very old browsers like Internet Explorer.
- You're working in an environment that does not yet support fetch().

## 2. How can you implement a timeout for a promise?

To implement a timeout for a Promise, you can use a combination of Promise.race() and a setTimeout() to race the original Promise against a timeout Promise. The timeout Promise rejects or resolves after the specified duration, effectively acting as a "timeout guard."

```js
function promiseWithTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Promise timed out")), timeout)
    ),
  ]);
}
```

## 3. Explain how Promise.all(), Promise.race(), and Promise.allSettled() work.

**1. Promise.all()**
Promise.all() takes an array of Promises and resolves when all the Promises resolve, or rejects as soon as one Promise rejects.

```js
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    /* results is an array of resolved values */
  })
  .catch((error) => {
    /* runs if any promise rejects */
  });
```

**Key Points**

- It rejects immediately if any Promise in the array rejects.
- If all Promises resolve, it returns an array of resolved values.
- Useful for running multiple asynchronous tasks in parallel and waiting for all of them to complete.

```js
const promise1 = Promise.resolve(10);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(20), 2000));
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then((results) => console.log(results)) // Output: [10, 20, 30]
  .catch((error) => console.error(error));
```

**Use Case**
Waiting for all API requests to complete before processing data.

2. **Promise.race()**
   Promise.race() takes an array of Promises and resolves or rejects as soon as the first Promise settles (resolves or rejects).

```js
const fastPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Fast!"), 500)
);
const slowPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Slow!"), 2000)
);

Promise.race([fastPromise, slowPromise])
  .then((result) => console.log(result)) // Output: "Fast!"
  .catch((error) => console.error(error));
```

3. **Promise.allSettled()**
   Promise.allSettled() takes an array of Promises and resolves when all the Promises settle (either resolve or reject). It never rejects and returns an array of objects describing each Promise's outcome.

```js
const promise1 = Promise.resolve(10);
const promise2 = Promise.reject("Error occurred!");
const promise3 = new Promise((resolve) => setTimeout(() => resolve(30), 1000));

Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  console.log(results)
);
```

Output

```js
[
  { status: "fulfilled", value: 10 },
  { status: "rejected", reason: "Error occurred!" },
  { status: "fulfilled", value: 30 },
];
```

**Use Case**
Aggregating results from multiple API calls where some may fail but you want to handle both successes and failures.

## 4. How do you handle asynchronous loops in JavaScript?

### 1. Using for...of with async/await

The most common and straightforward way is to use for...of in combination with async/await. This ensures that each iteration waits for the asynchronous operation to complete before moving to the next.

```js
async function processItems(items) {
  for (const item of items) {
    const result = await doAsyncTask(item);
    console.log(result); // Processes one item at a time
  }
  console.log("All items processed!");
}

async function doAsyncTask(item) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Processed ${item}`), 1000)
  );
}

// Example usage
processItems([1, 2, 3, 4]);
```

### 2. Using map() with Promise.all for Parallel Execution

If you want to run all asynchronous operations in parallel (e.g., for better performance), use Array.map() to create an array of Promises, and then wait for all of them to complete with Promise.all().

```js
async function processItems(items) {
  const results = await Promise.all(
    items.map(async (item) => {
      const result = await doAsyncTask(item);
      return result;
    })
  );

  console.log(results); // Outputs an array of results
}

async function doAsyncTask(item) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Processed ${item}`), 1000)
  );
}

// Example usage
processItems([1, 2, 3, 4]);
```
