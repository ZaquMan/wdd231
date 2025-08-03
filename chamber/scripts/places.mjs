const dataFile = "data/places.json";

async function getPlaces() {
	try {
		const response = await fetch(dataFile);
		if (response.ok) {
			const data = await response.json();
			return data;

		} else {
			throw Error(await response.text());
		}
	}
	catch (error) {
		console.error(error);
	}
}

export const places = await getPlaces();