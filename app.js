const API_KEY = 'API_KEY_DO_OPENWEATHERMAP';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');

const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(`q=${encodeURIComponent(city)}`);
  }
});

geoBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherData(`lat=${lat}&lon=${lon}`);
      }
    );
  }
});

async function getWeatherData(queryParam) {
  try {
    errorMessage.textContent = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${API_KEY}&units=metric&lang=pt_br`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Verifique o nome da cidade ou se a API está ativa.');
    }

    const data = await response.json();
    displayData(data);
  } catch (err) {
    showError(err.message);
  }
}

function displayData(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

  weatherInfo.classList.remove('hidden');
}

function showError(msg) {
  weatherInfo.classList.add('hidden');
  errorMessage.textContent = msg;
}
