import { drawRPSCards } from "./rps-101.mjs";

const mukjjippa = document.querySelector("#muk-jji-ppa");

mukjjippa.addEventListener("click", () => { mukjjippa.classList.toggle("show"); });

const hundredObjParts = document.querySelector("#hundredObjParts")

drawRPSCards(hundredObjParts);