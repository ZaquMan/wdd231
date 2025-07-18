const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
apiKey = ""
const url = `https://api.openweathermap.org/data/2.5/weather/?lat=49.75&lon=6.63&appid=${apiKey}&units=imperial`

async function apiFetch() {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			displayResults(data);
		} else {
			throw Error(await response.text());
		}
	}
	catch (error) {
		console.log(error);
	}
}

function displayResults(data) {
	currentTemp.innerHTML = `${data.main.temp} &deg;F`;
	weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
	weatherIcon.setAttribute("alt", `${data.weather[0].description} weather icon`);
	captionDesc.textContent = data.weather[0].main;
}

apiFetch();