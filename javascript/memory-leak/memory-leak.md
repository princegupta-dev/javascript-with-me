Memory leaks occur when an application retains references to objects that are no longer needed, preventing the garbage collector from reclaiming that memory.

## Closures

A closure is a function that captures variables from its outer scope. Memory leaks can occur when closures retain references to unused variables or objects

```js
function createLeak() {
  const largeArray = new Array(1000000).fill("leak");
  return function () {
    console.log(largeArray[0]);
  };
}

const leak = createLeak();
// The `largeArray` is still referenced by the closure, even though we don't need it anymore.
```

## Why It Leaks

- The closure keeps a reference to the outer function's variables (largeArray), even if the outer function is no longer in use.
- This prevents the garbage collector from reclaiming the memory occupied by largeArray.

## How to Avoid

- Avoid creating unnecessary closures.
- Explicitly nullify references if you no longer need them:

```js
let leak = createLeak();
leak = null; // Removes the reference to the closure and allows garbage collection.
```

## 2. Timers

Memory leaks can occur if you set up timers like setInterval or setTimeout and forget to clear them when they're no longer needed.

```js
function createTimer() {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
}

createTimer(); // The timer keeps running indefinitely.
```

## Why It Leaks

The timer keeps a reference to the callback function, preventing the garbage collector from reclaiming any variables captured by that function.

## How to Avoid

Clear timers when they are no longer needed

```js
const timer = setInterval(() => {
  console.log("Running...");
}, 1000);

// Clear the timer when it's no longer needed.
clearInterval(timer);
```

## 3. Event Listeners

Event listeners can cause memory leaks if they are not properly removed when the objects they reference are no longer needed.

```js
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

## Why It Leaks

The event listener keeps a reference to the DOM element (button) and the callback function. If the button element is removed from the DOM without removing the listener, it prevents both the listener and the element from being garbage collected.

## How to Avoid

Remove event listeners when they are no longer needed:

```js
const button = document.getElementById("myButton");
const handleClick = () => console.log("Button clicked");
button.addEventListener("click", handleClick);

// Remove the listener
button.removeEventListener("click", handleClick);
```

## 4. DOM References

Holding references to DOM elements in variables or data structures can cause memory leaks if those elements are removed from the DOM but not from the variable.

```js
const cachedElements = [];
function cacheElement() {
  const element = document.getElementById("myElement");
  cachedElements.push(element);
}
```

## Why It Leaks

If the DOM element (#myElement) is removed from the DOM tree, the reference in cachedElements still prevents it from being garbage collected.

## How to Avoid

- Avoid storing references to DOM elements unnecessarily.
- Clear references when the element is removed:

```js
cachedElements.length = 0; // Clears all references in the array.
```
