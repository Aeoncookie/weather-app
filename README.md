# Weather App

A clean, responsive weather app that shows current conditions and a 5-day forecast for any city in the world, powered by the OpenWeather API.

**[Live Demo →](https://aeoncookie.github.io/weather-app)**

---

## What it does

- Search any city by name
- Displays current temperature, weather condition, humidity, wind speed, and feels-like temperature
- 5-day forecast with daily high/low temperatures
- Weather icons that adapt to conditions (sun, rain, snow, storm, fog...)
- Responsive layout — works on mobile and desktop
- Dark mode support via `prefers-color-scheme`

## Tech stack

- HTML5
- CSS3 (custom properties, responsive grid, dark mode)
- Vanilla JavaScript (fetch API, async/await)
- [OpenWeather API](https://openweathermap.org/api) — free tier

## Setup

1. Get a free API key at [openweathermap.org](https://openweathermap.org)
2. Open `script.js` and replace the `API_KEY` value with your own key
3. Open `index.html` in your browser

```bash
git clone https://github.com/Aeoncookie/weather-app.git
cd weather-app
# Replace API_KEY in script.js, then open index.html
```

> **Note:** New OpenWeather API keys take up to 2 hours to activate after registration.

## Key concepts demonstrated

- Fetching data from a third-party REST API using `fetch` and `async/await`
- Handling multiple concurrent API calls with `Promise.all`
- DOM manipulation based on API response data
- Error handling (city not found, inactive key, network errors)
- Responsive CSS grid layout

---

Made by [Juan Medrano](https://www.linkedin.com/in/juan-manuel-medrano) · Mechatronics Engineering student at UTEC, Uruguay
