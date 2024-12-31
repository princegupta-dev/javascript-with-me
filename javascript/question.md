## Hoisting

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope during compilation, before the code is executed.

```js
console.log(a); // undefined
var a = 5;
console.log(a); // 5
```
/////
## this

In JavaScript, this refers to the context in which a function is executed. Its value depends on how the function is called.

## Simple Rules for this:

```js
console.log(this); // In browsers: window, In Node.js: global
```

Inside an Object (Method Call)

```js
const obj = {
  name: "Prince",
  greet() {
    console.log(this.name); // 'Prince'
  },
};
obj.greet();
```

Alone in a Function (Strict Mode vs Non-Strict Mode)

```js
function show() {
  console.log(this); // undefined (strict), global (non-strict)
}
```

Arrow Functions (No Own this)

```js
const obj = {
  name: "Prince",
  greet: () => {
    console.log(this.name); // undefined (inherits `this` from parent scope)
  },
};
obj.greet();
```

Explicit Binding (call, apply, bind)

```js
function show() {
  console.log(this.name);
}
const user = { name: "Prince" };
show.call(user); // 'Prince'
```
