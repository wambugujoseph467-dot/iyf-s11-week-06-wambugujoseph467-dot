const API_KEY = "c7677a4869de61b51de0d8d7d168aa1f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Weather Elements
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// Search History
const historyList = document.getElementById("search-history");

// Fetch Weather
async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        displayWeather(data);
        saveToHistory(city);

    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Display Weather
function displayWeather(data) {

    cityName.textContent = `${data.name}, ${data.sys.country}`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${data.main.temp} °C`;

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${data.main.feels_like} °C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} m/s`;

    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

// Loading
function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

// Errors
function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

// Save Recent Searches
function saveToHistory(city) {

    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    // Remove duplicate
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add newest search
    history.unshift(city);

    // Keep only last 5 searches
    history = history.slice(0, 5);

    localStorage.setItem("weatherHistory", JSON.stringify(history));

    loadHistory();
}

// Load Search History
function loadHistory() {

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}

// Form Submit
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

// Initialize
loadHistory();