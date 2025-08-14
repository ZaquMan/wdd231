import { capitalize, createToolTip, getSignList, modalBoxTemplate } from "./rps-11.mjs";
import { selectRandomSign, sleep } from "./rps-3.mjs";

const url = "https://rps101.pythonanywhere.com/api/v1/";
const imgUrl = "https://rps101.pythonanywhere.com/static/";
const imgIdMapLink = "data/sign_to_image_id.json"
const imgIdMap = await getJson(imgIdMapLink);
const itemList = await getJson(`${url}objects/all`);
const winBox = document.querySelector("#win-box");

async function getJson(link) {
	try {
		const response = await fetch(link);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.log(await response.text());
		}
	}
	catch (error) {
		console.error(error);
	}
}

export async function drawRPSCards(parentElement) {
	itemList.forEach(async (item) => {
		const card = document.createElement("div");
		card.classList.add("sign-card");
		card.classList.add("hundredObjCard");
		card.id = `hundredObj${capitalize(item)}`;

		const img = document.createElement("img");
		img.setAttribute("src", `${imgUrl}${imgIdMap[item]}`);
		img.setAttribute("alt", `${item} sign`);
		img.setAttribute("loading", "lazy");
		img.setAttribute("width", "75");
		img.setAttribute("height", "75");
		card.appendChild(img);

		const itemDetails = await getJson(`${url}objects/${item}`)
		const beatList = itemDetails["winning outcomes"].map(result => result[1]);

		const tooltip = createToolTip(item, beatList);
		card.appendChild(tooltip)

		card.addEventListener("click", async () => {
			const playerSign = await makePlayerSelection(card);
			console.log(`Player chose ${playerSign}`);
			let computerSign = await selectRandomSign(getSignList("hundredObjCard"));
			computerSign = computerSign.substring(10);
			console.log(`Computer chose ${computerSign}`);
			await determineOutcome(playerSign, computerSign);
			winBox.showModal();
			await sleep(10000);
			winBox.close();
		});

		parentElement.appendChild(card);
	});
}

async function makePlayerSelection(card) {
	const signList = getSignList("hundredObjCard");
			for (const sign of signList) {
				sign.classList.remove("player");
			}
	card.classList.add("player");
	return card.id.substring(10).toLowerCase();
}

async function determineOutcome(playerSign, computerSign) {
	const outcome = await getJson(`${url}match?object_one=${playerSign}&object_two=${computerSign}`);
	let title = "";
	let text = "";
	if (outcome.winner.toLowerCase() === playerSign.toLowerCase()) {
		title = "You Win!";
		text = `Your ${outcome.winner} ${outcome.outcome} the computer's ${outcome.loser}`;
	} else if (outcome.winner.toLowerCase() === computerSign.toLowerCase()) {
				title = "You Lose!";
		text = `The computer's ${outcome.winner} ${outcome.outcome} your ${outcome.loser}`;
	} else {
		title = "Its a Tie!";
		text = `You and the computer chose the same ${playerSign}`;
	}
	modalBoxTemplate(winBox, title, text);
}

