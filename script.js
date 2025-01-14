function createLeak() {
  const largeArray = new Array(100000).fill("leak");
  return function () {
    console.log(largeArray[0]);
  };
}

let leak = createLeak();
// leak = null;
// The `largeArray` is still referenced by the closure, even though we don't need it anymore.
