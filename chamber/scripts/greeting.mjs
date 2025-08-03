const msToDays = 86400000

export function getGreetingMSG() {
	const now = new Date();
	let lastVisit = localStorage.getItem("lastVisited");
	if (lastVisit) {
		lastVisit = new Date(lastVisit);
	}
	const timeDelta = now - lastVisit;

	localStorage.setItem("lastVisited", now.toString());

	if (lastVisit == null) {
		return "Welcome! Let us know if you have any questions."
	} else if (timeDelta < msToDays) {
		//It's been less than 1 day
		return "Back so soon! Awesome!";
	} else {
		const days = Math.floor(timeDelta / msToDays);
		return `You last visited ${days} ago.`
	}
}