const State = {
  AVAILABLE: 1, // USER DIDN'T CHOOSE IT AS BUSY AND GOOD WEATHER
  BUSY: 2, // USER CHOOSE IT AS BUSY
  UNAVAILABLE: 3, // BAD WEATHER
};
Object.freeze(State);

document.addEventListener('DOMContentLoaded', _ => {
  var app = new Vue({
    el: '#app',
    data: {
      location: '', // e.g. Ann Arbor, MI
      locationResults: [], // e.g. places recommendation for Ann Arbor

      rawResults: null, // temporary raw results returned from API, maybe useless

      weatherResults: [], // e.g. Ann Arbor weather for today and next 6 days

      dateArray: ["Nov.17 W", "Nov.18 TH", "Nov.19 F", "Nov.20 SAT", "Nov.21 SUN", "Nov.22 M"], // e.g.["Nov.17 W","Nov.18 TH","Nov.19 F","Nov.20 SAT","Nov.21 SUN",...], length = 6

      schedule: {
        // today
        "0": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        // tomorrow
        "1": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        // the day after tomorrow
        "2": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        "3": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        "4": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        "5": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
        "6": [State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE, State.AVAILABLE],
      },


      /** @type {GeolocationPosition?} */
      position: null,

      /** @type {String?} */
      weatherApiKey: null,

      /** @type {Object?} */
      weatherJson: null,

      /** @type {Object?} */
      airQualityJson: null,
    },
    methods: {
      /**
       * onclick handler when user clicks a time cell
       * modify this.schedule
       *
       * @param {PointerEvent} e
       */
      clickCell: function (e) {
      },
      /**
       * get the location data from an API
       * process rawResults and store useful data in weather
       * @param {PointerEvent} e
       */
      getLocation: function (e) {
      },
      /**
       * get the dateArray based on today's date
       * @param {PointerEvent} e
       */
      getDateArray: function (e) {
      },
      /**
       * Get position from device.
       * @param {PointerEvent} e
       */
      getPosition(e) {
        if (!navigator.geolocation)
          alert('Geolocation API is not supported by your browser!')

        console.log('Getting current location ...')
        navigator.geolocation.getCurrentPosition(
          pos => {
            console.log('Got current location!')
            this.position = pos
          },
          _ => {
            alert('Cannot get loation!')
          })
      },
      /**
       * Get all Weather/AirQuality info.
       * @param {PointerEvent} e
       */
      getWeatherAQ(e) {
        /** @type {GeolocationPosition} */
        const pos = this.position
        if (pos == null) {
          alert('Get position first!')
          return
        }

        /** @type {String} */
        const apiKey = this.weatherApiKey
        if (apiKey == null || apiKey.length == 0) {
          alert('Type Weather API key!')
          return
        }

        const coords = pos.coords

        // weather
        axios.get('https://api.openweathermap.org/data/2.5/onecall', {
          params: {
            lat: coords.latitude,
            lon: coords.longitude,
            appid: this.weatherApiKey,
            units: 'metric'
          }
        }).then(js => {
          console.log(js)
          this.weatherJson = js
        }).catch(e => {
          alert(e)
          throw e
        })

        // air quality
        axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
          params: {
            lat: coords.latitude,
            lon: coords.longitude,
            appid: this.weatherApiKey,
          }
        }).then(js => {
          console.log(js)
          this.airQualityJson = js
        }).catch(e => {
          alert(e)
          throw e
        })

      }
    }
  })


  // For testing purpose; saves api call count
  app.weatherJson = { "lat": 42.273, "lon": -83.7518, "timezone": "America/Detroit", "timezone_offset": -18000, "current": { "dt": 1637204907, "sunrise": 1637152111, "sunset": 1637187110, "temp": 7.82, "feels_like": 6.45, "pressure": 1010, "humidity": 91, "dew_point": 6.44, "uvi": 0, "clouds": 90, "visibility": 8047, "wind_speed": 2.24, "wind_deg": 306, "wind_gust": 7.15, "weather": [{ "id": 701, "main": "Mist", "description": "mist", "icon": "50n" }] }, "minutely": [{ "dt": 1637204940, "precipitation": 0 }, { "dt": 1637205000, "precipitation": 0 }, { "dt": 1637205060, "precipitation": 0 }, { "dt": 1637205120, "precipitation": 0 }, { "dt": 1637205180, "precipitation": 0 }, { "dt": 1637205240, "precipitation": 0 }, { "dt": 1637205300, "precipitation": 0 }, { "dt": 1637205360, "precipitation": 0 }, { "dt": 1637205420, "precipitation": 0 }, { "dt": 1637205480, "precipitation": 0.1068 }, { "dt": 1637205540, "precipitation": 0.1303 }, { "dt": 1637205600, "precipitation": 0.1538 }, { "dt": 1637205660, "precipitation": 0.1327 }, { "dt": 1637205720, "precipitation": 0.1117 }, { "dt": 1637205780, "precipitation": 0 }, { "dt": 1637205840, "precipitation": 0 }, { "dt": 1637205900, "precipitation": 0 }, { "dt": 1637205960, "precipitation": 0 }, { "dt": 1637206020, "precipitation": 0 }, { "dt": 1637206080, "precipitation": 0 }, { "dt": 1637206140, "precipitation": 0 }, { "dt": 1637206200, "precipitation": 0 }, { "dt": 1637206260, "precipitation": 0.1686 }, { "dt": 1637206320, "precipitation": 0.2885 }, { "dt": 1637206380, "precipitation": 0.4085 }, { "dt": 1637206440, "precipitation": 0.5285 }, { "dt": 1637206500, "precipitation": 0.6484 }, { "dt": 1637206560, "precipitation": 1.248 }, { "dt": 1637206620, "precipitation": 1.8476 }, { "dt": 1637206680, "precipitation": 2.4472 }, { "dt": 1637206740, "precipitation": 3.0467 }, { "dt": 1637206800, "precipitation": 3.6463 }, { "dt": 1637206860, "precipitation": 3.2722 }, { "dt": 1637206920, "precipitation": 2.8981 }, { "dt": 1637206980, "precipitation": 2.5239 }, { "dt": 1637207040, "precipitation": 2.1498 }, { "dt": 1637207100, "precipitation": 1.7756 }, { "dt": 1637207160, "precipitation": 1.5703 }, { "dt": 1637207220, "precipitation": 1.3649 }, { "dt": 1637207280, "precipitation": 1.1595 }, { "dt": 1637207340, "precipitation": 0.9542 }, { "dt": 1637207400, "precipitation": 0.7488 }, { "dt": 1637207460, "precipitation": 0.7287 }, { "dt": 1637207520, "precipitation": 0.7086 }, { "dt": 1637207580, "precipitation": 0.6886 }, { "dt": 1637207640, "precipitation": 0.6685 }, { "dt": 1637207700, "precipitation": 0.6484 }, { "dt": 1637207760, "precipitation": 0.7494 }, { "dt": 1637207820, "precipitation": 0.8503 }, { "dt": 1637207880, "precipitation": 0.9512 }, { "dt": 1637207940, "precipitation": 1.0521 }, { "dt": 1637208000, "precipitation": 1.1531 }, { "dt": 1637208060, "precipitation": 1.1222 }, { "dt": 1637208120, "precipitation": 1.0913 }, { "dt": 1637208180, "precipitation": 1.0603 }, { "dt": 1637208240, "precipitation": 1.0294 }, { "dt": 1637208300, "precipitation": 0.9985 }, { "dt": 1637208360, "precipitation": 1.0294 }, { "dt": 1637208420, "precipitation": 1.0603 }, { "dt": 1637208480, "precipitation": 1.0913 }, { "dt": 1637208540, "precipitation": 1.1222 }], "hourly": [{ "dt": 1637204400, "temp": 7.82, "feels_like": 4.47, "pressure": 1010, "humidity": 91, "dew_point": 6.44, "uvi": 0, "clouds": 90, "visibility": 10000, "wind_speed": 6, "wind_deg": 301, "wind_gust": 11.28, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.8 }, { "dt": 1637208000, "temp": 7.73, "feels_like": 4.59, "pressure": 1011, "humidity": 88, "dew_point": 5.87, "uvi": 0, "clouds": 92, "visibility": 10000, "wind_speed": 5.4, "wind_deg": 298, "wind_gust": 11.41, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }], "pop": 1, "rain": { "1h": 1.15 } }, { "dt": 1637211600, "temp": 7.61, "feels_like": 4.4, "pressure": 1012, "humidity": 84, "dew_point": 5.08, "uvi": 0, "clouds": 94, "visibility": 10000, "wind_speed": 5.48, "wind_deg": 305, "wind_gust": 12.15, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.8 }, { "dt": 1637215200, "temp": 7.4, "feels_like": 4.3, "pressure": 1013, "humidity": 80, "dew_point": 4.18, "uvi": 0, "clouds": 95, "visibility": 10000, "wind_speed": 5.09, "wind_deg": 285, "wind_gust": 11.07, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.8 }, { "dt": 1637218800, "temp": 7.34, "feels_like": 3.88, "pressure": 1014, "humidity": 73, "dew_point": 2.83, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 5.95, "wind_deg": 297, "wind_gust": 11.11, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637222400, "temp": 5.96, "feels_like": 2.19, "pressure": 1016, "humidity": 63, "dew_point": -0.49, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 5.8, "wind_deg": 295, "wind_gust": 11.48, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637226000, "temp": 5.23, "feels_like": 1.57, "pressure": 1016, "humidity": 66, "dew_point": -0.7, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 5.12, "wind_deg": 289, "wind_gust": 10.28, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.07 }, { "dt": 1637229600, "temp": 4.75, "feels_like": 1.3, "pressure": 1016, "humidity": 65, "dew_point": -1.4, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 4.45, "wind_deg": 289, "wind_gust": 9.86, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637233200, "temp": 4.14, "feels_like": 0.77, "pressure": 1017, "humidity": 66, "dew_point": -1.61, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 4.06, "wind_deg": 280, "wind_gust": 9.2, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637236800, "temp": 3.43, "feels_like": 0.16, "pressure": 1017, "humidity": 71, "dew_point": -1.38, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 3.64, "wind_deg": 264, "wind_gust": 8.45, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637240400, "temp": 3.38, "feels_like": -0.76, "pressure": 1018, "humidity": 69, "dew_point": -1.84, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 5.15, "wind_deg": 266, "wind_gust": 10.17, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637244000, "temp": 3.41, "feels_like": -1.08, "pressure": 1018, "humidity": 65, "dew_point": -2.68, "uvi": 0.24, "clouds": 100, "visibility": 10000, "wind_speed": 5.91, "wind_deg": 274, "wind_gust": 10.99, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637247600, "temp": 3.88, "feels_like": -0.74, "pressure": 1018, "humidity": 60, "dew_point": -3.12, "uvi": 0.68, "clouds": 99, "visibility": 10000, "wind_speed": 6.53, "wind_deg": 274, "wind_gust": 11.96, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637251200, "temp": 4.49, "feels_like": -0.3, "pressure": 1018, "humidity": 58, "dew_point": -3.09, "uvi": 1.16, "clouds": 99, "visibility": 10000, "wind_speed": 7.43, "wind_deg": 271, "wind_gust": 10.86, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637254800, "temp": 5.07, "feels_like": 0.19, "pressure": 1018, "humidity": 53, "dew_point": -3.88, "uvi": 1.53, "clouds": 99, "visibility": 10000, "wind_speed": 8.23, "wind_deg": 266, "wind_gust": 11.53, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637258400, "temp": 5.08, "feels_like": 0.03, "pressure": 1017, "humidity": 49, "dew_point": -4.9, "uvi": 1.56, "clouds": 90, "visibility": 10000, "wind_speed": 8.81, "wind_deg": 269, "wind_gust": 12.42, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637262000, "temp": 5.32, "feels_like": 0.41, "pressure": 1017, "humidity": 47, "dew_point": -5.03, "uvi": 1.17, "clouds": 69, "visibility": 10000, "wind_speed": 8.57, "wind_deg": 270, "wind_gust": 12.43, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637265600, "temp": 4.63, "feels_like": -0.43, "pressure": 1018, "humidity": 53, "dew_point": -4.16, "uvi": 0.71, "clouds": 76, "visibility": 10000, "wind_speed": 8.38, "wind_deg": 274, "wind_gust": 12.44, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637269200, "temp": 3.3, "feels_like": -1.96, "pressure": 1019, "humidity": 56, "dew_point": -4.59, "uvi": 0.3, "clouds": 75, "visibility": 10000, "wind_speed": 7.79, "wind_deg": 276, "wind_gust": 13.09, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637272800, "temp": 1.97, "feels_like": -3.43, "pressure": 1020, "humidity": 61, "dew_point": -4.7, "uvi": 0, "clouds": 80, "visibility": 10000, "wind_speed": 7.12, "wind_deg": 274, "wind_gust": 12.93, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637276400, "temp": 1.31, "feels_like": -4.06, "pressure": 1021, "humidity": 66, "dew_point": -4.33, "uvi": 0, "clouds": 84, "visibility": 10000, "wind_speed": 6.61, "wind_deg": 273, "wind_gust": 12.59, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637280000, "temp": 0.66, "feels_like": -4.77, "pressure": 1022, "humidity": 72, "dew_point": -3.78, "uvi": 0, "clouds": 86, "visibility": 10000, "wind_speed": 6.33, "wind_deg": 274, "wind_gust": 11.19, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637283600, "temp": -0.04, "feels_like": -5.09, "pressure": 1022, "humidity": 87, "dew_point": -2.03, "uvi": 0, "clouds": 84, "visibility": 10000, "wind_speed": 5.22, "wind_deg": 268, "wind_gust": 11.42, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.12 }, { "dt": 1637287200, "temp": -0.15, "feels_like": -5.34, "pressure": 1023, "humidity": 80, "dew_point": -3.21, "uvi": 0, "clouds": 92, "visibility": 10000, "wind_speed": 5.43, "wind_deg": 273, "wind_gust": 10.62, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.12 }, { "dt": 1637290800, "temp": -0.7, "feels_like": -5.93, "pressure": 1023, "humidity": 80, "dew_point": -3.79, "uvi": 0, "clouds": 95, "visibility": 10000, "wind_speed": 5.24, "wind_deg": 270, "wind_gust": 10.39, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637294400, "temp": -1.01, "feels_like": -6.33, "pressure": 1023, "humidity": 81, "dew_point": -3.91, "uvi": 0, "clouds": 85, "visibility": 10000, "wind_speed": 5.26, "wind_deg": 271, "wind_gust": 10.58, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637298000, "temp": -1.13, "feels_like": -6.53, "pressure": 1024, "humidity": 82, "dew_point": -3.9, "uvi": 0, "clouds": 73, "visibility": 10000, "wind_speed": 5.35, "wind_deg": 272, "wind_gust": 10.99, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637301600, "temp": -1.14, "feels_like": -6.63, "pressure": 1025, "humidity": 82, "dew_point": -3.95, "uvi": 0, "clouds": 74, "visibility": 10000, "wind_speed": 5.5, "wind_deg": 274, "wind_gust": 11.09, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637305200, "temp": -1.2, "feels_like": -6.68, "pressure": 1025, "humidity": 81, "dew_point": -4.09, "uvi": 0, "clouds": 31, "visibility": 10000, "wind_speed": 5.46, "wind_deg": 280, "wind_gust": 11.06, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637308800, "temp": -1.07, "feels_like": -6.51, "pressure": 1026, "humidity": 78, "dew_point": -4.54, "uvi": 0, "clouds": 37, "visibility": 10000, "wind_speed": 5.44, "wind_deg": 280, "wind_gust": 10.51, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637312400, "temp": -1.15, "feels_like": -6.62, "pressure": 1026, "humidity": 77, "dew_point": -4.68, "uvi": 0, "clouds": 42, "visibility": 10000, "wind_speed": 5.46, "wind_deg": 282, "wind_gust": 10.69, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637316000, "temp": -1.27, "feels_like": -6.77, "pressure": 1027, "humidity": 78, "dew_point": -4.66, "uvi": 0, "clouds": 34, "visibility": 10000, "wind_speed": 5.45, "wind_deg": 282, "wind_gust": 10.73, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637319600, "temp": -1.43, "feels_like": -6.62, "pressure": 1028, "humidity": 79, "dew_point": -4.66, "uvi": 0, "clouds": 30, "visibility": 10000, "wind_speed": 4.86, "wind_deg": 284, "wind_gust": 10.55, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637323200, "temp": -1.51, "feels_like": -6.57, "pressure": 1029, "humidity": 79, "dew_point": -4.68, "uvi": 0, "clouds": 26, "visibility": 10000, "wind_speed": 4.62, "wind_deg": 281, "wind_gust": 10.16, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637326800, "temp": -1.32, "feels_like": -6.17, "pressure": 1030, "humidity": 78, "dew_point": -4.63, "uvi": 0, "clouds": 7, "visibility": 10000, "wind_speed": 4.38, "wind_deg": 281, "wind_gust": 9.75, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637330400, "temp": -0.05, "feels_like": -5.06, "pressure": 1031, "humidity": 70, "dew_point": -4.8, "uvi": 0.24, "clouds": 7, "visibility": 10000, "wind_speed": 5.14, "wind_deg": 286, "wind_gust": 9.15, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637334000, "temp": 1.43, "feels_like": -3.08, "pressure": 1031, "humidity": 61, "dew_point": -5.34, "uvi": 0.7, "clouds": 6, "visibility": 10000, "wind_speed": 4.91, "wind_deg": 296, "wind_gust": 7.02, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637337600, "temp": 2.58, "feels_like": -1.4, "pressure": 1032, "humidity": 54, "dew_point": -5.86, "uvi": 1.25, "clouds": 6, "visibility": 10000, "wind_speed": 4.48, "wind_deg": 299, "wind_gust": 5.49, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637341200, "temp": 3.38, "feels_like": -0.11, "pressure": 1031, "humidity": 50, "dew_point": -6.2, "uvi": 1.64, "clouds": 7, "visibility": 10000, "wind_speed": 3.97, "wind_deg": 298, "wind_gust": 4.61, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637344800, "temp": 3.89, "feels_like": 1.05, "pressure": 1031, "humidity": 47, "dew_point": -6.36, "uvi": 1.67, "clouds": 20, "visibility": 10000, "wind_speed": 3.16, "wind_deg": 295, "wind_gust": 3.81, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "pop": 0 }, { "dt": 1637348400, "temp": 4.21, "feels_like": 1.77, "pressure": 1031, "humidity": 46, "dew_point": -6.41, "uvi": 1.18, "clouds": 93, "visibility": 10000, "wind_speed": 2.73, "wind_deg": 278, "wind_gust": 3.32, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637352000, "temp": 3.96, "feels_like": 1.45, "pressure": 1031, "humidity": 47, "dew_point": -6.37, "uvi": 0.71, "clouds": 96, "visibility": 10000, "wind_speed": 2.76, "wind_deg": 265, "wind_gust": 3.31, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637355600, "temp": 3.5, "feels_like": 1.73, "pressure": 1031, "humidity": 53, "dew_point": -5.28, "uvi": 0.29, "clouds": 98, "visibility": 10000, "wind_speed": 1.9, "wind_deg": 254, "wind_gust": 2.92, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637359200, "temp": 2.1, "feels_like": 0.22, "pressure": 1031, "humidity": 58, "dew_point": -5.35, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 1.81, "wind_deg": 239, "wind_gust": 1.79, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637362800, "temp": 0.94, "feels_like": -0.77, "pressure": 1031, "humidity": 62, "dew_point": -5.59, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 1.56, "wind_deg": 216, "wind_gust": 1.5, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637366400, "temp": 0.85, "feels_like": -1.76, "pressure": 1031, "humidity": 64, "dew_point": -5.2, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 2.26, "wind_deg": 189, "wind_gust": 2.19, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637370000, "temp": 0.39, "feels_like": -2.74, "pressure": 1031, "humidity": 69, "dew_point": -4.61, "uvi": 0, "clouds": 97, "visibility": 10000, "wind_speed": 2.68, "wind_deg": 188, "wind_gust": 3.53, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637373600, "temp": 0.63, "feels_like": -2.57, "pressure": 1031, "humidity": 72, "dew_point": -3.85, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 2.81, "wind_deg": 188, "wind_gust": 6.24, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }], "daily": [{ "dt": 1637168400, "sunrise": 1637152111, "sunset": 1637187110, "moonrise": 1637184660, "moonset": 1637145480, "moon_phase": 0.45, "temp": { "day": 13.7, "min": 3.69, "max": 14.34, "night": 7.73, "eve": 12.97, "morn": 7.71 }, "feels_like": { "day": 13.55, "night": 4.59, "eve": 12.7, "morn": 4.75 }, "pressure": 1010, "humidity": 93, "dew_point": 12.47, "wind_speed": 7.72, "wind_deg": 213, "wind_gust": 16.34, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 4.06, "uvi": 0.27 }, { "dt": 1637254800, "sunrise": 1637238585, "sunset": 1637273462, "moonrise": 1637272560, "moonset": 1637235600, "moon_phase": 0.48, "temp": { "day": 5.07, "min": -1.01, "max": 7.61, "night": -1.01, "eve": 1.31, "morn": 4.14 }, "feels_like": { "day": 0.19, "night": -6.33, "eve": -4.06, "morn": 0.77 }, "pressure": 1018, "humidity": 53, "dew_point": -3.88, "wind_speed": 8.81, "wind_deg": 269, "wind_gust": 13.09, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": 99, "pop": 0.8, "uvi": 1.56 }, { "dt": 1637341200, "sunrise": 1637325059, "sunset": 1637359817, "moonrise": 1637360640, "moonset": 1637325780, "moon_phase": 0.5, "temp": { "day": 3.38, "min": -1.51, "max": 4.21, "night": 0.05, "eve": 0.94, "morn": -1.43 }, "feels_like": { "day": -0.11, "night": -3.44, "eve": -0.77, "morn": -6.62 }, "pressure": 1031, "humidity": 50, "dew_point": -6.2, "wind_speed": 5.5, "wind_deg": 274, "wind_gust": 11.09, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": 7, "pop": 0, "uvi": 1.67 }, { "dt": 1637427600, "sunrise": 1637411532, "sunset": 1637446173, "moonrise": 1637449080, "moonset": 1637415900, "moon_phase": 0.54, "temp": { "day": 3.69, "min": -0.46, "max": 3.69, "night": 2.32, "eve": 2.04, "morn": -0.06 }, "feels_like": { "day": -0.22, "night": -0.6, "eve": -1.14, "morn": -4.01 }, "pressure": 1024, "humidity": 59, "dew_point": -3.57, "wind_speed": 5.1, "wind_deg": 184, "wind_gust": 11.25, "weather": [{ "id": 616, "main": "Snow", "description": "rain and snow", "icon": "13d" }], "clouds": 100, "pop": 0.2, "rain": 0.18, "snow": 0.19, "uvi": 0.86 }, { "dt": 1637514000, "sunrise": 1637498004, "sunset": 1637532532, "moonrise": 1637537880, "moonset": 1637505900, "moon_phase": 0.57, "temp": { "day": 4.89, "min": 2.56, "max": 6.21, "night": 4.45, "eve": 6, "morn": 2.88 }, "feels_like": { "day": 1.81, "night": 0.43, "eve": 2.03, "morn": -0.19 }, "pressure": 1012, "humidity": 99, "dew_point": 4.64, "wind_speed": 6.36, "wind_deg": 274, "wind_gust": 12.13, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 5.73, "uvi": 0.18 }, { "dt": 1637600400, "sunrise": 1637584476, "sunset": 1637618893, "moonrise": 1637627160, "moonset": 1637595600, "moon_phase": 0.6, "temp": { "day": 0.16, "min": -2.58, "max": 2.8, "night": -2.12, "eve": -2.18, "morn": -2.58 }, "feels_like": { "day": -6.4, "night": -8.18, "eve": -8.09, "morn": -9.17 }, "pressure": 1014, "humidity": 45, "dew_point": -10.36, "wind_speed": 8.77, "wind_deg": 301, "wind_gust": 12.96, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": 84, "pop": 0, "uvi": 1 }, { "dt": 1637686800, "sunrise": 1637670947, "sunset": 1637705255, "moonrise": 1637716800, "moonset": 1637685000, "moon_phase": 0.63, "temp": { "day": 2.84, "min": -2.46, "max": 2.84, "night": -1.89, "eve": -1.32, "morn": -2.46 }, "feels_like": { "day": -1.57, "night": -4.95, "eve": -4.81, "morn": -8.43 }, "pressure": 1021, "humidity": 55, "dew_point": -5.42, "wind_speed": 6.14, "wind_deg": 307, "wind_gust": 12.56, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": 33, "pop": 0, "uvi": 1 }, { "dt": 1637773200, "sunrise": 1637757418, "sunset": 1637791620, "moonrise": 1637806860, "moonset": 1637773920, "moon_phase": 0.66, "temp": { "day": 2.66, "min": -2.03, "max": 2.71, "night": 0.83, "eve": 0.89, "morn": -1.57 }, "feels_like": { "day": -1.43, "night": -3.46, "eve": -3.08, "morn": -5.22 }, "pressure": 1018, "humidity": 53, "dew_point": -5.91, "wind_speed": 4.75, "wind_deg": 182, "wind_gust": 11.89, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 100, "pop": 0.2, "rain": 0.11, "uvi": 1 }] }
  app.airQualityJson = { "coord": { "lon": -83.7518, "lat": 42.273 }, "list": [{ "main": { "aqi": 1 }, "components": { "co": 293.73, "no": 0, "no2": 5.66, "o3": 54.36, "so2": 0.75, "pm2_5": 4.64, "pm10": 4.91, "nh3": 0.08 }, "dt": 1637204400 }] }

})
