export function compareSigns(sign1, sign2) {
	//This expects two strings of "rock", "paper", and/or "scissors".
	const valid_signs = { "rock": "scissors", "paper": "rock", "scissors": "paper" };
	if (!Object.keys(valid_signs).includes(sign1) || !Object.keys(valid_signs).includes(sign2)) {
		console.error(`Sign 1 (${sign1}) and Sign 2 (${sign2}) must be "rock", "paper", or "scissors"`);
		return "error";
	}

	if (valid_signs[sign1] === sign2) {
		return `${sign1.toUpperCase()} (PLAYER) WINS`;
	} else if (valid_signs[sign2] === sign1) {
		return `${sign2.toUpperCase()} (COMPUTER) WINS`;
	} else {
		return `${sign1.toUpperCase()} AND ${sign2.toUpperCase()} TIE`;
	}
}

export async function selectRandomSign(signList) {
	var selected_sign = signList[Math.floor(Math.random() * signList.length)];

	for (let i = 0; i < 10; i++) {
		let sign = signList[Math.floor(Math.random() * signList.length)];
		sign.classList.add("computer");
		await sleep(100);
		sign.classList.remove("computer");
	}
	selected_sign.classList.add("computer");
	await sleep(100);
	return selected_sign.id.toLowerCase();
}

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getPlayerSign(signList) {
	return signList.filter(signObj => signObj.classList.contains("player"))[0];
}

export function setPlayerSign(signList, selection) {
	signList.forEach(sign => sign.classList.remove("player"));
	selection.classList.add("player");
}