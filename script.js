 const API_KEY = 'demo_key'; // In a real app, you'd use a real API key
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

        // Weather icon mapping
        const weatherIcons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '⛅',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌦️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '🌨️', '13n': '🌨️',
            '50d': '🌫️', '50n': '🌫️'
        };

        // Sample weather data for demo purposes
        const sampleWeatherData = {
            london: {
                name: "London",
                main: {
                    temp: 18,
                    feels_like: 20,
                    humidity: 65,
                    pressure: 1013
                },
                weather: [{
                    main: "Clouds",
                    description: "partly cloudy",
                    icon: "02d"
                }],
                wind: {
                    speed: 3.5
                }
            },
            "new york": {
                name: "New York",
                main: {
                    temp: 22,
                    feels_like: 24,
                    humidity: 58,
                    pressure: 1015
                },
                weather: [{
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d"
                }],
                wind: {
                    speed: 2.8
                }
            },
            tokyo: {
                name: "Tokyo",
                main: {
                    temp: 25,
                    feels_like: 27,
                    humidity: 72,
                    pressure: 1008
                },
                weather: [{
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }],
                wind: {
                    speed: 4.2
                }
            },
            paris: {
                name: "Paris",
                main: {
                    temp: 16,
                    feels_like: 18,
                    humidity: 68,
                    pressure: 1012
                },
                weather: [{
                    main: "Clouds",
                    description: "overcast clouds",
                    icon: "04d"
                }],
                wind: {
                    speed: 3.1
                }
            }
        };

        function showLoading() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('weatherDisplay').style.display = 'none';
            document.getElementById('error').style.display = 'none';
        }

        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }

        function showError(message) {
            document.getElementById('error').textContent = message;
            document.getElementById('error').style.display = 'block';
            document.getElementById('weatherDisplay').style.display = 'none';
            hideLoading();
        }

        function displayWeather(data) {
            const cityName = document.getElementById('cityName');
            const weatherIcon = document.getElementById('weatherIcon');
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
            const feelsLike = document.getElementById('feelsLike');
            const humidity = document.getElementById('humidity');
            const windSpeed = document.getElementById('windSpeed');
            const pressure = document.getElementById('pressure');

            cityName.textContent = data.name;
            weatherIcon.textContent = weatherIcons[data.weather[0].icon] || '🌤️';
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} m/s`;
            pressure.textContent = `${data.main.pressure} hPa`;

            document.getElementById('weatherDisplay').style.display = 'block';
            document.getElementById('error').style.display = 'none';
            hideLoading();
        }

        async function fetchWeather(city) {
            showLoading();
            
            // For demo purposes, we'll use sample data
            // In a real app, you'd use: const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            
            const cityLower = city.toLowerCase();
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (sampleWeatherData[cityLower]) {
                displayWeather(sampleWeatherData[cityLower]);
            } else {
                showError(`Weather data for "${city}" not found. Try: London, New York, Tokyo, or Paris`);
            }
        }

        function searchWeather() {
            const city = document.getElementById('cityInput').value.trim();
            if (city) {
                fetchWeather(city);
            } else {
                showError('Please enter a city name');
            }
        }

        function getCurrentLocation() {
            if (navigator.geolocation) {
                showLoading();
                navigator.geolocation.getCurrentPosition(
                    position => {
                        // For demo, we'll show London as current location
                        setTimeout(() => {
                            displayWeather(sampleWeatherData.london);
                        }, 1000);
                    },
                    error => {
                        showError('Unable to get your location. Please search for a city manually.');
                    }
                );
            } else {
                showError('Geolocation is not supported by this browser');
            }
        }

        // Allow Enter key to search
        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        // Load default city on page load
        window.onload = function() {
            fetchWeather('London');
        };