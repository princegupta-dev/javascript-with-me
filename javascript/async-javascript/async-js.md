## Introducing asynchronous JavaScript

Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

Many functions provided by browsers, especially the most interesting ones, can potentially take a long time, and therefore, are asynchronous. For example:

Making HTTP requests using fetch()
Accessing a user's camera or microphone using getUserMedia()
Asking a user to select files using showOpenFilePicker()

So even though you may not have to implement your own asynchronous functions very often, you are very likely to need to use them correctly.

## Synchronous programming

Consider the following code:

```js
const name = "Miriam";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting);
// "Hello, my name is Miriam!"
```

This code:

Declares a string called name.
Declares another string called greeting, which uses name.
Outputs the greeting to the JavaScript console.
We should note here that the browser effectively steps through the program one line at a time, in the order we wrote it. At each point, the browser waits for the line to finish its work before going on to the next line. It has to do this because each line depends on the work done in the preceding lines.

That makes this a synchronous program. It would still be synchronous even if we called a separate function, like this:

```js
function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}

const name = "Miriam";
const greeting = makeGreeting(name);
console.log(greeting);
// "Hello, my name is Miriam!"
```

Here, makeGreeting() is a synchronous function because the caller has to wait for the function to finish its work and return a value before the caller can continue.

////
