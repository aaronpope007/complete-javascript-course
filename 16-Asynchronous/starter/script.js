'use strict';

// https://countries-api-836d.onrender.com/countries/
const correctAPI = 'https://countries-api-836d.onrender.com/countries/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// old school way of doing AJAX calls

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    console.log('data', data);

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">{${data.region}}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('usa');
getCountryData('france');
getCountryData('germany');

// WTS Softcore
// -----------------------
// x72 T17 Ziggurat - 0.9:divine~1:/each
// x10 T17 Abomination - 0.8:divine~1:/each
// x3 T17 Santuary - 0.9:divine~1:/each
// x19 T17 Fortress - 1:divine~1:/each

// -----------------------
// 8-Mod T16 Toxic Sewer (600+)
// random - 10:chaos~1:each
// regex - 14:chaos~1:each
// regex(110%+ quant/pack size) - 18:chaos~1:each
// regex(120%+ quant) - 21:chaos~1:each
// -----------------------
// IGN: @VeryOriginalNameExile
