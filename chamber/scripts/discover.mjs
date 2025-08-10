import { places } from "./places.mjs";
import { getGreetingMSG } from "./greeting.mjs";

const discoverCards = document.querySelector(".discover-cards");
const greetingMessage = document.querySelector(".greeting p");

greetingMessage.textContent = getGreetingMSG();

function cardTemplate(place) {
	const cardDiv = document.createElement('div');
	const title = document.createElement('h2');
	title.textContent = place.name;
	cardDiv.appendChild(title);

	const figure = document.createElement('figure');
	const img = document.createElement('img');
	img.setAttribute('src', `images/${place.image}`);
	img.setAttribute('alt', `An image of the ${place.name}`);
	img.setAttribute('loading', 'lazy');
	img.setAttribute('width', '300');
	img.setAttribute('height', '200');
	figure.appendChild(img);
	cardDiv.appendChild(figure);

	const address = document.createElement('address');
	address.textContent = place.address;
	cardDiv.appendChild(address);

	const cost = document.createElement('p');
	cost.textContent = place.cost;
	cost.classList.add("cost");
	cardDiv.appendChild(cost);

	const desc = document.createElement('p');
	desc.textContent = place.description;
	cardDiv.appendChild(desc);

	const btn = document.createElement('button');
	btn.textContent = "Learn More";
	cardDiv.appendChild(btn);

	return cardDiv;
}

places.forEach(place => discoverCards.appendChild(cardTemplate(place)));