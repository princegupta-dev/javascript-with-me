## 1. How would you implement WebSockets in JavaScript?

WebSockets allow for two-way communication between the client and server over a single, long-lived connection. It’s commonly used for real-time applications like chat apps, live notifications, and gaming.

**How WebSockets Work:**

- Client sends a handshake request to the server to establish the connection.
- Server accepts the request and establishes a WebSocket connection.
- Both client and server can send and receive messages over the connection at any time.

### Steps to Implement WebSockets in JavaScript:

1. Client-Side (Browser):
   In the browser, the WebSocket API is built-in. You can create a WebSocket connection using new WebSocket(url).

```js
// Create a WebSocket connection to the server
const socket = new WebSocket("ws://localhost:8080");

// Event listener for when the connection is open
socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server");
  // Send a message to the server
  socket.send("Hello from the client!");
});

// Event listener for incoming messages from the server
socket.addEventListener("message", (event) => {
  console.log("Message from server: ", event.data);
});

// Event listener for when the connection is closed
socket.addEventListener("close", (event) => {
  console.log("Disconnected from WebSocket server");
});

// Event listener for errors
socket.addEventListener("error", (event) => {
  console.error("WebSocket error: ", event);
});

// Send a message to the server
function sendMessage(message) {
  socket.send(message);
}
```

**Explanation**:

- new WebSocket('ws://localhost:8080'): Initializes a WebSocket connection to the specified server.
- socket.addEventListener('open'): Listens for when the connection is successfully established.
- socket.addEventListener('message'): Listens for incoming messages from the server.
- socket.send(message): Sends a message to the server over the WebSocket connection.
- socket.addEventListener('close'): Listens for when the connection is closed.
- socket.addEventListener('error'): Listens for any errors that occur on the WebSocket connection.

2. Server-Side (Node.js with ws package):
   On the server side, you can use the ws library to handle WebSocket connections in Node.js.

First, install the ws package:

```bash
npm install ws
```

Now, create a WebSocket server:

```js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for when a new connection is established
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send a welcome message to the connected client
  ws.send("Welcome to the WebSocket server!");

  // Event listener for when the server receives a message from the client
  ws.on("message", (message) => {
    console.log("Received message from client: ", message);

    // Send a reply to the client
    ws.send("Message received: " + message);
  });

  // Event listener for when the connection is closed
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Event listener for errors
  ws.on("error", (error) => {
    console.error("WebSocket error: ", error);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
```

**Explanation**:

- new WebSocket.Server({ port: 8080 }): Creates a WebSocket server that listens on port 8080.
- wss.on('connection', callback): Listens for new WebSocket connections from clients.
- ws.on('message', callback): Listens for messages from the connected client.
- ws.send(message): Sends a message to the connected client.
- ws.on('close'): Listens for when the client disconnects.
- ws.on('error'): Handles errors that occur on the WebSocket connection.

## 2. What are weak maps and weak sets in JavaScript?

**WeakMap**:
A WeakMap is a collection of key-value pairs where the keys are objects, and the values can be any data type. The key difference between a Map and a WeakMap is that in a WeakMap, the keys are weakly referenced, meaning that if there are no other references to the key object, it can be garbage collected. This is not the case in a regular Map, where the keys are strongly referenced and will persist as long as the map itself does.

**Key Features of WeakMap:**

- Keys must be objects: The keys in a WeakMap must be objects, not primitive values.
- Garbage Collection: If an object used as a key is no longer referenced elsewhere, it can be garbage collected. This is particularly useful for cases where you want to associate some data with an object but don't want that data to prevent the object from being garbage collected.
- No iteration: A WeakMap is not iterable, meaning you cannot use methods like forEach or loop over it (as it doesn't have any mechanism for keeping track of its keys).

```js
let weakMap = new WeakMap();

// Creating objects to use as keys
let obj1 = { name: "Object 1" };
let obj2 = { name: "Object 2" };

// Setting key-value pairs
weakMap.set(obj1, "Value for Object 1");
weakMap.set(obj2, "Value for Object 2");

// Accessing values
console.log(weakMap.get(obj1)); // "Value for Object 1"

// Checking if an object is a key in the map
console.log(weakMap.has(obj2)); // true

// Deleting a key-value pair
weakMap.delete(obj1);

// After deletion
console.log(weakMap.get(obj1)); // undefined
```

Use Cases for WeakMap:

- Storing private data for objects (data that's not part of the object itself but associated with it).
- Associating metadata with objects where you don't want the metadata to keep the object alive unnecessarily.

**WeakSet**:
A WeakSet is similar to a WeakMap but instead of storing key-value pairs, it stores only objects as elements, and those elements are weakly referenced. This means that the objects in a WeakSet can be garbage collected if they are no longer referenced elsewhere.

**Key Features of WeakSet:**

- Only objects can be added: Like WeakMap, only objects can be added to a WeakSet. You cannot add primitive types like numbers or strings.
- Garbage Collection: Objects in a WeakSet are weakly referenced, so they can be garbage collected if there are no other references to them.
- No iteration: WeakSet is not iterable, meaning you cannot loop over its contents using methods like forEach or for...of.
- No size property: You cannot get the number of elements in a WeakSet.

```js
let weakSet = new WeakSet();

// Creating objects to add to the WeakSet
let obj1 = { name: "Object 1" };
let obj2 = { name: "Object 2" };

// Adding objects to the WeakSet
weakSet.add(obj1);
weakSet.add(obj2);

// Checking if an object is in the WeakSet
console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj2)); // true

// Deleting an object from the WeakSet
weakSet.delete(obj1);

// After deletion
console.log(weakSet.has(obj1)); // false
```

Use Cases for WeakSet:

- Storing objects that are meant to track unique items but where the objects can be garbage collected when no longer needed.
- Tracking the presence of objects without preventing them from being garbage collected.

**Conclusion**:

- Use WeakMap when you need to store data associated with objects, but you don't want the data to prevent the object from being garbage collected.
- Use WeakSet when you need to keep track of objects uniquely, but without preventing them from being garbage collected.

## 3. What is the difference between weak and strong references?

The concepts of weak and strong references relate to how objects are referenced in memory and the impact they have on garbage collection. These concepts are especially relevant in JavaScript when dealing with objects, and particularly in the context of WeakMap and WeakSet.

### 1. Strong References

A strong reference is the default type of reference in JavaScript. When an object is referenced by a variable or another object, it is said to have a strong reference.

**Key Characteristics of Strong References:**

- Prevent Garbage Collection: If an object has one or more strong references, it will not be collected by the garbage collector, even if it is no longer used. This is because the garbage collector considers the object still in use as long as there is a strong reference pointing to it.
- Memory Management: Strong references can potentially lead to memory leaks if they are not properly managed. For example, if you hold onto a reference to an object that you no longer need, that object will remain in memory.

```js
let obj = { name: "Alice" };
let strongRef = obj; // strong reference to obj
```

In this example, the object { name: "Alice" } is strongly referenced by the variable strongRef. It will remain in memory until the reference is explicitly removed.

### 2. Weak References

A weak reference is a reference that does not prevent its target object from being garbage collected. In JavaScript, weak references are most commonly used with WeakMap and WeakSet. These collections allow you to store objects as keys or values but do not keep the objects alive by themselves. The object can be garbage collected if there are no strong references to it.

### Key Characteristics of Weak References:

Does Not Prevent Garbage Collection: If an object is only weakly referenced, it can be garbage collected when there are no strong references to it, even if the weak reference still exists.
Memory Management: Weak references are useful when you want to store objects temporarily (e.g., as cache entries) without preventing them from being cleaned up by the garbage collector when they are no longer in use.
Can Only Be Used with Objects: Weak references in JavaScript can only be used for objects, not primitive values like numbers or strings.

```js
let obj = { name: "Bob" };
let weakMap = new WeakMap();

weakMap.set(obj, "some value");

console.log(weakMap.has(obj)); // true

obj = null; // Now obj has no strong reference

// The object will be garbage collected, and the WeakMap entry will be removed
console.log(weakMap.has(obj)); // false
```

## 4. What is the Reflect API, and how is it different from Proxy?

**Reflect API:**
The Reflect API is a built-in JavaScript object that provides methods for intercepting and interacting with objects in a way that is similar to how operations like setting properties, getting properties, or calling methods can be intercepted via Proxy. However, the Reflect API is not used for defining traps like Proxy. Instead, it provides a set of methods that make it easier to manipulate objects and perform common reflective operations, like getting or setting properties, calling methods, and defining properties. It acts as a more elegant alternative to using traditional methods for these tasks.

```js
const obj = {
  name: "John",
  age: 30,
};

// Using Reflect to get a property value
console.log(Reflect.get(obj, "name")); // "John"

// Using Reflect to set a property value
Reflect.set(obj, "age", 35);
console.log(obj.age); // 35

// Using Reflect to check if a property exists
console.log(Reflect.has(obj, "name")); // true

// Using Reflect to delete a property
Reflect.deleteProperty(obj, "age");
console.log(obj.age); // undefined
```

**Proxy API:**
The Proxy object is used to create a handler that intercepts and customizes operations on an object. Unlike Reflect, which simply performs reflective operations, a Proxy allows you to define traps that intercept fundamental operations like property access, setting, and function calls. You can use a proxy to create custom behavior or even apply logging, validation, or modifications during normal operations on objects.

```js
const handler = {
  get: function (target, prop, receiver) {
    if (prop in target) {
      console.log(`Property "${prop}" accessed.`);
      return target[prop];
    } else {
      console.log(`Property "${prop}" does not exist.`);
      return undefined;
    }
  },
  set: function (target, prop, value) {
    console.log(`Setting value of "${prop}" to "${value}"`);
    target[prop] = value;
    return true; // Indicates success
  },
  deleteProperty: function (target, prop) {
    console.log(`Deleting property "${prop}"`);
    delete target[prop];
    return true;
  },
};

const obj = new Proxy({ name: "John", age: 30 }, handler);

// Using the proxy object
console.log(obj.name); // "Property "name" accessed." and "John"
obj.age = 35; // "Setting value of "age" to "35"
delete obj.age; // "Deleting property "age"
console.log(obj.age); // "Property "age" does not exist."
```

## Interview program

```js
const json1 = {
  237: { projectCode: "2021-22-018", globalFormId: 181 },
  238: { projectCode: "2021-22-018", globalFormId: 182 },
  239: { projectCode: "2021-22-018", globalFormId: 186 },
  240: { projectCode: "2021-22-015", globalFormId: 237 },
  241: { projectCode: "2021-22-015", globalFormId: 184 },
  242: { projectCode: "2021-22-015", globalFormId: 190 },
  243: { projectCode: "not found", globalFormId: 240 },
  244: { projectCode: "not found", globalFormId: 201 },
  245: { projectCode: "not found", globalFormId: 242 },
  246: { projectCode: "not found", globalFormId: 240 },
  247: { projectCode: "not found", globalFormId: 241 },
  248: { projectCode: "not found", globalFormId: 242 },
  249: { projectCode: "not found", globalFormId: 208 },
  250: { projectCode: "not found", globalFormId: 241 },
  251: { projectCode: "not found", globalFormId: 242 },
  252: { projectCode: "not found", globalFormId: 240 },
  253: { projectCode: "not found", globalFormId: 241 },
  254: { projectCode: "not found", globalFormId: 217 },
  255: { projectCode: "2021-22-024", globalFormId: 240 },
  256: { projectCode: "2021-22-024", globalFormId: 218 },
};

const json2 = {
  155: "26",
  157: "13",
  181: "33",
  182: "58",
  183: "18",
  184: "51",
  185: "25",
  186: "50",
  187: "43",
  188: "18",
  189: "23",
  190: "24",
  191: "42",
  192: "69",
  193: "31",
  194: "68",
  195: "27",
  196: "20",
  197: "18",
  199: "14",
  200: "34",
  201: "27",
  202: "15",
  203: "17",
  204: "46",
  205: "14",
  206: "22",
  207: "14",
  208: "25",
  209: "11",
  210: "35",
  212: "11",
  213: "13",
  214: "15",
  215: "30",
  216: "23",
  217: "24",
  218: "15",
};

const filteredJson1 = {};

for (let key in json1) {
  const entry = json1[key];
  const { projectCode, globalFormId } = entry;
  if (projectCode !== "not found" && json2[globalFormId]) {
    filteredJson1[key] = entry;
  }
}

console.log(filteredJson1);
```
