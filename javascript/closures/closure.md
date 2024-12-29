# What is a Closure?

A closure is a function that remembers and accesses variables from its lexical scope even when the function is executed outside that scope.

In simpler terms:
A closure allows a function to "remember" the variables and state from the context in which it was created.

## How Closures Work (Under the Hood)

When a function is created, it captures the environment (scope) where it was defined. This environment contains references to variables that were in scope at that time.

Even if the outer function has finished executing, the inner function retains access to those variables.
The variables are not garbage-collected as long as the inner function is alive (i.e., referenced somewhere).

## Example 1: Basic Closure

```js
function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    console.log(counter);
  };
}

const increment = outer();
increment(); // 1
increment(); // 2
increment(); // 3
```

## Why?

counter is in the scope of outer().
inner() retains access to counter even after outer() has executed.

## Memory Retention (How Closures Retain Memory):

The increment function holds a reference to the counter variable, preventing it from being garbage-collected.
As long as increment exists, counter stays in memory.

### Potential Pitfall:

Memory leaks can happen if closures retain large objects unnecessarily.

### 1. Module Pattern (Encapsulation & Private Variables):

In Node.js, closures are heavily used to create private state and encapsulate functionality.

### Example: Basic Module

```js
const counterModule = (function () {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log(count);
    },
    decrement: function () {
      count--;
      console.log(count);
    },
    getCount: function () {
      return count;
    },
  };
})();

counterModule.increment(); // 1
counterModule.increment(); // 2
console.log(counterModule.getCount()); // 2
console.log(counterModule.count); // undefined (private)
```

### Why use this?

Encapsulation: Internal state (count) cannot be accessed directly.
Prevents accidental modification of private variables.

## 2. Function Factories (Dynamic Functions):

Closures allow the creation of dynamic functions that behave differently based on the context.

### Example: Creating API Rate Limiters

```js
function rateLimiter(maxRequests) {
  let requests = 0;

  return function () {
    if (requests < maxRequests) {
      requests++;
      console.log("Request allowed", requests);
    } else {
      console.log("Rate limit exceeded");
    }
  };
}

const limiter = rateLimiter(3);
limiter(); // Request allowed 1
limiter(); // Request allowed 2
limiter(); // Request allowed 3
limiter(); // Rate limit exceeded
```

### Use case in Backend:

Dynamic rate limiters per route.
API key-specific rate limiting.

### 3. Private Variables in Class-Like Structures

In Node.js, closures can replace private fields in ES6 classes for more flexibility.

```js
function createUser(name) {
  let _password = "default"; // Private variable

  return {
    setName: function (newName) {
      name = newName;
    },
    setPassword: function (newPassword) {
      _password = newPassword;
    },
    getPassword: function () {
      return _password;
    },
  };
}

const user = createUser("John");
user.setPassword("secure123");
console.log(user.getPassword()); // secure123
console.log(user._password); // undefined
```

### Why use this?

Simpler way to create private variables.
No need for class-based inheritance.

## 4. Memoization (Caching with Closures):

Closures are used to cache expensive operations and return results faster.

```js
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("From Cache");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

const memoFib = memoize(fib);
console.log(memoFib(30)); // Calculated
console.log(memoFib(30)); // From Cache
```

### Backend Usage:

Caching database results.
Avoiding recalculation of complex queries.
