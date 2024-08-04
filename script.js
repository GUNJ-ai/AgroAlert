document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var location = document.getElementById('locationInput').value;
    var phoneNumber = document.getElementById('phoneNumberInput').value;
    if (location && phoneNumber) {
        document.getElementById('loadingSpinner').style.display = 'block';
        try {
            await fetchWeather(location, phoneNumber);
        } finally {
            document.getElementById('loadingSpinner').style.display = 'none';
        }
    } else {
        alert('Please enter both a location and your mobile number.');
    }
});

async function fetchWeather(location, phoneNumber) {
    var apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        if (data.cod === 200) {
            var weatherDescription = data.weather[0].description;
            var temperature = (data.main.temp - 273.15).toFixed(1);
            var humidity = data.main.humidity;
            var visibility = data.visibility / 1000;
            var windSpeed = data.wind.speed;
            var windDirection = data.wind.deg;

            var message = `Location: ${location}\nWeather: ${weatherDescription}\nTemperature: ${temperature}°C\nHumidity: ${humidity}%\nVisibility: ${visibility} km\nWind Speed: ${windSpeed} m/s\nWind Direction: ${windDirection}°`;

            alert(message);

            await sendSMS(phoneNumber, message);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('An error occurred while fetching weather data.');
    }
}

async function sendSMS(phoneNumber, message) {
    try {
        let response = await fetch('http://localhost:3000/send-sms', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                message: message,
            }),
        });
        let data = await response.json();
        if (data.success) {
            alert('Notification sent successfully!');
        } else {
            alert('Error sending SMS: ' + data.error);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        alert('An error occurred while sending the notification.');
    }
}







