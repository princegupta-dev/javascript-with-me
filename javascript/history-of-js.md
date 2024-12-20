#Hostory of JavaScript

## 1. Birth of JavaScript (1995)

## Who created it?

🧑‍💻 Brendan Eich, a Netscape Communications programmer, created JavaScript in just 10 days.

## Why Create it?

Websites at that time were static, with no interactivity (just HTML and CSS). Netscape wanted a scripting language to make pages dynamic. At that Netscape founder Marc Anderson thought, computer
systems do the calculation, so why do we need to request on the server for calculation?

## What is the means of static

A static website delivers fixed content to users' browsers. The content is "pre-built" and does not change based on user interaction or input.
For example: If you want to calculate the sum of two numbers, you request the server using HTML, and then the server returns a new HTML file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact Us</title>
  </head>
  <body>
    <h1>Contact Us</h1>
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required /><br /><br />

      <label for="message">Message:</label><br />
      <textarea id="message" name="message" rows="5" required></textarea
      ><br /><br />

      <button type="submit">Send</button>
    </form>
  </body>
</html>
```

Explanation:

1.The form data is sent to the server using an HTTP POST request (because of method="POST"). 2. The server receives the data and processes it. 3. The server returns a new HTML page (like a Thank You page) with a success message.

## What was it originally called?

Originally, it was called Mocha, then LiveScript, and finally JavaScript to ride the wave of Java's popularity at the time.

## Where did it run?

JavaScript was initially designed to run only in web browsers.

Fun Fact: The name "JavaScript" has nothing to do with Java. It was just a marketing trick to make it sound like the trendy language of the time.

## The Browser Wars (1996-1999)

Netscape vs. Microsoft
Internet Explorer (Microsoft) wanted its own version of JavaScript, so they made their version called JScript.

Standardization (ECMAScript)
To avoid fragmentation, an independent organization called ECMA (European Computer Manufacturers Association) was formed. They created the first official standard called ECMAScript (ES1) in 1997.

# Why ECMAScript?

JavaScript is the name of the language, but ECMAScript refers to the specification or standard.

## Is Javascript interpreted or compiled language

The answer is both! JavaScript has characteristics of both interpreted and compiled languages.
Originally, JavaScript was an interpreted language, but with modern JIT (Just-In-Time) compilation, it behaves more like a compiled language.

## 1. What is an Interpreted Language?

An interpreted language executes code line-by-line or statement-by-statement. Each line is converted into machine-readable code at runtime by an interpreter.
Since each line is translated line by line, it's slower.

## How Interpreted Execution Works

```javascript
console.log("Hello, World!");
```

The interpreter reads line-by-line and converts it to machine code.

## how this code will be interpreted?

It goes through several stages inside the V8 engine (used in Chrome, Node.js, etc.).
Here's a complete, detailed process of how JavaScript source code is transformed into machine code and ultimately executed.

1. Source Code: The raw JavaScript file you write (console.log('Hello, World!')).
2. Parsing: Converts the source code into an Abstract Syntax Tree (AST).--> The V8 engine(other engines also) reads the JavaScript source code character by character. It breaks the code into tokens (like console, ., log, (, 'Hello, World!', ), and ;).These tokens are then structured into an Abstract Syntax Tree (AST).
3. Bytecode Generation: Converts the AST into bytecode (an intermediate code).
4. JIT Compilation: Frequently used parts of the code are compiled into machine code.
5. Execution: The machine code is executed by the CPU.

6. ## What is an AST?
   An AST is a tree-like structure that represents the logical structure of the code. Each node in the tree represents an operation or statement.

## Example

```javascript
Program
  └── ExpressionStatement
      └── CallExpression
          ├── MemberExpression
          │   ├── Identifier: "console"
          │   └── Identifier: "log"
          └── Literal: "Hello, World!"
```

## Step 2: Bytecode Generation

What happens?

The AST is fed into a bytecode generator (like Ignition in V8).
Bytecode is platform-independent intermediate code, like assembly code but specific to the V8 engine.
This bytecode is later interpreted or compiled into machine code.
Why use bytecode?

It allows JavaScript to be more efficient because bytecode can be reused.
It allows V8 to make dynamic optimizations later when it notices that certain functions are being used frequently.

## Example Bytecode (for console.log('Hello, World!')):

```javascript
0x1: LoadGlobal "console"
0x2: LoadProperty "log"
0x3: LoadLiteral "Hello, World!"
0x4: CallFunction 1
0x5: Return
```

The AST is converted into bytecode, which is faster to interpret than raw source code.
This bytecode will either be interpreted directly or JIT-compiled later.

## Step 3: JIT Compilation (Just-In-Time)

What happens?

Initially, the V8 engine interprets the bytecode.
If it sees that the same function (like console.log()) is called frequently, it sends this code to the JIT (TurboFan) compiler.
The JIT compiler converts the bytecode into machine code (binary instructions) directly.
How JIT works in V8?

Baseline Compiler (Ignition): Interprets and runs the bytecode.
Optimizing Compiler (TurboFan): If V8 detects that a certain function (like console.log()) is "hot" (used frequently), it compiles it into machine code to make it run faster.
Summary:

V8 optimizes frequently used parts of the program by converting bytecode to machine code.
Once it's converted, it no longer needs to recompile that part of the program.

## Step 4: Machine Code Execution

What happens?

The final stage is the execution of the machine code on the CPU.
The V8 engine passes the machine code to the CPU for execution.
The machine code is highly optimized, and it runs much faster than the interpreted bytecode.
What is machine code?

Machine code is the lowest level of instructions for the CPU.
It is binary code (1s and 0s) that directly interacts with the CPU.

After compilation, machine code is sent to the CPU.
The machine code runs at full speed since it's already optimized for the processor.

## Frequently Asked Questions

1️⃣ Why doesn't V8 always compile everything to machine code?
Compilation takes time. If every line was compiled, it would be slow to start.
V8 waits until a function is called frequently before optimizing it.
2️⃣ What happens if I change my code?
When the source code changes, V8 has to re-parse, recompile, and re-optimize everything.
This is why V8 maintains the bytecode first, so it can recompile only what's necessary.
3️⃣ What does console.log do internally?
console.log calls a native function (written in C++) that interacts with the stdout (standard output) of the OS.
It logs the text to the browser console or Node.js terminal.

## Key Takeaways

V8 Engine uses 3 stages: Parsing, Bytecode, and Machine Code.
It uses a JIT (Just-in-Time) Compiler to optimize "hot" functions.
V8 converts the source code into an Abstract Syntax Tree (AST) first.
The JIT compiler (TurboFan) converts frequently used functions into machine code.
This process makes modern JavaScript much faster than old interpreters.

## What is JIT (Just-In-Time) Compilation?

JIT Compilation combines the best of both worlds (interpreted and compiled). It compiles parts of the code during execution, but only the parts that are frequently used.

📘 Why use JIT?

Faster Execution: Compiles hot (frequently used) code into machine code.
Saves Time: No need to compile the entire program like a traditional compiler.
Better Optimization: The JIT compiler can optimize "hot code" while the program runs.

## 2. What is a Compiled Language?

A compiled language translates the entire source code into machine code before execution. The result is a binary file or executable file (.exe, .bin, etc.) that can run on its own.
