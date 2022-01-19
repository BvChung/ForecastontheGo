// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import * as model from "./model.js";
import locationSearch from "./view.js";

//unitType = metric or imperial (c/f)

const getLocation = async function () {
	// 1) Get city from text input
	const location = locationSearch.getCity();
	console.log(location);

	if (!location) return;

	// 2) Fetch API with location to get latitude and longitude of current city
	await model.getCoordinates(location, "metric");

	// 3. Get lat and lon from stored data from API
	const { latitude, longitude } = model.state.coord;
	console.log(latitude, longitude);

	// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
	await model.weeklyForecast(latitude, longitude, "metric");
	console.log(model.state.dailyForecast);
	console.log(model.state.currentDayUnixTime);
};

const init = function () {
	locationSearch.addHandlerSearch(getLocation);
};
init();

// Unix converter will get unix sunset time to determine what day it is sunday 0 -> forward
const unixConverter = async function (unix) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	let date = new Date(unix * 1000);

	// sunday is 0 -> sat
	const day = date.getDay();
	console.log(day);
};
// unixConverter(1642425426);
// unixConverter(1642598200);
// unixConverter(1642511814);

const sat = new Date(`January 22, 2022`);
console.log(sat.getDay());

// const text = document.querySelector(".search-city");

// document.querySelector(".info-input").addEventListener("submit", function (e) {
// 	e.preventDefault();

// 	const city = text.value;
// 	console.log(city);
// });
