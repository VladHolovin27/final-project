// const cardA = document.querySelector('.cardA');
// const modalA = document.querySelector('.modalA');
// const close1 = document.querySelector('.close');


// cardA.addEventListener('click', () => {
//   modalA.style.display = 'block';
// })

// close1.addEventListener('click', () => {
//         modalA.style.display = 'none';
// })

// document.addEventListener('click', (event) => {
//         if (event.target == modalA) {
//           modalA.style.display = 'none';
//         }
// })

// const cardE = document.querySelector('.cardE');
// const modalE = document.querySelector('.modalE');
// const close2 = document.querySelector('.close');

// cardE.addEventListener('click', () => {
//   modalE.style.display = 'block';
// })

// close2.addEventListener('click', () => {
//         modalE.style.display = 'none';
// })

// document.addEventListener('click', (event) => {
//         if (event.target == modalE) {
//           modalE.style.display = 'none';
//         }
// })

// const cardLP = document.querySelector('.cardLP');
// const modalLP = document.querySelector('.modalLP');
// const close3 = document.querySelector('.close');

// cardLP.addEventListener('click', () => {
//   modalLP.style.display = 'block';
// })

// close3.addEventListener('click', () => {
//         modalLP.style.display = 'none';
// })

// document.addEventListener('click', (event) => {
//         if (event.target == modalLP) {
//           modalLP.style.display = 'none';
//         }
// })

// const cardM = document.querySelector('.cardM');
// const modalM = document.querySelector('.modalM');
// const close4 = document.querySelector('.close');

// cardM.addEventListener('click', () => {
//   modalM.style.display = 'block';
// })

// close4.addEventListener('click', () => {
//         modalM.style.display = 'none';
// })

// document.addEventListener('click', (event) => {
//         if (event.target == modalM) {
//           modalM.style.display = 'none';
//         }
// })

const cards = document.querySelectorAll('.cardA, .cardE, .cardLP, .cardM');
const modals = document.querySelectorAll('.modalA, .modalE, .modalLP, .modalM');
const closeButtons = document.querySelectorAll('.close');

// Додаємо обробник події для кожної картки
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    // Показуємо відповідне модальне вікно при кліку на картку
    modals[index].style.display = 'block';
  });
});

// Додаємо обробник події для кожної кнопки закриття
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Закриваємо модальне вікно, що є батьківським елементом кнопки
    const modal = button.closest('.modalA, .modalE, .modalLP, .modalM');
    modal.style.display = 'none';
  });
});

// Додаємо обробник події для закриття модального вікна при кліку поза ним
document.addEventListener('click', (event) => {
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
const firstSectionInput = document.querySelector('.first-section-input');
const containerForInp = document.querySelector('.container-for-inp');

async function getCountryInfo(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = await response.json(); 

        renderCountryInfo(countryData[0]);
    } catch (error) {
        console.error('Помилка при отриманні інформації про країну:', error);
    }
}

function renderCountryInfo(countryData) {
    const countryCode = countryData.cca2.toLowerCase();
    
    const flagImageUrl = `https://flagcdn.com/w80/${countryCode}.png`;

    const countryInfoHTML = `
    <div class="countryInfo">
        <h2 style="color: black; text-align: center;">${countryData.name.common}</h2>
        <img style="display: block; margin: auto;" src="${flagImageUrl}" alt="${countryData.name.common} flag" class="countryFlag">
        <p style="color: black; text-align: center;">Столиця: ${countryData.capital}</p>
        <p style="color: black; text-align: center;">Населення: ${countryData.population}</p>
        <p style="color: black; text-align: center;">Регіон: ${countryData.region}</p>
    </div>
`;
    containerForInp.innerHTML = countryInfoHTML;
}

firstSectionInput.addEventListener('change', async function() {
    const selectedCountry = this.value.trim();
    await getCountryInfo(selectedCountry);
});


// select-js
// const select = document.querySelector('.head-select')
// let currentCountry;
// let currentCountryCode;
// let filmsContent;
// function getSelectedCountry(ev) {
//   let currentValue = ev.target.value;
//   currentCountry = currentValue;
//   console.log(currentCountry);

//   fetch("http://localhost:3000/countries")
//   .then(response => response.json())
//   .then(countrie => {
//       for (const b of countrie) {
//           for (const country in b) {
//               if (b[country] == currentValue) {
//                   currentCountryCode = country;
//                   console.log(currentCountryCode);

//                   fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${currentCountryCode}&apikey=AxtuDA2qyWJpZhpgXKkX64bmFaWEAQD8`)
//                   .then(response => response.json())
//                   .then(concert => {
//                       filmsContent.textContent = ""
//                       for (const i of concert._embedded.events) {
//                           filmsContent.innerHTML += `
//                           <div class="film">
//                               <img src="${i.images[0].url}" class="film-img">
//                               <div class="film-info">
//                                   <h5 class="film-title">${i.name}</h5>
//                                   <p class="film-date">${i.dates.start.localDate}</p>
//                                   <p class="film-place">
//                                       <img src="./img/filmSvg.svg" alt="">
//                                       ${i._embedded.venues[0].name}</p>
//                               </div>
//                           </div>
//                           `
//                           }
//                   })

//               }
//           }
//       }
//   })  
// }

// select.addEventListener('change', async (e) => {
//   currentCountryCode = await getSelectedCountry(e);
// })

const select = document.querySelector('.head-select');
const filmsContent = document.querySelector('.films-content')

async function getConcerts(countryCode) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=i5itF6KAbt62ic2HssQhgWhG0iabdQka`);
        const concertData = await response.json();

        filmsContent.innerHTML = "";

        concertData._embedded.events.forEach(concert => {
            filmsContent.innerHTML += `
                <div class="film">
                    <img src="${concert.images[0].url}" class="film-img">
                    <div class="film-info">
                        <h5 class="film-title">${concert.name}</h5>
                        <p class="film-date">${concert.dates.start.localDate}</p>
                        <p class="film-place">
                            <img src="./img/filmSvg.svg" alt="">
                            ${concert._embedded.venues[0].name}
                        </p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching concerts:', error);
    }
}

async function populateCountries() {
    try {
        const response = await fetch("http://localhost:3000/countries");
        const data = await response.json();
        const countries = data.countries;
        console.log(response);
        countries.forEach(country => {
            const countryCode = Object.keys(country)[0];
            const countryName = country[countryCode];
            const option = document.createElement('option');
            option.value = countryCode;
            option.textContent = countryName;
            select.appendChild(option);
        });

        select.addEventListener('change', async (e) => {
            const countryCode = e.target.value;
            await getConcerts(countryCode);
        });
    } catch (error) {
        console.error('Error populating countries:', error);
    }
}

populateCountries();
