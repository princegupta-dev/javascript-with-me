## 1. How does the map(), filter(), and reduce() array methods work?

The map(), filter(), and reduce() methods are powerful array methods in JavaScript that allow you to perform transformations, filtering, and aggregation on arrays in a functional programming style.

### 1. map()

The map() method creates a new array by applying a provided function to every element in the original array.
Purpose: Transform or modify each element in the array.
Returns: A new array with the transformed elements.

```js
array.map(callback(currentValue, index, array), thisArg);
```

**callback**: A function that takes the current value, index (optional), and array (optional) as arguments.
**thisArg**: Optional. A value to use as this when executing the callback.

```js
const numbers = [1, 2, 3, 4];
const squared = numbers.map((num) => num ** 2);
console.log(squared); // [1, 4, 9, 16]
```

### 2. filter()

The filter() method creates a new array with all the elements that pass the test implemented by the provided function.

Purpose: Filter elements based on a condition.
Returns: A new array containing only the elements that satisfy the condition.

callback: A function that takes the current value, index (optional), and array (optional) as arguments and returns true (keep the element) or false (exclude the element).
thisArg: Optional. A value to use as this when executing the callback.

```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

### 3. reduce()

The reduce() method applies a function against an accumulator and each element of the array (from left to right) to reduce the array to a single value.

Purpose: Aggregate or combine array elements into a single value.
Returns: A single value (number, string, object, etc.).

```js
array.reduce(callback(accumulator, currentValue, index, array), initialValue);
```

callback: A function that takes the accumulator, current value, index (optional), and array (optional) as arguments.
accumulator: The running total or result.
currentValue: The current element being processed.
initialValue: Optional. The initial value of the accumulator. If not provided, the first element of the array is used.

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```

### How They Work Together:

These methods can be combined to perform complex operations efficiently.

```js
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
  { name: "Dave", score: 90 },
];

// 1. Filter students who scored above 80
const passedStudents = students.filter((student) => student.score > 80);

// 2. Extract their names
const names = passedStudents.map((student) => student.name);

// 3. Calculate the average score of passed students
const averageScore =
  passedStudents.reduce((acc, student) => acc + student.score, 0) /
  passedStudents.length;

console.log(passedStudents); // [{ name: 'Alice', score: 85 }, { name: 'Bob', score: 92 }, { name: 'Dave', score: 90 }]
console.log(names); // ['Alice', 'Bob', 'Dave']
console.log(averageScore); // 89
```

## 2. Explain how forEach() differs from map()

The forEach() and map() methods are both used to iterate over arrays in JavaScript, but they serve different purposes and have key differences in behavior.

### 1. Purpose:

forEach(): It is used for performing side effects on each element of the array. It executes a provided function once for each element but does not return anything.
map(): It is used for transforming each element of the array. It executes a provided function once for each element and returns a new array with the results of applying the function to each element.

### 2. Return Value:

forEach(): Returns undefined. It doesn't create a new array or modify the original array, it simply performs operations for side effects (like logging or updating something).
map(): Returns a new array where each element is the result of applying the callback function to the corresponding element in the original array.

### 3. Use Case:

forEach(): Use it when you want to perform actions (e.g., logging, updating external variables, etc.) on each item, but you don't need a new array.
map(): Use it when you want to transform each item in the array and need the transformed data as a new array.

### 4. Mutability:

forEach(): It does not modify the array unless explicitly done inside the provided function. However, it can still perform side effects that may change external variables.
map(): It creates a new array, leaving the original array unchanged.

### 5. Chainability:

forEach(): It cannot be chained because it returns undefined.
map(): It can be chained because it returns a new array, and you can apply additional array methods like filter(), reduce(), etc., after map().

**Example:**
**Using forEach():**

```js
const numbers = [1, 2, 3, 4];
let sum = 0;

numbers.forEach((num) => {
  sum += num; // Side effect: summing values
});

console.log(sum); // Output: 10
```

Here, forEach() just iterates over the array and performs the summation as a side effect. It doesn't return anything.

**Using map():**

```js
const numbers = [1, 2, 3, 4];
const squared = numbers.map((num) => num ** 2);

console.log(squared); // Output: [1, 4, 9, 16]
```

Here, map() transforms each element (squaring the numbers) and returns a new array with the squared values.

### When to Use Which:

Use forEach() when you want to perform actions like logging, updating a variable, or performing side effects, but you don’t need to collect or return any new data.
Use map() when you need to create a new array with transformed values, without altering the original array.

## 3. How do you flatten a nested array?

Flattening a nested array means converting an array that contains other arrays (or arrays of arrays) into a single-level array. There are several ways to flatten a nested array in JavaScript. Here's how you can do it:

#### 1. Using Array.prototype.flat() (for ES2019 and later)

The flat() method is the easiest and most modern way to flatten a nested array. It flattens the array to a specified depth.

```js
array.flat(depth);
```

depth: The number of levels to flatten. If no depth is provided, it defaults to 1. To flatten the array completely, you can pass Infinity.

```js
const nestedArray = [1, [2, [3, [4]]]];
const flatArray = nestedArray.flat(2); // Flatten up to a depth of 2
console.log(flatArray); // Output: [1, 2, 3, [4]]
```

#### Using reduce() and concat() (for older environments)

If you're working in an environment that doesn’t support flat() (older browsers or versions of JavaScript), you can use reduce() and concat() to flatten arrays.

```js
const nestedArray = [1, [2, [3, [4]]]];

const flatArray = nestedArray.reduce((acc, currentValue) => {
  return acc.concat(
    Array.isArray(currentValue) ? currentValue.flat() : currentValue
  );
}, []);

console.log(flatArray); // Output: [1, 2, 3, [4]]
```

#### 3. Using JSON.parse() and JSON.stringify() (hacky method)

This method works only if the array contains simple types and no functions, undefined, or circular references. It converts the array to a JSON string and then parses it back into an array, effectively flattening it.

```js
const nestedArray = [1, [2, [3, [4]]]];
const flatArray = JSON.parse(
  "[" + JSON.stringify(nestedArray).replace(/\[|\]/g, "") + "]"
);
console.log(flatArray); // Output: [1, 2, 3, 4]
```

## 4. Explain how array destructuring works.

Array destructuring is a feature in JavaScript (introduced in ES6) that allows you to unpack values from arrays (or objects) and assign them to variables in a concise and readable way. It makes it easier to work with arrays and extract specific values without having to access them manually via indexing.

```js
const fruits = ["apple", "banana", "cherry"];

const [first, second, third] = fruits;

console.log(first); // Output: 'apple'
console.log(second); // Output: 'banana'
console.log(third); // Output: 'cherry'
```

1. Skipping Items
   You can skip certain elements of the array by leaving the corresponding slots empty.

```js
const fruits = ["apple", "banana", "cherry", "date"];

// Skipping the second item ('banana')
const [first, , third] = fruits;

console.log(first); // Output: 'apple'
console.log(third); // Output: 'cherry'
```

2. Default Values
   You can assign default values to variables in case the value at that index is undefined.

```js
const fruits = ["apple"];

const [first, second = "orange"] = fruits;

console.log(first); // Output: 'apple'
console.log(second); // Output: 'orange' (default value)
```

3. Rest Element (...)
   You can collect the remaining elements of the array into a single variable using the rest syntax (...). This is useful when you don't know how many elements are in the array or when you want to group the rest of the elements into a sub-array.

```js
const fruits = ["apple", "banana", "cherry", "date"];

// Collecting remaining elements into an array
const [first, second, ...others] = fruits;

console.log(first); // Output: 'apple'
console.log(second); // Output: 'banana'
console.log(others); // Output: ['cherry', 'date']
```

4. Nested Destructuring
   If the array contains other arrays (nested arrays), you can destructure them as well.

```js
const fruits = ["apple", ["banana", "pear"], "cherry"];

// Nested destructuring to extract 'banana' and 'pear'
const [first, [second, third], fourth] = fruits;

console.log(first); // Output: 'apple'
console.log(second); // Output: 'banana'
console.log(third); // Output: 'pear'
console.log(fourth); // Output: 'cherry'
```

5. Destructuring with Functions
   Array destructuring is commonly used when working with functions that return arrays or tuples.

```js
// Function returning an array
function getCoordinates() {
  return [10, 20];
}

const [x, y] = getCoordinates();

console.log(x); // Output: 10
console.log(y); // Output: 20
```

6. Swapping Variables
   You can swap the values of two variables in a concise way using array destructuring.

Example:

```js
let a = 1;
let b = 2;

// Swapping values using destructuring
[a, b] = [b, a];

console.log(a); // Output: 2
console.log(b); // Output: 1
```

## 5. What is the difference between Array.splice() and Array.slice()?

Array.splice() and Array.slice() are both methods used to work with arrays in JavaScript, but they have different behaviors and use cases. Here's a comparison:

1. Purpose:
   splice(): Modifies the original array by adding, removing, or replacing elements at a specific index.
   slice(): Creates a new array from a portion of an existing array without modifying the original array.

2. Syntax:
   splice():

```js
array.splice(start, deleteCount, item1, item2, ...)
```

start: The index at which to start modifying the array.
deleteCount: The number of elements to remove (optional).
item1, item2, ...: The elements to add at the start index (optional).

slice():

```js
array.slice(start, end);
```

start: The index to start slicing (inclusive).
end: The index to end slicing (exclusive). If not provided, it slices until the end of the array.

### 3. Modifies Original Array:

splice(): Modifies the original array. It can remove, add, or replace elements in the array.
slice(): Does not modify the original array. It returns a shallow copy of a portion of the array.

### 4.Return Value:

splice(): Returns an array of removed elements (if any), or an empty array if no elements were removed.
slice(): Returns a new array containing the sliced portion of the original array.

#### Use Cases:

**splice()**: Used for adding or removing elements at specific positions in an array.
Example use cases:
Remove elements from a specific position.
Insert new elements at a specific index.
Replace elements in the array.
**slice():** Used for extracting a sub-array without modifying the original array.
Example use cases:
Create a shallow copy of an array.
Extract a portion of an array for further processing.

**splice() Example:**

```js
let fruits = ["apple", "banana", "cherry", "date"];

// Remove 2 elements starting from index 1 (removes 'banana' and 'cherry')
let removed = fruits.splice(1, 2);

console.log(fruits); // Output: ['apple', 'date']
console.log(removed); // Output: ['banana', 'cherry']

// Insert 'mango' at index 1
fruits.splice(1, 0, "mango");
console.log(fruits); // Output: ['apple', 'mango', 'date']

// Replace element at index 2 with 'orange'
fruits.splice(2, 1, "orange");
console.log(fruits); // Output: ['apple', 'mango', 'orange']
```

**slice() Example:**

```js
let fruits = ["apple", "banana", "cherry", "date"];

// Slice the array from index 1 to index 3 (exclusive)
let sliced = fruits.slice(1, 3);

console.log(fruits); // Output: ['apple', 'banana', 'cherry', 'date']
console.log(sliced); // Output: ['banana', 'cherry']

// Slice from index 2 to the end of the array
let slicedFromEnd = fruits.slice(2);
console.log(slicedFromEnd); // Output: ['cherry', 'date']

// Slice from the beginning to index 2
let slicedFromStart = fruits.slice(0, 2);
console.log(slicedFromStart); // Output: ['apple', 'banana']
```

## 6. How would you sort an array of objects by a specific property?

To sort an array of objects by a specific property, you can use the Array.prototype.sort() method in JavaScript. The sort() method can take a comparison function that allows you to define custom sorting behavior, such as sorting by a specific object property.

```js
array.sort((a, b) => {
  // comparison logic for a specific property
});
```

In the comparison function:

a and b are two objects from the array being compared.
The function should return a value that determines their relative order:
Negative value: a comes before b.
Zero: No change in order.
Positive value: b comes before a.

### Example 1: Sort by Numeric Property (Ascending)

```js
const people = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Mark", age: 35 },
];

// Sort by age in ascending order
people.sort((a, b) => a.age - b.age);

console.log(people);
// Output: [
//   { name: 'Jane', age: 25 },
//   { name: 'John', age: 30 },
//   { name: 'Mark', age: 35 }
// ]
```

```js
const numbers = [5, 3, 8, 1, 4];

// Sort in ascending order
numbers.sort((a, b) => a - b);

console.log(numbers); // Output: [1, 3, 4, 5, 8]
```

- On the first comparison, a = 5 and b = 3. Since 5 - 3 = 2 (positive), it knows that 5 should come after 3.
- On the next comparison, a = 3 and b = 8. Since 3 - 8 = -5 (negative), it knows that 3 should come before 8.
- This process continues until the array is fully sorted.

## 7. How can you implement pagination with arrays in JavaScript?

Pagination in JavaScript involves dividing a large array of data into smaller chunks, allowing users to view data page by page. Here's how you can implement it with arrays:

1. Divide the Array into Pages

   - Use the current page number and page size (number of items per page) to calculate the range of items to display.

2. Mathematics of Pagination

- Start Index: **(currentPage - 1) \* pageSize**
- End Index: **startIndex + pageSize**
- Extract items for the current page using **Array.prototype.slice(startIndex, endIndex).**

```js
function paginateArray(array, pageSize, currentPage) {
  // Calculate the start and end indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Extract the items for the current page
  return array.slice(startIndex, endIndex);
}

// Example usage
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pageSize = 3; // Items per page
const currentPage = 2;

const paginatedData = paginateArray(data, pageSize, currentPage);
console.log(paginatedData); // Output: [4, 5, 6]
```

**Explanation**:

- The startIndex for page 2 with pageSize = 3 is (2 - 1) \* 3 = 3.
- The endIndex is 3 + 3 = 6.
- array.slice(3, 6) returns [4, 5, 6].

### Full Pagination Example with Navigation:

If you want a reusable pagination utility that handles navigation (e.g., next page, previous page), here's how:

```js
class Paginator {
  constructor(array, pageSize) {
    this.array = array;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(array.length / pageSize);
    this.currentPage = 1;
  }

  // Get items for the current page
  getCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.array.slice(startIndex, endIndex);
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    return this.getCurrentPage();
  }

  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    return this.getCurrentPage();
  }
}

// Example usage
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const paginator = new Paginator(data, 3);

console.log(paginator.getCurrentPage()); // Output: [1, 2, 3]
console.log(paginator.nextPage()); // Output: [4, 5, 6]
console.log(paginator.previousPage()); // Output: [1, 2, 3]
```
