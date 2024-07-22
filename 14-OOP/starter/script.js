'use strict';
// constructor functions
// we can use constructor functions to build an object using a function
// we use the new operator for constuctor functions
// constructor functions start with a capital letter

// const Person = function (firstName, birthYear) {
//   //   console.log(`this `, this);
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // NEVER CREATE A METHOD INSIDE OF A CONSTRUCTOR FUNCTION
//   //   this.calcAge = function () {
//   //     console.log(2024 - this.birthYear);
//   //   };
//   // INSTEAD, USE prototypes and prototypal inheritance

//   //   console.log(`firstName, birthYear`, firstName, birthYear);
// };

// const aaron = new Person('Aaron', 1978);
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
// console.log(`aaron instanceof Person`, aaron instanceof Person);
// const jay = 'Jay';
// console.log(`jay instanceof Person`, jay instanceof Person);
// the properties of the instance are the 'instance properties'

// prototypes
// every object that is created by a constructor function will get access to the methods and properties that we define on the constructor's prototype property
// adding a method to a prototype property
// Person.prototype.calcAge = function () {
//   console.log(2024 - this.birthYear);
// };
// aaron.calcAge();
// // each object has a .__proto__
// console.log(`aaron.__proto`, aaron.__proto__);
// // the Person.prototype is the prototype of all of the objects created with the prototype
// console.log(
//   `aaron.__proto__ === Person.prototype`,
//   aaron.__proto__ === Person.prototype
// );
// console.log(
//   `Person.prototype.isPrototypeOf(aaron)`,
//   Person.prototype.isPrototypeOf(aaron)
// );
// console.log(
//   `Person.prototype.isPrototypeOf(Person)`,
//   Person.prototype.isPrototypeOf(Person)
// );
// // think of the .prototype as .prototypeOfLinkedObjects maybe
// // step number 3 above creates the proto property and sets the value to the prototype property of the fx being clalled
// Person.prototype.species = 'Homo Sapiens';
// console.log(aaron.species, matilda.species);
// console.log(aaron.hasOwnProperty('firstName'));
// console.log(aaron.hasOwnProperty('species'));

// // prototypal inheritance (also called delegation) and the prototype chain
// // Person.prototype refers to all of the objects created by the constructor
// // the New operator:
// // 1) empty object is created
// // 2) this keyword in constructor funciton call is set to the new object
// // 3) magical step: the new object is linked to the constrctor's prototype property (__proto__ property
// // 4) the new object is returned from the constructor funcion call

// // Prototypes and prototypal inheritance on built-in objects
// console.log(aaron.__proto__);
// // object.prototype is the top of the proto chain
// console.log(aaron.__proto__.__proto__);
// console.log(aaron.__proto__.__proto__.__proto__);
// console.dir(Person.prototype.constructor);

// // prototype of arrays
// const arr = [2, 3, 4, 4, 5, 5, 6, 7, 8, 9, 234];
// console.log(arr.__proto__);
// const arrReversed = arr.toReversed();
// console.log(arrReversed);
// console.log(arr.length);
// console.log(arr.reduce((a, b) => a + b, 0) / arr.length);
// // the prototype property of the constructor is the prototype of all of the objects created by the constructor
// console.log(arr.__proto__ === Array.prototype);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector('h1');

// CODING CHALLENGE #1
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} increases speed to ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} slows down to ${this.speed} km/h`);
// };

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
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // methods will be added to the .prototype property of the class
  // these are also called instance methods
  calcAge() {
    console.log(2024 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2024 - this.birthYear;
  }
  // create a setter to check if the fullName property is a full name
  // important pattern to understand when setting a property that already exists
  set fullName(name) {
    console.log(name);
    name.includes(' ')
      ? (this._fullName = name)
      : alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }

  // use static keyword to add static method
  static hey() {
    console.log(`${this.fullName} says 'Hey there!'`);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.info(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

jessica.greet();

// class MonsterCl {
//   constructor(race, level) {
//     this.race = race;
//     this.level = level;
//   }

//   levelUp() {
//     this.level++;
//     console.log(`${this.race} is now level ${this.level}`);
//   }
// }

// const orc = new MonsterCl('Orc', 1);
// console.log(orc);
// orc.levelUp();

// 1. Classes are NOT hoisted (function declarations are hoisted so you can use them before they are declared in the code).
// 2. Classes are first-class citizens, which means we can pass them into functions and return them from functions. that is because classes are a special kind of fx behind the scenes
// 3. Classes are executed in strict mode

// you can use constructor functions or ES6 classes, it's a matter of preference

// 215. Setters and Getters
// prepend 'get' to make it a getter

// const walter = new PersonCl('Walter', 1904);

const account = {
  owner: 'Aaron',
  movements: [200, 230, 300, 100, 20],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  // setter methods need exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};
// you don't call the method on a getter, you use it like a property
console.log(account.latest);
// to use setter, you don't have to call it, it's like a property and not a method
account.latest = 999;
account.latest = 799;
account.latest = 9;
console.log(account.movements);

console.log(jessica.age);
// setters and getters can be useful for data validation
// setters and getters can be nice for validation when creating a new object

// static methods
// the Array.from() method is a good example of a static method
// the .from method is attached to the array structure
// . from method is attached to the Array constructor
// the .from method is in the array namespace

// 3rd way to implement prototypal inheritance or also called delegation

// 217. Object.create
// no prototype properties on object.create
// no new operator
// manually set the prototype of an obj to any other object
// recreate the person class

const PersonProto = {
  calcAge() {
    console.log(2034 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// we pass in the prototype object and that will be the prototype
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const popedog = Object.create(PersonProto);
popedog.name = 'Aaron';
popedog.birthYear = '1978';
popedog.calcAge();
popedog.myNickname = 'aaron';
console.log(popedog);

const melissa = Object.create(PersonProto);
melissa.init('Melissa', 1977);
melissa.calcAge();
console.info(melissa);

// 218 - coding challenge 2
/* 
1. Use an ES6 class to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

class CarEs6 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} speeds up to ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} slows down to ${this.speed} km/h.`);
  }

  //getter

  get speedUs() {
    return this.speed / 1.6;
  }

  // setter
  set speedUs(speed) {
    return this.speed * 1.6;
  }
}

const ford = new CarEs6('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

// 219 inheritance between classes: construction functions
// inherit between classes using constructor functions
// setting up the prototype chain

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// this makes student prototype inherit from person prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();

// we want to set the student prototype to the person prototype
mike.calcAge();
// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);
// console.log(mike.__proto__.__proto__.__proto__);

// console.log(`mike instanceof Student`, mike instanceof Student);
// console.log(`mike instanceof Person`, mike instanceof Person);
// console.log(`mike instanceof Object`, mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// CODING CHALLENGE 3:

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(
    `The ${this.make} is accelerates to ${this.speed} miles per hour.0`
  );
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} slows down to ${this.speed}.`);
};

const geoMetro = new Car('Geo Metro', 50);
geoMetro.accelerate();
geoMetro.accelerate();
geoMetro.brake();
geoMetro.brake();
geoMetro.brake();

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// had to link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`You charge the ${this.make} to ${this.charge}.`);
};

EV.prototype.accelerate = function () {
  this.speed += 30;
  this.charge--;
  console.log(
    `The ${this.make} increases speed to ${this.speed} miles per hour, charge currently indicating ${this.charge}!`
  );
};

const tesla = new EV('Tesla', 120, 30);
console.log('tesla', tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(99);
tesla.brake();
tesla.accelerate();

// 221. inheritance between 'classes' in es6

// static method

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // ALways needs to happen first
    // this call to the super funciton creates the 'this' keyword
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I am studying ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student, I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const marthaJones = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(marthaJones);
marthaJones.introduce();
marthaJones.calcAge();

// 222. object.create inheritance between classes
