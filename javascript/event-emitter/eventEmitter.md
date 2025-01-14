The **EventEmitter** in JavaScript is a powerful pattern for managing and emitting events, often used in scenarios like custom event handling or implementing the **Publish/Subscribe** (Pub/Sub) model. Here's how you can create your own **EventEmitter** from scratch.

- An EventEmitter is a mechanism that allows parts of your program to communicate by emitting and listening to events.
- Think of it as a messenger: one part of your program can send a message (emit an event), and other parts can listen for it and respond.

## Creating Your Own EventEmitter

```js
class EventEmitter {
  constructor() {
    this.events = {}; // Store events and their listeners
  }

  // Add a listener for an event
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Remove a listener for an event
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // Add a listener that triggers only once
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper); // Remove the listener after it's triggered
    };
    this.on(event, onceWrapper);
  }

  // Emit an event, invoking all associated listeners
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(...args));
  }

  // Get all listeners for an event
  listeners(event) {
    return this.events[event] || [];
  }
}
```

## Why Use an EventEmitter?

- It makes your program modular and decoupled.
  For example, a button can emit a "clicked" event without needing to know what happens when it’s clicked.
- It's useful for scenarios like:
- Reacting to user interactions (e.g., button clicks).
- Publishing and subscribing to updates (Pub/Sub model).
- Managing custom behaviors in your app

## How Does an EventEmitter Work?

- Emit an Event (Send a Signal):
  This is like yelling "Hey, something happened!"
- Listen for an Event:
  This is like saying, "When I hear this, I'll do something."

**on(event, listener):**

Attach a function (listener) to a specific event. This function will run every time the event is triggered.
**emit(event, ...args):**

Trigger the event and optionally send data to the listeners.
**off(event, listener):**

Remove a specific listener for an event.
**once(event, listener):**

Attach a function to an event, but it will run only once.

## Simpler Example

Imagine you’re organizing a concert:

**The Performer (Emitter):**

They announce events like "Start Music" or "End Concert."
**The Audience (Listeners):**

They listen for these announcements and react, like clapping or cheering.

## Code Example

```js
const eventEmitter = new EventEmitter();

// Listen for the 'start' event
eventEmitter.on("start", () => {
  console.log("The show has started!");
});

// Emit the 'start' event
eventEmitter.emit("start");
// Output: The show has started!
```

## Example: Without Decoupling (Tightly Coupled)

Imagine you have a Button component that directly calls a sendMessage() function:

```js
function sendMessage() {
  console.log("Message sent!");
}

function Button() {
  sendMessage(); // Button directly calls sendMessage
}

Button(); // Output: Message sent!
```

## Use Case: Pub/Sub

In the Publish/Subscribe (Pub/Sub) pattern:

- **Publisher** emits events (announces updates).
- **Subscribers** listen and react to events.

```js
const pubSub = new EventEmitter();

// Subscriber 1
pubSub.on("news", (article) => {
  console.log(`Subscriber 1 got article: ${article}`);
});

// Subscriber 2
pubSub.on("news", (article) => {
  console.log(`Subscriber 2 got article: ${article}`);
});

// Publisher emits the event
pubSub.emit("news", "Breaking News: EventEmitters Simplified!");
// Output:
// Subscriber 1 got article: Breaking News: EventEmitters Simplified!
// Subscriber 2 got article: Breaking News: EventEmitters Simplified!
```

## Why is EventEmitter Important?

**Decoupling**:

The emitter (publisher) doesn’t care who is listening. It just emits the event.
Scalability:

Multiple parts of your program can respond to the same event.
**Flexibility**:

You can use it for many purposes, like logging, notifications, or communication between different parts of your app.

## Decoupling

Decoupling refers to designing components of a system so that they are independent and loosely connected.
