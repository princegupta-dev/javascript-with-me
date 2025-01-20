## Question 1. Explain prototypal inheritance in JavaScript.

## Que 2. How does the Object.create() method work?

The Object.create() method creates a new object with the specified prototype object and properties. It provides an easy way to set up inheritance between objects.

```js
const proto = {
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};

const obj = Object.create(proto);
obj.name = "Alice";
obj.greet(); // Output: "Hello, Alice"
```

## Ques 3 What are ES6 classes, and how do they relate to prototypes?

ES6 classes are syntactic sugar over JavaScript's prototypal inheritance. They provide a cleaner, more concise, and familiar syntax for creating objects and managing inheritance. Although they look like classes in other object-oriented languages, they still rely on prototypes behind the scenes.

```js
class Person {
  constructor(name, age) {
    this.name = name; // Instance property
    this.age = age;
  }

  greet() {
    // Method on the prototype
    console.log(`Hello, my name is ${this.name}.`);
  }

  static info() {
    // Static method
    console.log("This is a static method.");
  }
}

// Create an instance
const person1 = new Person("Alice", 30);
person1.greet(); // "Hello, my name is Alice."
Person.info(); // "This is a static method."
```

## Question 4. How would you implement a mixin pattern in JavaScript?
