// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
// console.log('importing module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// import add, { cart } from './shoppingCart.js';

// add('pizza', 2);
// add('bread', 5);
// add('apples', 2);
// console.log('cart from script', cart);
// console.log('starting');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // this await is blocking function of the rest of the code, but can be useful, but many times, harmful

// const data = await res.json();
// console.log('data', data);
// console.log('something really');

// const getFirstPost = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(1).title, text: data.at(1).body };
// };
// const firstPost = getFirstPost();
// firstPost.then(first => console.log(first));

// const getLastPost = asynrcost
// lastPostlc () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   //   console.log('data', data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// // console.log('lastpost', lastPost);
// // not very clean
// // lastPost.then(last => console.log(last));
// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// top level await will block the entire module. it can be helpful, but we must use it with great care as well

// ife = immediately invoked function
const ShoppingCart2 = (() => {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };

  const orderStock = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
