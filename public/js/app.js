console.log("Client Side JS is loaded");
const getWeather = location => {
  return fetch(`http://localhost:3000/weather?location=${location}`).then(
    res => {
      return res.json().then(data => {
        if (data.error) {
          console.log(data.error);
          return data;
        } else {
          return data;
        }
      });
    }
  );
};

const weatherForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const weatherLocation = document.getElementById("weatherLocation");
const weatherString = document.getElementById("weatherString");

const submitHandler = async e => {
  e.preventDefault();

  // Loading Message
  weatherLocation.innerText = "Loading...";
  weatherString.innerText = "...";

  // Get weather
  const weatherData = await getWeather(searchInput.value);
  console.log(weatherData);

  // Inform user of errors, if any
  if (weatherData && weatherData.error) {
    weatherLocation.innerText = "Unable to find location, please try again ✌️";
    weatherString.innerText = "";
    // return;
  } else {
    // Destucture variables for easy access
    const { geocodeData, forecastData } = weatherData;
    const { location } = geocodeData;
    const { temperature, precipProbability, summary } = forecastData;

    // Define weather strings
    const locationString = `The weather in ${location} is:`;
    const forecastString = `${temperature} degrees celcius with ${summary.toLowerCase()}`;

    // Set weather strings
    weatherLocation.innerText = locationString;
    weatherString.innerText = forecastString;
  }
};

weatherForm.addEventListener("submit", submitHandler);
