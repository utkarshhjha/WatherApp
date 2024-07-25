const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const searchInput = document.querySelector('.search-box input');

const APIKey = 'e43684179b5eed382ba53aabcff9685b';

const fetchWeatherData = () => {
    const city = searchInput.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                alert('City not found');
                return;
            }

            console.log(json);

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images/Cloudy-Sun.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
                    break;
            }

            if (json.main) {
                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                humidity.innerHTML = `${json.main.humidity}%`;
            } else {
                console.error('Temperature and humidity data not available.');
            }

            if (json.wind) {
                wind.innerHTML = `${json.wind.speed}Km/h`;
            } else {
                console.error('Wind data not available.');
            }

            description.innerHTML = json.weather[0].description;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
        })
        .catch(err => {
            console.error('Error fetching the weather data:', err);
        });
};

search.addEventListener('click', fetchWeatherData);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
});

