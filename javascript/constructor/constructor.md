## constructor

A constructor is a special function or method in object-oriented programming that is automatically called when an object of a class is created. Its primary purpose is to initialize the object by setting initial values to its attributes or performing any setup required when the object is instantiated.

## Real-Life Scenario: Building a Car Factory

Imagine you're building a Car Factory. Every time a new car is made, you need to set some basic properties like model, color, and year.

### Step 1: Class as a Blueprint (Car Design)

A class is like the blueprint of the car. It defines the structure, but it isn't a physical car yet.

```js
class Car {
  constructor(model, color, year) {
    this.model = model;
    this.color = color;
    this.year = year;
  }
}
```

The Car class has a constructor that initializes the model, color, and year.
this.model means "the model of this particular car I'm building."

## Step 2: Creating Cars (Objects)

Now, when the factory makes a car, we use the class to create an object (actual car).

```js
const car1 = new Car("Tesla Model 3", "Red", 2023);
const car2 = new Car("Ford Mustang", "Blue", 2020);
```

car1 and car2 are different cars created from the Car class blueprint.
Each car has unique values for model, color, and year.

### How this Works in This Example:

When car1 is created, this.model refers to Tesla Model 3 for car1.
When car2 is created, this.model refers to Ford Mustang for car2.
This helps ensure each car (object) has its own data.

Without this, all cars might end up having the same values, which isn't practical.

### Visualizing Memory (How It’s Stored):

The Car class exists once in memory as a blueprint.
car1 and car2 are separate objects stored in memory with their unique data.

```c
Memory:
Car (Blueprint)
  ↳ car1 { model: 'Tesla Model 3', color: 'Red', year: 2023 }
  ↳ car2 { model: 'Ford Mustang', color: 'Blue', year: 2020 }
```

## Key Points About Constructors:

Automatic Invocation: It runs automatically during object creation.
Initialization: It initializes object properties.
Naming: In most languages, the constructor has the same name as the class (e.g., Person class will have a Person constructor in Java/C++).
No Return Type: Constructors do not return anything (not even void).

## Example in js

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person1 = new Person("Alice", 25);
console.log(person1.name); // Alice
```

## Types of Constructors:

Default Constructor: No arguments; initializes default values.
Parameterized Constructor: Takes arguments to initialize specific values.
Copy Constructor (C++): Creates a new object as a copy of an existing object.

## Why Use Constructors?

Ensures the object is always in a valid state.
Reduces repetitive code by centralizing object initialization.
Improves code readability and maintenance.

## this

In a constructor, this refers to the current instance of the class that is being created. It allows you to access and assign values to the properties and methods of that specific object.

### Key Points About this in a Constructor:

this is a reference to the object being instantiated.
It differentiates between class properties and constructor parameters when they have the same name.
Without this, there would be ambiguity in distinguishing between instance variables and local variables (parameters).

```js
class Person {
  constructor(name, age) {
    this.name = name; // 'this.name' is the instance property
    this.age = age; // 'this.age' refers to the object being created
  }
}
const p1 = new Person("Alice", 25);
console.log(p1.name); // Alice
```

this.name refers to the instance property name of the object p1.
name on the right-hand side is the constructor parameter.

### Why Use this?

Avoids Naming Conflicts – If parameters and instance variables share the same name, this resolves ambiguity.
Refers to Current Object – It allows methods inside the class to access other properties or methods of the same object.

### Benefits of Classes, Objects, and Constructors:

Code Reusability:

The Car class can create thousands of cars without rewriting the structure.
Scalability:

If we want to add more features (like engineType), we update the class, and all future cars will have this feature.
Encapsulation (Organized Data):

Properties and methods related to cars are encapsulated within the Car class.
Avoids Repetition:

Without classes, you'd need to manually write code for each car, increasing duplication and errors.

## Code Without Constructor:

```js
class Car {
  // No constructor used here

  // Optional: Add a method to initialize properties
  setProperties(model, color, year) {
    this.model = model;
    this.color = color;
    this.year = year;
  }
}

const car1 = new Car();
car1.setProperties("Tesla Model 3", "Red", 2023); // Manually setting the properties
console.log(car1.model); // Tesla Model 3
console.log(car1.color); // Red
```
