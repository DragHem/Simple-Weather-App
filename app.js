const APIKey = "6cd7eee5580b7242586053a6052a8d3b";

//API pogoda
let inputValue = document.querySelector("input");
const API = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&lang=pl&APPID=${APIKey}&units=metric`;
let pogoda = {};

fetch(API)
  .then((response) => {
    if (response.ok) return response;
    throw Error("Nie działa");
  })
  .then((response) => response.json())
  .then((data) => Object.assign(pogoda, data))
  .finally(() => Show());

//API Obrazki
const auth = "563492ad6f917000010000011fe66a5055834c9faea3017eb3b55616";

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=1&locale=pl-PL`;
  const data = await fetchApi(fetchLink);
  container.style.backgroundImage = `url(${
    data.photos[0]
      ? data.photos[0].src.portrait
      : "../pexels-sam-willis-1166991.jpg"
  })`;
}

//Sekeltory
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const weatherIcon = document.querySelector("img");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const tempMin = document.querySelector(".tempMin");
const tempMax = document.querySelector(".tempMax");
const wind = document.querySelector(".wind");
const rain = document.querySelector(".rain");
const snow = document.querySelector(".snow");
const time = document.querySelector(".time");
const day = document.querySelector(".day");
const container = document.querySelector(".image");

const dniTygodnia = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

//Input event
inputValue.addEventListener("change", (e) => {
  inputValue = e.target.value;

  if (!inputValue) {
    console.log("Inpout nie może być pusty");
  } else {
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&lang=pl&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then((response) => {
        if (response.ok) return response;
        throw Error("Nie działa");
      })
      .then((response) => response.json())
      .then((data) => Object.assign(pogoda, data))
      .finally(() => Show(inputValue));

    searchPhotos(inputValue);
  }
});

function Show(inputValue) {
  //Miasto
  city.textContent = pogoda.name;

  //Państwo
  country.textContent = pogoda.sys.country;

  //Ikonka
  const icon = pogoda.weather[0].icon;
  let iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.src = iconLink;

  //Opis
  desc.textContent = `${pogoda.weather[0].description}`;

  //Temperatura
  temp.textContent = `${Math.floor(pogoda.main.temp)} °C`;
  tempMin.textContent = `Min: ${Math.floor(pogoda.main.temp_min)} °C`;
  tempMax.textContent = `Max: ${Math.floor(pogoda.main.temp_max)} °C`;

  //Desz
  rain.textContent = `${pogoda.rain ? `${pogoda.rain["1h"]}mm` : `- mm`}`;

  //Śnieg
  snow.textContent = `${pogoda.snow ? `${pogoda.snow["1h"]}mm` : `- mm`}`;

  //Wiatr
  wind.textContent = `${pogoda.wind.speed} m/s`;

  //Godzina
  // let timestamp = pogoda.dt * 1000;
  let data = new Date();
  time.textContent = `${
    data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()
  }:${data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()}`;

  //Dzień tygodnia
  day.textContent =
    data.getDay() == 0 ? dniTygodnia[6] : dniTygodnia[data.getDay() - 1];

  // searchPhotos(inputValue);

  setInterval(() => Show(inputValue), 60000);
}
