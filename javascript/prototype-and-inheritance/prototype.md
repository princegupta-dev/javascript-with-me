# Prototypes & Inheritance

In JavaScript, prototypes are the foundation of inheritance. Every object in JavaScript is linked to another object called its prototype. This forms a prototype chain that enables inheritance and shared methods across multiple objects.

## 1. What is a Prototype?

A prototype is an object from which other objects inherit properties and methods.
Every JavaScript object has an internal link to its prototype (**proto**).

## 2. Prototype Chain

When accessing a property on an object, JavaScript looks for the property on the object itself.
If not found, it searches up the prototype chain until the property is found or the chain ends at null.
