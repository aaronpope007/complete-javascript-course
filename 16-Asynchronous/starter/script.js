'use strict';

// https://countries-api-836d.onrender.com/countries/
const correctAPI = 'https://countries-api-836d.onrender.com/countries/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
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
  //   countriesContainer.style.opacity = 1;
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

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

const getCountryData = function (country) {
  // country 1
  console.log(country);
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found!')
    .then(data => {
      renderCountry(data[0]);
      const borders = data[0].borders; // Get the borders array
      const neighbor = borders && borders.length > 0 ? borders[0] : null; // Check if borders exist
      console.log(data);
      console.log(neighbor);
      if (!neighbor) throw new Error('No neighboring countries!');
      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(`${err}🛑 🛑 🛑 !ERROR! 🛑 🛑 🛑`);
      renderErr(
        ` 🛑 🛑 🛑 Something went wrong!  🛑 🛑 🛑 ${err.message}. TRY AGAIN!`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

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
const whereAmI = function (lat, long) {
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=89293b7710ef4dc3af9d8b70d3e327bc
  `)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log('data obj', data);
      console.log(
        `You are in ${data.results[0].city}, ${data.results[0].country}`
      );
      const country = data.results[0].country;
      return fetch(`https://restcountries.com/v2/name/${country}`);
      //   const countryQuery = data.results[0].country;
      //   getCountryData(countryQuery);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 😬 !!! error !!!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// whereAmI(52.508, 13.381);
