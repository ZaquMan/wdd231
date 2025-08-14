import { sleep, selectRandomSign } from "./rps-3.mjs";

const dataSrc = "data/sign_list_short.json"
const winBox = document.querySelector("#win-box");

async function getSignsData() {
	try {
		const request = await fetch(dataSrc);
		if (request.ok) {
			const data = await request.json();
			return data;
		} else {
			return await request.text();
		}
	}
	catch (error) {
		console.log(error);
	}
}

export async function createSigns(parentElement) {
	const signJson = await getSignsData();
	const signs = signJson.signs;
	for (const key in signs) {
		const card = document.createElement("div");
		card.classList.add("sign-card");
		card.classList.add("elevenObjCard");
		card.id = `elevenObj${capitalize(key)}`;

		const img = document.createElement("img");
		img.setAttribute("src", `images/hand_${key}.webp`);
		img.setAttribute("alt", `${capitalize(key)} sign`);
		img.setAttribute("loading", "lazy");
		img.setAttribute("width", "200");
		img.setAttribute("height", "200");
		card.appendChild(img);

		const tooltip = createToolTip(key, signs[key].beats);
		card.appendChild(tooltip)

		card.addEventListener("click", async() => {
			const playerSign = await makePlayerSelection(card);
			console.log(`Player chose ${playerSign}`);
			let computerSign = await selectRandomSign(getSignList("elevenObjCard"));
			computerSign = computerSign.substring(9);
			console.log(`Computer chose ${computerSign}`);
			await determineOutcome(playerSign, computerSign);
			winBox.showModal();
			await sleep(10000);
			winBox.close();
		});

		parentElement.appendChild(card);
	}
}

function getSignList(className) {
	return document.getElementsByClassName(className);
}

async function makePlayerSelection(card) {
	const signList = getSignList("elevenObjCard");
			for (const sign of signList) {
				sign.classList.remove("player");
			}
	card.classList.add("player");
	return card.id.substring(9).toLowerCase();
}

async function determineOutcome(playerSign, computerSign) {
	const signJson = await getSignsData();
	const signs = signJson.signs;

	if (!playerSign in signs) {
		console.error(`The signs list at ${dataSrc} does not have information for ${playerSign}`);
	} else if (!computerSign in signs) {
		console.error(`The signs list at ${dataSrc} does not have information for ${computerSign}`);
	}

	let title = "";
	let text = "";

	if (playerSign === computerSign) {
		//Tie condition
		title = "Its a Tie!";
		text = `You and computer both chose ${playerSign}`;
	} else if (signs[playerSign].beats.includes(computerSign)) {
		//Player sign beats computer sign
		title = "You Win!"
		text = `${capitalize(playerSign)} beats ${computerSign}`;
	} else {
		title = "The Computer Wins!";
		text = `${capitalize(computerSign)} beats ${playerSign}`;
	}
	modalBoxTemplate(title, text);
}

function modalBoxTemplate(title, text) {
	winBox.innerHTML = "";
	const h2 = document.createElement("h2");
	h2.textContent = title;

	const closeBtn = document.createElement("button");
	closeBtn.addEventListener("click", () => { winBox.close(); });
	h2.appendChild(closeBtn);
	winBox.appendChild(h2);

	const p = document.createElement("p");
	p.textContent = text;
	winBox.appendChild(p);
}

function createToolTip(sign, beats) {
	const tooltip = document.createElement("span");
	tooltip.classList.add("tooltip");
	let tipText = `${capitalize(sign)} beats`;
	beats.forEach(obj => {
		tipText += ` ${obj},`;

	});
	//Strip the last comma and set as the span's text.
	tooltip.textContent = tipText.substring(0, tipText.length - 1);
	return tooltip;
}

export function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}