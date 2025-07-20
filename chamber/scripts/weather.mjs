const apiKey = "ce93a6ec9741a609a932640fb47e3496";
//FIXME: Remove key before pushing to Github
const lat = "33.82";
const lon = "-118.04";
let type = "current";
const baseURL = `https://api.openweathermap.org/data/2.5/`;

async function getCurrentWeather() {
	try {
		const url = `${baseURL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return { "icon": data.weather, "weather": data.main, "other": data.sys };
		} else {
			throw Error(await response.text());
		}
	}
	catch (error) {
		console.error(error);
	}
}

export async function displayWeather(weatherElement) {
	const weather = await getCurrentWeather();
	const iconImg = document.createElement("img");
	iconImg.setAttribute("src", `https://openweathermap.org/img/wn/${weather.icon[0].icon}@2x.png`)
	iconImg.setAttribute("alt", `${weather.icon[0].description} weather icon`);
	weatherElement.appendChild(iconImg);
	const weatherDetails = document.createElement("div");
	weatherDetails.innerHTML = weatherDetailsTemplate(weather);
	weatherElement.appendChild(weatherDetails);
}

function weatherDetailsTemplate(weatherJson) {
	const sunrise = new Date(weatherJson.other.sunrise);
	const sunset = new Date(weatherJson.other.sunset);
	return `<span>${Math.round(weatherJson.weather.temp)}</span>&deg;F<br>
	${weatherJson.icon[0].main}<br>
	High: ${Math.round(weatherJson.weather.temp_max)}&deg;F<br>
	Low: ${Math.round(weatherJson.weather.temp_min)}&deg;F<br>
	Humidity: ${weatherJson.weather.humidity}%<br>
	Sunrise: ${sunrise.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}<br>
	Sunset: ${sunset.toLocaleTimeString("en-US", { hour:"numeric", minute:"numeric" })}`
}

async function getForecast() {
	try {
		const url = `${baseURL}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data.list;
		} else {
			throw Error(await response.text());
		}
	}
	catch (error) {
		console.error(error);
	}
}

export async function displayForecast(forecastElement) {
	const forecastList = await getForecast();
	//Trim down to 3-day (1-day step) forecast instead of 5-day (3-hr step)
	// Current day's forecast
	const today = new Date();
	const todayP = document.createElement("li");
	const todayTemp = Math.round(forecastList[0].main.temp);
	todayP.innerHTML = `Today: <span>${todayTemp}&deg;F`;
	forecastElement.appendChild(todayP);
	// Tomorrow's forecast
	const tomorrow = today;
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowStr = `${tomorrow.toLocaleDateString("en-CA")} 21:00:00`
	const tomorrowP = document.createElement("li");
	const tomorrowForecast = forecastList.find(forecast => forecast.dt_txt === tomorrowStr);
	const tomorrowTemp = Math.round(tomorrowForecast.main.temp);
	tomorrowP.innerHTML = `${tomorrow.toLocaleDateString('en-US', { weekday: 'long' })}: <span>${tomorrowTemp}&deg;F`;
	forecastElement.appendChild(tomorrowP);

	const overmorrow = tomorrow;
	overmorrow.setDate(overmorrow.getDate() + 1);
	const overmorrowStr = `${overmorrow.toLocaleDateString("en-CA")} 21:00:00`
	const overmorrowP = document.createElement("li");
	const overmorrowForecast = forecastList.find(forecast => forecast.dt_txt === overmorrowStr);
	const overmorrowTemp = Math.round(overmorrowForecast.main.temp);
	overmorrowP.innerHTML = `${overmorrow.toLocaleDateString('en-US', { weekday: 'long' })}: <span>${overmorrowTemp}&deg;F`;
	forecastElement.appendChild(overmorrowP);
}