## How would you implement a singleton pattern in JavaScript?

To implement a singleton pattern in JavaScript, the goal is to ensure that a class has only one instance and provide a global point of access to that instance. Here's a simple implementation using a class and closure:

```js
class Singleton {
  // Private static variable to hold the instance
  static instance;

  constructor() {
    // If instance already exists, return it
    if (Singleton.instance) {
      return Singleton.instance;
    }

    // Otherwise, set the instance and initialize any properties
    this.value = Math.random(); // Example property
    Singleton.instance = this;
  }

  // Method to get the value (or any other functionality)
  getValue() {
    return this.value;
  }
}

// Usage:

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
console.log(instance1.getValue()); // Random value
console.log(instance2.getValue()); // Same value as instance1
```

**Explanation**:

- Singleton.instance is used to store the single instance of the class.
- The constructor() checks if an instance already exists. If it does, it returns that instance instead of creating a new one.
- If it's the first time the class is being instantiated, the instance is created and stored.
- In the end, instance1 === instance2 will return true because both variables point to the same object.

  This ensures that no matter how many times the Singleton class is instantiated, there will always be only one instance

## 2. How do you implement the observer pattern?

To implement the Observer pattern in JavaScript, you need to establish a relationship where an Observer (or listener) can be notified of changes in the Subject (or publisher) without the two being tightly coupled.

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  // Method to add observers to the subject
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Method to remove observers
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Method to notify all observers of a change
  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  // The update method that is called when the subject changes
  update(subject) {
    console.log(`${this.name} has been notified of change in subject`);
  }
}

// Usage:

// Create a subject (publisher)
const subject = new Subject();

// Create some observers (listeners)
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// Add observers to the subject
subject.addObserver(observer1);
subject.addObserver(observer2);

// Notify all observers of a change
subject.notifyObservers(); // Output: Observer 1 has been notified of change in subject
//         Observer 2 has been notified of change in subject

// Remove an observer
subject.removeObserver(observer1);

// Notify remaining observers
subject.notifyObservers(); // Output: Observer 2 has been notified of change in subject
```

Explanation:
Subject: Manages a list of observers. It provides methods like addObserver() to add observers, removeObserver() to remove them, and notifyObservers() to notify them of changes.
Observer: Each observer has an update() method that is called when the subject's state changes.
notifyObservers() in the subject calls each observer’s update() method, allowing them to react to changes.

## Explain the concept of middleware and how to implement it.

Middleware is a function that sits between the request and response cycle in a web application. It allows you to execute code, modify the request or response, and terminate the request-response cycle or pass control to the next middleware function. Middleware is commonly used in web frameworks like Express.js in Node.js.

Common Use Cases for Middleware:

- Logging requests (e.g., logging HTTP requests, request payloads)
- Authentication and authorization (e.g., checking if a user is logged in)
- Input validation (e.g., validating request data before passing it to the route handler)
- Error handling (e.g., catching errors and sending appropriate responses)
- Modifying request/response (e.g., adding headers, parsing request bodies)
