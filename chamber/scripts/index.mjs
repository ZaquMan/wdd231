import { displayForecast, displayWeather } from "./weather.mjs";
import { displayMemberSpotlights } from "./members.mjs";

const weatherElement = document.querySelector("#weather");
const forecastElement = document.querySelector("#forecast");
const memberSpotlight = document.querySelector(".member-cards");

displayWeather(weatherElement);
displayForecast(forecastElement);
displayMemberSpotlights(memberSpotlight);