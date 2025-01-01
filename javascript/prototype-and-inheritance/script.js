function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Prince");
person1.greet(); // Output: Hello, my name is Prince
console.log(person1.hasOwnProperty("name")); // true
console.log(person1.hasOwnProperty("greet")); // false (inherited from prototype)
