// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
// console.log('importing module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 2);
console.log('cart from script', cart);
