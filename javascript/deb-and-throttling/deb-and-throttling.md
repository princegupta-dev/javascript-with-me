# Debouncing and throttling

Debouncing and throttling are both techniques used to control the rate at which a function is executed, especially when the function is triggered by events like user input, scrolling, or resizing. They are often used to optimize performance by limiting the frequency of calls to an event handler or API.

## 1. Debouncing

Debouncing is a technique used to ensure that a function is executed only once after a certain delay, and it prevents the function from being triggered multiple times during rapid events (like typing in an input field). The function is executed only after the event has stopped firing for a specified amount of time.

**How It Works:**

- The function will not be called until there has been a delay (the "debounce delay") after the last event is triggered.
- If the event is triggered again before the delay is over, the previous call is cancelled and a new timer starts.
- Useful for handling events like keypress, scroll, or resize, where you don't need to act on every single trigger but rather after the user finishes their action.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Debouncing Example</title>
  </head>
  <body>
    <h2>Search Input (Debounced)</h2>
    <input type="text" id="searchInput" placeholder="Start typing..." />
    <p>Search Query: <span id="searchQuery">None</span></p>

    <script src="app.js"></script>
  </body>
</html>
```

```js
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId); // Clear the previous timeout
    timeoutId = setTimeout(() => fn(...args), delay); // Set a new timeout
  };
}

// Example usage: Debounced search input handler
const searchHandler = debounce(function (event) {
  console.log("Searching for:", event.target.value);
}, 500);

// Attach to an input event
document.querySelector("input").addEventListener("input", searchHandler);
```

**Explanation:**
In this example, the search function is debounced. The handler is called only after 500ms of inactivity.
If the user types quickly, the previous setTimeout call is cleared, and only the final one will trigger the search after they stop typing.

## 2. Throttling

Throttling is a technique that limits the number of times a function can be called over time. Unlike debouncing, throttling ensures that the function is called at regular intervals, regardless of how many times the event occurs. This is useful for tasks like scrolling, where you want to limit the number of times the handler is called to avoid excessive processing.

**How It Works:**

- The function is executed at most once every specified interval (e.g., 200ms).
- The first call happens immediately, and subsequent calls are ignored until the interval has passed.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Throttling Example</title>
    <style>
      body {
        height: 2000px; /* Make the page long to enable scrolling */
        background-color: lightblue;
      }
    </style>
  </head>
  <body>
    <h2>Scroll Event (Throttled)</h2>
    <p>Scroll Position: <span id="scrollPosition">0</span></p>

    <script src="app.js"></script>
  </body>
</html>
```

```js
// Throttle function
function throttle(fn, interval) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
}

// Function to update scroll position
function updateScrollPosition() {
  const scrollPosition = window.scrollY;
  document.getElementById("scrollPosition").textContent = scrollPosition;
}

// Attaching the throttled function to the scroll event
const throttledScroll = throttle(updateScrollPosition, 200); // 200ms interval
window.addEventListener("scroll", throttledScroll);
```

**Explanation:**

- In this example, the scrollHandler will only be called once every 200ms, even if the scroll event is triggered more frequently.
- This prevents the handler from being called on every scroll event, thus optimizing performance (especially when handling expensive operations like animations or API calls).
