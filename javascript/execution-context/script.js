debugger;

var x = 10; // Global Execution Context

function outerFunction(y) {
  var z = 20; // Function Execution Context (FEC1)

  function innerFunction() {
    var a = 30; // Function Execution Context (FEC2)
    console.log(x, y, z, a); // Access to outer lexical environments (scope chain)
  }

  innerFunction();
}

outerFunction(40);

// Visualize the Call Stack

function first() {
  console.log("Inside First");
  second();
}

function second() {
  console.log("Inside Second");
  third();
}

function third() {
  console.log("Inside Third");
}

first();

// Understand Hoisting
console.log(a); // ???
var a = 5;
hoistedFunction();

function hoistedFunction() {
  console.log("This function is hoisted!");
}

console.log(b); // ???
let b = 10;

// Master Closures and Scope Chain
function outerFunction(x) {
  return function innerFunction(y) {
    console.log(x + y);
  };
}

const closure = outerFunction(5);
closure(10); // ???

//Understanding Lexical Environment
const x = 100;

function outer() {
  const y = 50;
  function inner() {
    const z = 10;
    console.log(x, y, z); // ???
  }
  inner();
}

outer();

// Function Scope vs Block Scope
function scopeExample() {
  if (true) {
    var x = 5;
    let y = 10;
    const z = 15;
  }
  console.log(x); // ???
  console.log(y); // ???
  console.log(z); // ???
}

scopeExample();

// Scope Chain Walkthrough
const a = 10;

function one() {
  const b = 20;

  function two() {
    const c = 30;
    console.log(a, b, c); // ???
  }

  two();
}

one();
