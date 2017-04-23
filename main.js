'use strict';

var openweatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?id=704147&APPID=9193119843f393c2c87bc335674f1cf1&mode=xml&units=metric';
var XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
var xhr = new XHRequest();

xhr.open('GET', openweatherAPI, true);

xhr.onload = function () {
        var monthObj = {
                '01': 'January',
                '02': 'February',
                '03': 'March',
                '04': 'April',
                '05': 'May',
                '06': 'June',
                '07': 'July',
                '08': 'August',
                '09': 'September',
                '10': 'October',
                '11': 'November',
                '12': 'December'
        };
        var XMLDoc = this.responseXML;
        var container = document.getElementById('forecast');
        var forecastArr = XMLDoc.getElementsByTagName('time');
        var dateCounter = '';
        var weatherSection = document.createElement('div');
        weatherSection.classList.add('weather__section');
        for (var i = 0; i < forecastArr.length; i++) {
                var timeFrom = forecastArr[i].getAttribute('from');
                var timeTo = forecastArr[i].getAttribute('to');

                var dateStr = timeFrom.substr(8, 2); // ищу дату
                var monthStr = monthObj[timeFrom.substr(5, 2)]; // вычисляю месяц

                var timeFromStr = timeFrom.substr(11, 5); // ищу время от и до
                var timeToStr = timeTo.substr(11, 5);

                var temperatureStr = forecastArr[i].getElementsByTagName('temperature')[0].getAttribute('value'); // нахожу температуру
                var temperatureNum = Math.round(temperatureStr); // и округляю

                var weatherNameStr = forecastArr[i].getElementsByTagName('symbol')[0].getAttribute('name'); // нахожу погоду

                var windSpeedStr = forecastArr[i].getElementsByTagName('windSpeed')[0].getAttribute('mps'); // нахожу скорость ветра
                var windSpeednNum = Math.round(windSpeedStr); // и округляю

                var windDirectionStr = forecastArr[i].getElementsByTagName('windDirection')[0].getAttribute('name').toLowerCase(); // нахожу направление ветра и перевожу строку в нижний регистр

                var fullWeather = timeFromStr + ' - ' + timeToStr + ' : ' + temperatureNum + ' C\xB0, ' + weatherNameStr + ', wind: ' + windSpeednNum + ' m/s, ' + windDirectionStr;

                // операции с HTML

                var fullWeatherSection = document.createElement('p');
                fullWeatherSection.classList.add('weather__text');
                fullWeatherSection.innerHTML = fullWeather;

                if (dateCounter !== dateStr) {
                        var dateSection = document.createElement('p');
                        dateSection.classList.add('weather__date');
                        var fullDate = dateStr + ' ' + monthStr;
                        dateSection.innerHTML = fullDate;
                        weatherSection.appendChild(dateSection);
                }

                dateCounter = dateStr;

                weatherSection.appendChild(fullWeatherSection);
                container.appendChild(weatherSection);
        }
};

xhr.onerror = function () {
        console.log('Error! ' + this.status + ':' + this.statusText);
};

xhr.send();