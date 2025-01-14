// function createLeak() {
//   const largeArray = new Array(100000).fill("leak");
//   return function () {
//     console.log(largeArray[0]);
//   };
// }

// let leak = createLeak();
// // leak = null;
// // The `largeArray` is still referenced by the closure, even though we don't need it anymore.

class EventEmitter {
  constructor() {
    this.events = {}; //  // Store events and their listeners
  }
  // Add a listener for an event
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
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
