## Question 1. Explain the concept of IIFE (Immediately Invoked Function Expression).

An IIFE is a JavaScript function that is defined and immediately executed right after its creation. The primary purpose of using IIFE is to create a local scope for variables, avoiding polluting the global scope.

### Syntax of IIFE

**1. Classic Syntax (Anonymous Function)**

```js
(function () {
  // code inside function
})();
```

**Named Function Syntax**

```js
(function myFunction() {
  // code inside function
})();
```

### Why Use IIFE?

**Creating a Local Scope:**

- An IIFE provides a local scope that avoids polluting the global namespace.
- Variables declared inside an IIFE are not accessible outside, which prevents potential conflicts.

```js
(function () {
  var x = 10;
  console.log(x); // 10
})();

console.log(x); // ReferenceError: x is not defined
```

**Encapsulation:**
Useful when you want to encapsulate code and avoid affecting other parts of your program, especially in the case of modular code.
**Preventing Global Namespace Pollution:**

IIFEs can be used to keep your variables and functions private

**Used in Asynchronous Code (like in loops):**

They are commonly used in loops, especially for async operations like setTimeout or setInterval, where you need to create closures to preserve the value of variables inside each loop iteration.

```js
for (var i = 0; i < 3; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index); // Outputs 0, 1, 2
    }, 1000);
  })(i);
}
```

Without the IIFE, the setTimeout function would reference the same variable i, and it would print 3 three times instead of 0, 1, and 2.

**Self-Executing Functions:**

Sometimes, you may want to execute some code immediately after defining it, and IIFE allows that to happen.

## anonymous function

An anonymous function is a function in JavaScript that is defined without a name. It is often used when a function is needed for a short duration or passed as an argument to another function, and you don't need to refer to it by name elsewhere in the code.

```js
const greet = function () {
  console.log("Hello, world!");
};
greet(); // Outputs: Hello, world!
```

## Question 2. How do arrow functions differ from regular functions?

Arrow functions in JavaScript are a more concise way of writing functions, and they differ from regular functions in several key ways. Let's break down the differences between arrow functions and regular functions:

## 1. Syntax

Arrow functions have a shorter, more concise syntax compared to regular functions.
**Regular Function Syntax:**

```js
function sum(a, b) {
  return a + b;
}
```

**Arrow Function Syntax:**

```js
const sum = (a, b) => a + b;
```

## 2. this Binding

The most important difference between arrow functions and regular functions is how they handle the this keyword.
**Regular Functions:** In regular functions, this is dynamically bound based on how the function is called. It can be different depending on the context in which the function is invoked (i.e., it refers to the object calling the function).

```js
function Person(name) {
  this.name = name;
  setTimeout(function () {
    console.log(this.name); // 'this' refers to the global object or undefined in strict mode
  }, 1000);
}
const person = new Person("Alice");
```

In the example above, inside the setTimeout, this refers to the global object (window in browsers), not the Person object. This is a common problem when using regular functions.

**Arrow Functions**: Arrow functions do not have their own this context. Instead, they inherit this from the surrounding lexical context (the enclosing scope). In other words, this in an arrow function refers to the this value of the outer function or object where the arrow function is defined.

```js
function Person(name) {
  this.name = name;
  setTimeout(() => {
    console.log(this.name); // 'this' refers to the Person object
  }, 1000);
}
const person = new Person("Alice");
```

Here, the arrow function keeps the same this value as the enclosing Person function, so it correctly refers to the Person object.

## 3. Arguments Object

Regular functions have an arguments object that contains all the arguments passed to the function, even if they are not explicitly named in the parameter list.

**Regular Function Example:**

```js
function sum() {
  console.log(arguments); // Array-like object containing all arguments
}
sum(1, 2, 3); // Outputs: [1, 2, 3]
```

**Arrow Function Example**: Arrow functions do not have their own arguments object. Instead, they inherit the arguments object from the enclosing scope.

````js
const sum = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};
sum(1, 2, 3);
```
````

In this case, the arrow function does not have its own arguments, and trying to access it directly will result in a ReferenceError.

## 4. Constructor Function

Regular functions can be used as constructor functions with the new keyword, whereas arrow functions cannot.
**Regular Function as Constructor:**

```js
function Person(name) {
  this.name = name;
}
const person = new Person("Alice");
console.log(person.name); // Outputs: Alice
```

**Arrow Function** as Constructor (Not Allowed):

```js
const Person = (name) => {
  this.name = name; // Error: arrow functions cannot be used as constructors
};
const person = new Person("Alice"); // TypeError: Person is not a constructor
```

Arrow functions cannot be used as constructors, and attempting to do so results in a TypeError.

## 5. Return Behavior

In regular functions, you have to explicitly use the return keyword to return a value. In arrow functions, if the function consists of a single expression, the return keyword is implied.

```js
function sum(a, b) {
  return a + b;
}
```

```js
const sum = (a, b) => a + b; // No need for 'return' keyword
```

## Question 3. What is the this keyword, and how does it behave in different contexts?

The this keyword in JavaScript refers to the context in which a function is executed, and its value is determined by how the function is called. Understanding how this behaves in different contexts is crucial for working with JavaScript effectively. Here's an overview of the different contexts and how this behaves:

### 1. Global Context (Outside of Any Function)

In the global execution context (outside of any function), this refers to the global object.

In browsers, this refers to the window object.
In Node.js, this refers to the global object.

```js
console.log(this); // In a browser, this will log the `window` object
```

### 2. Inside a Regular Function (Non-Strict Mode)

When a regular function is called in the global context (i.e., not as a method of an object), this refers to the global object (window in browsers, global in Node.js), not the function itself

```js
function regularFunction() {
  console.log(this); // In a browser, this will log the `window` object
}

regularFunction();
```

### 3. Inside a Regular Function (Strict Mode)

When JavaScript is running in strict mode ('use strict';), this behaves differently in regular functions. In strict mode, this remains undefined if the function is invoked without a context (i.e., not as a method of an object).

Example:

```js
"use strict";
function regularFunctionStrict() {
  console.log(this); // In strict mode, this will be `undefined`
}

regularFunctionStrict();
```

### 4. As a Method of an Object

When a function is called as a method of an object (i.e., as object.method()), this refers to the object itself.

Example:

```js
const person = {
  name: "Alice",
  greet: function () {
    console.log(this.name); // `this` refers to the `person` object
  },
};

person.greet(); // Outputs: Alice
```

### 5. In Arrow Functions

Arrow functions behave differently than regular functions with respect to this. They lexically inherit the value of this from the surrounding context in which they are defined. Arrow functions do not have their own this; instead, this is determined by the outer function or the outer object in which the arrow function is defined.

Example:

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(this.name); // `this` refers to the `person` object (inherited from the enclosing `greet` function)
    }, 1000);
  },
};

person.greet(); // Outputs: Alice
```

### 6. With the call(), apply(), and bind() Methods

The value of this can be explicitly set using the call(), apply(), and bind() methods, which allow you to invoke a function with a specified this value.

call(): Immediately invokes the function and sets this.
apply(): Immediately invokes the function and sets this with arguments passed as an array.
bind(): Returns a new function that, when called, will have its this set to the provided value.

### 7. With Constructors (Using new)

When a function is invoked with the new keyword, this refers to the newly created instance (object) of that constructor function.

Example:

```js
function Person(name) {
  this.name = name;
}

const person = new Person("Alice");
console.log(person.name); // Outputs: Alice
```

### 8. Inside Class Methods

In ES6 classes, this behaves similarly to how it works in regular object methods. Inside a class method, this refers to the instance of the class (the object created with new).

Example:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const person = new Person("Alice");
person.greet(); // Outputs: Alice
```

### 9. In setTimeout() and setInterval()

The behavior of this in setTimeout() and setInterval() depends on how the callback is defined. In regular functions, this will refer to the global object (in non-strict mode) or undefined (in strict mode). However, in arrow functions, this will refer to the enclosing context.

Example with setTimeout():

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(function () {
      console.log(this.name); // In non-strict mode, `this` will refer to the global object (undefined or error)
    }, 1000);
  },
};

person.greet(); // Undefined or error (in strict mode)
```

Example using an arrow function in setTimeout():

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(this.name); // `this` refers to the `person` object
    }, 1000);
  },
};

person.greet(); // Outputs: Alice
```

## Question 4. How can you prevent a function from being invoked multiple times?

1. Using a Flag (Boolean Variable)
2. Using once with Event Listeners (for DOM Events)
3. Debouncing (Commonly Used in User Input)
4. Throttling (Commonly Used in Scroll or Resize Events)
5. Using setTimeout or setInterval with Clear Logic
6. Using Promise with State Tracking

## Question 5. Explain currying in JavaScript with an example

Currying is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions that each take a single argument. Instead of passing all arguments to the function at once, currying allows you to pass arguments one at a time, with each subsequent function call using the previously provided argument.

In simpler terms, currying is the process of breaking down a function that takes multiple arguments into a series of functions that each take one argument and return a new function until all arguments are provided.

**Why Use Currying?**
**Partial Application:** Currying allows you to apply a function partially with some arguments and then apply the remaining arguments later. This is useful when you have a function that needs to be called multiple times with similar arguments.

**Code Readability:** By curried functions, you can write cleaner, more readable code that is modular and reusable.

**Reusability**: Currying can create more reusable functions that can be partially applied with different sets of arguments.

**1. Basic Example:**

```js
// A simple function that takes two arguments
function add(a, b) {
  return a + b;
}

// Currying the add function
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

// Using the curried function
const addFive = curriedAdd(5); // `addFive` is now a function that adds 5 to any number
console.log(addFive(10)); // Output: 15

console.log(curriedAdd(5)(10)); // Output: 15
```

2. Currying with Multiple Arguments:

```js
// Currying a function that takes three arguments
function multiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

// Using the curried function
const result = multiply(2)(3)(4); // Output: 24
console.log(result);
```

## Question 6 6. How do you handle optional parameters in JavaScript?

1. Default Parameters
2. Checking for undefined
3. Using the arguments Object
4. Rest Parameters (...args)
5. Using Object Destructuring with Defaults

## Question 7. How would you memoize a function?

Memoization is a technique used to improve the performance of functions by caching the results of expensive function calls and returning the cached result when the same inputs occur again. It's particularly useful for functions that are called repeatedly with the same arguments, such as recursive functions.

In JavaScript, you can memoize a function by creating a wrapper that stores the results of function calls and checks if the result for the given input already exists in the cache before calling the function again.

```js
function memoize(fn) {
  const cache = {}; // Cache to store results

  return function (...args) {
    // Convert the arguments to a string to use as a cache key
    const key = JSON.stringify(args);

    // Check if the result is already cached
    if (cache[key]) {
      console.log("Fetching from cache");
      return cache[key];
    }

    // If not cached, call the function and store the result
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Example usage
function add(a, b) {
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3 (Fetched from cache)
console.log(memoizedAdd(2, 3)); // 5
```

**Explanation**:
Function memoize(fn): Takes the original function fn as an argument and returns a new function that caches results.
Cache Object: We use an object cache to store the results of the function calls. The key for each result is the stringified version of the function’s arguments (JSON.stringify(args)).
Cache Check: Before calling the function, it checks if the result for the given arguments is already in the cache.
Storing Results: If the result is not cached, the function is executed and the result is stored in the cache for future calls with the same arguments.

```js
function memoize(fn) {
  const cache = new Map(); // Use Map for cache

  return function (...args) {
    const key = args.toString(); // Use args as a key

    if (cache.has(key)) {
      console.log("Fetching from cache");
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Example usage
function multiply(a, b) {
  return a * b;
}

const memoizedMultiply = memoize(multiply);

console.log(memoizedMultiply(2, 3)); // 6
console.log(memoizedMultiply(2, 3)); // 6 (Fetched from cache)
console.log(memoizedMultiply(3, 4)); // 12
```

**Example with Recursive Function**
Without memoization, the Fibonacci function has an exponential time complexity

```js
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(30)); // Slow for larger values of n
```

With memoization, we can reduce the time complexity to linear:

```js
function memoize(fn) {
  const cache = {};

  return function (n) {
    if (n in cache) {
      return cache[n];
    }

    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(30)); // Much faster
```

## Question 8. Describe higher-order functions and provide examples.

A higher-order function is a function that either:

- Takes one or more functions as arguments.
- Returns a function as its result.

In other words, a higher-order function operates on functions, either by taking them as arguments or by returning them.

This concept is widely used in JavaScript, especially in functional programming, and plays an important role in making code more modular, reusable, and abstract.

**Examples of Higher-Order Functions**

1. Functions that Accept Other Functions as Arguments
   A function that takes another function as an argument is a higher-order function.

For example, the Array.prototype.map() method is a higher-order function that takes a function as an argument and applies it to each element of an array.

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6, 8]
```

In the example above, map() is a higher-order function because it accepts a function as an argument (function(num) {...}).

2. Functions that Return Another Function
   A function that returns another function is also considered a higher-order function. This is commonly used in closures.

Example: A function that returns another function based on parameters.

```js
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const multiplyBy2 = multiplier(2); // multiplier(2) returns a function
console.log(multiplyBy2(5)); // 10

const multiplyBy3 = multiplier(3); // multiplier(3) returns another function
console.log(multiplyBy3(5)); // 15
```

n this example, multiplier() is a higher-order function because it returns a new function (function(number) {...}) when called.

3. Using Functions for Composition
   Higher-order functions can be used to combine multiple functions into a new one, like function composition.

Example: A function that combines two functions:

```js
function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

function square(x) {
  return x * x;
}

function double(x) {
  return x * 2;
}

const squareThenDouble = compose(double, square);

console.log(squareThenDouble(4)); // 32, because (4^2) * 2 = 32
```

In this case, compose() is a higher-order function because it takes two functions (f and g) as arguments and returns a new function that applies g first and then f to the result.

4. Array Methods as Higher-Order Functions
   JavaScript's built-in array methods like filter(), reduce(), and forEach() are examples of higher-order functions because they take a function as an argument and apply it to the array elements.

Example of filter() (Higher-order function):

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});

console.log(evenNumbers); // [2, 4]
```

reduce() method in JavaScript is a higher-order function because it takes a callback function as an argument and applies that callback to reduce an array to a single value.

```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 15
```
