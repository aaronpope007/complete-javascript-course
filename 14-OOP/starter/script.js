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

// const matilda = new Person('Matilda', 2017);
// const jacko = new Person('Jacko', 2002);
// console.log(matilda);
// console.log(jacko);

// an object created from a class is called an instance
// aaron is an instance of Person, hayt is an instance of Player
console.log(`aaron instanceof Person`, aaron instanceof Person);
const jay = 'Jay';
console.log(`jay instanceof Person`, jay instanceof Person);
// the properties of the instance are the 'instance properties'

// adding methods to objects
