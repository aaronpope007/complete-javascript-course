// https://countries-api-836d.onrender.com/countries/
const correctAPI = 'https://countries-api-836d.onrender.com/countries/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderErr = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = (data, className = '') => {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  console.log('data from renderCountry', data);
};

///////////////////////////////////////
// old school way of doing AJAX calls

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     console.log('data', data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">{${data.region}}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('usa');
// getCountryData('france');
// getCountryData('germany');
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();
// const request = fetch('https://restcountries.com/v2/name/portugal');

// 2 advantages of promises
// no longer need to rely on events and callback functions to deliver asynchronous results
// with promises, we can chain promises for a sequence of asynchronous operations instead of nesting
// promises are an ES6 feature, came in 2015
// promises have a lifecycle
// pending -> async -> settled (settled: fulfilled, settled: rejected)
// a promise is only fulfilled once
// we consume a promise when we already have a promise

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log('response', response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log('data', data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = (url, errorMsg = 'Something went wrong') =>
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });

// const getCountryData = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log('response = ', response);
//       if (!response.ok)
//         throw new Error(`Country not found. (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbor = data[0].borders[0];
//       const neighbor = 'sdfasd';
//       console.log('data', data);
//       console.log('neighbor', neighbor);
//       if (!neighbor) return;
//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       console.log('response = ', response);
//       if (!response.ok)
//         throw new Error(`Neighbor country not found. (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err}🛑 🛑 🛑 !ERROR! 🛑 🛑 🛑`);
//       renderErr(
//         ` 🛑 🛑 🛑 Something went wrong!  🛑 🛑 🛑 ${err.message}. TRY AGAIN!`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   // country 1
//   console.log(country);
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found!')
//     .then(data => {
//       renderCountry(data[0]);
//       const borders = data[0].borders; // Get the borders array
//       const neighbor = borders && borders.length > 0 ? borders[0] : null; // Check if borders exist
//       console.log(data);
//       console.log(neighbor);
//       if (!neighbor) throw new Error('No neighboring countries!');
//       // country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbor}`,
//         'Country not found!'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err}🛑 🛑 🛑 !ERROR! 🛑 🛑 🛑`);
//       renderErr(
//         ` 🛑 🛑 🛑 Something went wrong!  🛑 🛑 🛑 ${err.message}. TRY AGAIN!`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
*/
/*
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const whereAmI = function (lat, long) {
//   fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=89293b7710ef4dc3af9d8b70d3e327bc
//   `)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log('data obj', data);
//       console.log(
//         `You are in ${data.results[0].city}, ${data.results[0].country}`
//       );
//       const country = data.results[0].country;
//       return fetch(`https://restcountries.com/v2/name/${country}`);
//       //   const countryQuery = data.results[0].country;
//       //   getCountryData(countryQuery);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`${err.message} 😬 !!! error !!!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// no multitasking in javascript
// java can execute multiple pieces of code at a time
// Event loop practice
// console.log('test start');
// setTimeout(() => console.log('0 sec timer), 0'));
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('test end');
// use the promise constructor
// promise consturctor tacts one argument, an executer function
// const lotteryPromise = new Promise(function (resolve, reject) {
//   // the function will contain the asynchronous behavior that will eventually produce a resolve value, the future value of the promise
//   console.log('lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       // calling the resolve method makes the promise fulfilled
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lose 🫤'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds =>
  new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });

// const waitArrow = seconds =>
//   new Promise(resolve => setTimeout(resolve, seconds * 1000));

// wait(2)
//   .then(() => {
//     console.log('I waited 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited one more second'));

// create fulfilled or rejected promise immediately
// Promise.resolve(
//   'This is the resolved value when chaining Promise.resolve.'
// ).then(x => console.log(x));

// Promise.reject(
//   new Error(
//     'Problem! This is immediately rejecting a promise using console.error'
//   )
// ).catch(x => console.error(x));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmItwo = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: long } = pos.coords;
//       return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=89293b7710ef4dc3af9d8b70d3e327bc
//         `);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log('data obj', data);
//       console.log(
//         `You are in ${data.results[0].city}, ${data.results[0].country}`
//       );
//       const country = data.results[0].country;
//       return fetch(`https://restcountries.com/v2/name/${country}`);
//       //   const countryQuery = data.results[0].country;
//       //   getCountryData(countryQuery);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`${err.message} 😬 !!! error !!!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', whereAmItwo);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
const imgContainer = document.querySelector('.images');

const createImage = imgPath =>
  new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('img1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('img1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const getPosition = () =>
  new Promise((resolve, reject) => {
    console.log('entered getPosition');
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('Position resolved:', position);
        resolve(position);
      },
      err => {
        console.error('Geolocation error:', err);
        reject(err);
      }
    );
  });

const whereAmI = async () => {
  // geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: long } = pos.coords;
  // reverse geocoding
  const resGeo = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=89293b7710ef4dc3af9d8b70d3e327bc`
  );
  if (!resGeo.ok) throw new Error('Problem getting location data');

  const dataGeo = await resGeo.json();
  console.log('dataGeo:', dataGeo); // Log to check the structure

  // Ensure you're accessing the correct path to the country property
  const country = dataGeo.results?.[0]?.country; // Adjust based on actual data structure
  if (!country) {
    console.error('Country not found in reverse geocoding response');
    return;
  }

  // country data
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  if (!res.ok) throw new Error('Problem getting country');
  const data = await res.json();
  //   console.log('data', data);
  renderCountry(data[1]);
  return `The capital is ${data[1].capital}`;
};
// console.log('1: will get location');
// whereAmI()
//   .then(capital => console.log('capital', capital))
//   .catch(err => console.error(`${err.message}`));
// console.log('2: finished getting location');

// (async () => {
//   try {
//     const capital = await whereAmI();
//     console.log('capital', capital);
//   } catch (err) {
//     console.error(`${err.message}`);
//   }
//   console.log('finished getting location');
// })();

// const get3Countries = async (c1, c2, c3) => {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     console.log(data);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race. receives array of promises and returns a promise. this is settled as soon as one of the input promises settles. the first settled promise wins the race

// (async () => {
//   const res = await Promise.race([
//     getJSON('https://restcountries.com/v2/name/egypt'),
//     getJSON('https://restcountries.com/v2/name/italy'),
//     getJSON('https://restcountries.com/v2/name/mexico'),
//   ]);
//   console.log(res);
// })();

// const timeout = sec =>
//   new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('request too too long'));
//     }, sec);
//   });
// // Promise.race
// Promise.race([getJSON('https://restcountries.com/v2/name/usa'), timeout(130)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('success'),
//   Promise.resolve('success'),
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('success'),
//   Promise.resolve('success'),
// ]).then(res => console.log(res));
// // Promise.any
// Promise.any([
//   Promise.resolve('success'),
//   Promise.resolve('success'),
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('success'),
//   Promise.resolve('success'),
// ]).then(res => console.log(res));

// CODING CHALLENGE 3

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('img1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('img1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const loadNPause = async () => {
  try {
    // load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    // load image 2
    img = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// part 2
const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async img => await createImage(img));

    const imgsEl = await Promise.all(imgs);

    // imgsEl.forEach(img => img.classList.add('parallel'));

    for (const img of imgsEl) {
      img.classList.add('parallel');
    }
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
