'use strict';
// constructor functions
// we can use constructor functions to build an object using a function
// we use the new operator for constuctor functions
// constructor functions start with a capital letter

const Person = function (firstName, birthYear) {
  //   console.log(`this `, this);
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER CREATE A METHOD INSIDE OF A CONSTRUCTOR FUNCTION
  //   this.calcAge = function () {
  //     console.log(2024 - this.birthYear);
  //   };
  // INSTEAD, USE prototypes and prototypal inheritance

  //   console.log(`firstName, birthYear`, firstName, birthYear);
};

const aaron = new Person('Aaron', 1978);
// console.log('aaron', aaron);
// 4 steps behind the scenes
// 1. new {} is created
// 2. fx called, the this keyword will be set to the newly created object
// 3. newly created object is linked to a prototype
// 4. function automatically returns {} from the beginning, but no longer needs to be empty

// const Player = function (playerName, playerLevel, playerClass) {
//   this.playerName = playerName;
//   this.playerLevel = playerLevel;
//   this.playerClass = playerClass;
// };

// const hayt = new Player('Hayt', 150, 'Changeling');
// console.log('hayt', hayt);

const matilda = new Person('Matilda', 2017);
// const jacko = new Person('Jacko', 2002);
// console.log(matilda);
// console.log(jacko);

// an object created from a class is called an instance
// aaron is an instance of Person, hayt is an instance of Player
console.log(`aaron instanceof Person`, aaron instanceof Person);
const jay = 'Jay';
console.log(`jay instanceof Person`, jay instanceof Person);
// the properties of the instance are the 'instance properties'

// prototypes
// every object that is created by a constructor function will get access to the methods and properties that we define on the constructor's prototype property
// adding a method to a prototype property
Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};
aaron.calcAge();
// each object has a .__proto__
console.log(`aaron.__proto`, aaron.__proto__);
// the Person.prototype is the prototype of all of the objects created with the prototype
console.log(
  `aaron.__proto__ === Person.prototype`,
  aaron.__proto__ === Person.prototype
);
console.log(
  `Person.prototype.isPrototypeOf(aaron)`,
  Person.prototype.isPrototypeOf(aaron)
);
console.log(
  `Person.prototype.isPrototypeOf(Person)`,
  Person.prototype.isPrototypeOf(Person)
);
// think of the .prototype as .prototypeOfLinkedObjects maybe
// step number 3 above creates the proto property and sets the value to the prototype property of the fx being clalled
Person.prototype.species = 'Homo Sapiens';
console.log(aaron.species, matilda.species);
console.log(aaron.hasOwnProperty('firstName'));
console.log(aaron.hasOwnProperty('species'));

// prototypal inheritance (also called delegation) and the prototype chain
// Person.prototype refers to all of the objects created by the constructor
// the New operator:
// 1) empty object is created
// 2) this keyword in constructor funciton call is set to the new object
// 3) magical step: the new object is linked to the constrctor's prototype property (__proto__ property
// 4) the new object is returned from the constructor funcion call

// Prototypes and prototypal inheritance on built-in objects
console.log(aaron.__proto__);
// object.prototype is the top of the proto chain
console.log(aaron.__proto__.__proto__);
console.log(aaron.__proto__.__proto__.__proto__);
console.dir(Person.prototype.constructor);

// prototype of arrays
const arr = [2, 3, 4, 4, 5, 5, 6, 7, 8, 9, 234];
console.log(arr.__proto__);
const arrReversed = arr.toReversed();
console.log(arrReversed);
console.log(arr.length);
console.log(arr.reduce((a, b) => a + b, 0) / arr.length);
// the prototype property of the constructor is the prototype of all of the objects created by the constructor
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');

// CODING CHALLENGE #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} increases speed to ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slows down to ${this.speed} km/h`);
};

// const Monster = function (level, race, damage) {
//   this.level = level;
//   this.race = race;
//   this.damage = damage;
// };

// Monster.prototype.enrage = function () {
//   this.damage += 10;
//   console.log(
//     `${this.race} becomes enraged and attacks you for ${this.damage}!!`
//   );
// };

// Monster.prototype.calm = function () {
//   this.damage -= 10;
//   console.log(
//     `${this.race} has calmed down and now attacks you for ${this.damage}.`
//   );
// };

// const kobold = new Monster(5, 'Kobold', 15);

// kobold.enrage();
// kobold.enrage();
// kobold.calm();

// const Player = function (name, level) {
//   this.name = name;
//   this.level = level;
// };

// const jinkai = new Player('Jinkai', 1);
// console.info(jinkai);

// Player.prototype.levelUp = function () {
//   this.level++;
//   console.log(`${this.name} has increased power to level ${this.level}`);
// };

// jinkai.levelUp();
// jinkai.levelUp();
// jinkai.levelUp();
// jinkai.levelUp();

// ES6 Classes
// classes in JS don't work like classes in java or c++. it's just syntatic sugar
// classes are just functions

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const jessica = new PersonCl('Jessisa', 1996);
console.info(jessica);
