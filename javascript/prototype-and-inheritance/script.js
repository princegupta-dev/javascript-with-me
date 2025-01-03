debugger;

const parent = {
  value: 2,
  method() {
    return this.value + 1;
  },
};

console.log(parent.method());

const child = {
  __proto__: parent,
};

console.log(child.method());
