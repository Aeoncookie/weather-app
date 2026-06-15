'use strict';

const API_KEY = '5a323d452e3bc4de895ea87d5f17eb99';
const BASE    = 'https://api.openweathermap.org/data/2.5';
const DAYS    = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cityInput    = document.getElementById('city-input');
const searchBtn    = document.getElementById('search-btn');
const errorMsg     = document.getElementById('error-msg');
const loadingEl    = document.getElementById('loading');
const resultEl     = document.getElementById('weather-result');

function weatherIcon(id) {
  if (id >= 200 && id < 300) return '⛈️';
  if (id >= 300 && id < 400) return '🌦️';
  if (id >= 500 && id < 600) return '🌧️';
  if (id >= 600 && id < 700) return '❄️';
  if (id >= 700 && id < 800) return '🌫️';
  if (id === 800)             return '☀️';
  if (id === 801)             return '🌤️';
  if (id === 802)             return '⛅';
  return '☁️';
}

function setLoading(on) {
  loadingEl.hidden  = !on;
  searchBtn.disabled = on;
}

function showError(msg) {
  errorMsg.textContent = msg;
  resultEl.hidden = true;
}

function clearError() {
  errorMsg.textContent = '';
}

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  clearError();
  setLoading(true);

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
    ]);

    if (currentRes.status === 404) throw new Error('City not found. Check the spelling and try again.');
    if (currentRes.status === 401) throw new Error('API key not yet active. Please wait up to 2 hours after registering.');
    if (!currentRes.ok)            throw new Error('Something went wrong. Please try again.');

    const current  = await currentRes.json();
    const forecast = await forecastRes.json();

    const weatherId = current.weather[0].id;

    document.getElementById('city-display').textContent     = `${current.name}, ${current.sys.country}`;
    document.getElementById('condition-display').textContent = current.weather[0].description;
    document.getElementById('temp-display').textContent     = Math.round(current.main.temp);
    document.getElementById('temp-icon').textContent        = weatherIcon(weatherId);
    document.getElementById('humidity-display').textContent = `${current.main.humidity}%`;
    document.getElementById('wind-display').textContent     = `${Math.round(current.wind.speed * 3.6)} km/h`;
    document.getElementById('feels-display').textContent    = `${Math.round(current.main.feels_like)}°C`;

    const dailyMap = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const key  = date.toDateString();
      if (!dailyMap[key]) {
        dailyMap[key] = { day: DAYS[date.getDay()], id: item.weather[0].id, temps: [] };
      }
      dailyMap[key].temps.push(item.main.temp);
    });

    const days = Object.values(dailyMap).slice(0, 5);

    document.getElementById('forecast-grid').innerHTML = days.map(d => `
      <div class="forecast-card">
        <div class="fc-day">${d.day}</div>
        <div class="fc-icon">${weatherIcon(d.id)}</div>
        <div class="fc-max">${Math.round(Math.max(...d.temps))}°</div>
        <div class="fc-min">${Math.round(Math.min(...d.temps))}°</div>
      </div>
    `).join('');

    resultEl.hidden = false;

  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
}

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') fetchWeather(); });

cityInput.value = 'Fray Bentos';
fetchWeather();
