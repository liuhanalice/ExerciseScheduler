const State = {
  AVAILABLE: 1, // USER DIDN'T CHOOSE IT AS BUSY AND GOOD WEATHER
  BUSY: 2, // USER CHOOSE IT AS BUSY
  UNAVAILABLE: 3, // BAD WEATHER
};
Object.freeze(State);

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
app.weatherJson = { "data": { "lat": 42.273, "lon": -83.7518, "timezone": "America/Detroit", "timezone_offset": -18000, "current": { "dt": 1637197508, "sunrise": 1637152111, "sunset": 1637187110, "temp": 286.73, "feels_like": 286.55, "pressure": 1008, "humidity": 92, "dew_point": 285.46, "uvi": 0, "clouds": 90, "visibility": 4023, "wind_speed": 4.47, "wind_deg": 224, "wind_gust": 8.49, "weather": [{ "id": 701, "main": "Mist", "description": "mist", "icon": "50n" }, { "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "rain": { "1h": 0.49 } }, "minutely": [{ "dt": 1637197560, "precipitation": 0.4619 }, { "dt": 1637197620, "precipitation": 0.4376 }, { "dt": 1637197680, "precipitation": 0.4133 }, { "dt": 1637197740, "precipitation": 0.389 }, { "dt": 1637197800, "precipitation": 0.3646 }, { "dt": 1637197860, "precipitation": 0.3549 }, { "dt": 1637197920, "precipitation": 0.3451 }, { "dt": 1637197980, "precipitation": 0.3353 }, { "dt": 1637198040, "precipitation": 0.3255 }, { "dt": 1637198100, "precipitation": 0.3158 }, { "dt": 1637198160, "precipitation": 0.2792 }, { "dt": 1637198220, "precipitation": 0.2427 }, { "dt": 1637198280, "precipitation": 0.2062 }, { "dt": 1637198340, "precipitation": 0.1697 }, { "dt": 1637198400, "precipitation": 0.1332 }, { "dt": 1637198460, "precipitation": 0.1149 }, { "dt": 1637198520, "precipitation": 0 }, { "dt": 1637198580, "precipitation": 0 }, { "dt": 1637198640, "precipitation": 0 }, { "dt": 1637198700, "precipitation": 0 }, { "dt": 1637198760, "precipitation": 0 }, { "dt": 1637198820, "precipitation": 0 }, { "dt": 1637198880, "precipitation": 0 }, { "dt": 1637198940, "precipitation": 0 }, { "dt": 1637199000, "precipitation": 0 }, { "dt": 1637199060, "precipitation": 0 }, { "dt": 1637199120, "precipitation": 0 }, { "dt": 1637199180, "precipitation": 0 }, { "dt": 1637199240, "precipitation": 0 }, { "dt": 1637199300, "precipitation": 0 }, { "dt": 1637199360, "precipitation": 0 }, { "dt": 1637199420, "precipitation": 0 }, { "dt": 1637199480, "precipitation": 0 }, { "dt": 1637199540, "precipitation": 0 }, { "dt": 1637199600, "precipitation": 0 }, { "dt": 1637199660, "precipitation": 0 }, { "dt": 1637199720, "precipitation": 0 }, { "dt": 1637199780, "precipitation": 0 }, { "dt": 1637199840, "precipitation": 0 }, { "dt": 1637199900, "precipitation": 0 }, { "dt": 1637199960, "precipitation": 0 }, { "dt": 1637200020, "precipitation": 0 }, { "dt": 1637200080, "precipitation": 0 }, { "dt": 1637200140, "precipitation": 0 }, { "dt": 1637200200, "precipitation": 0 }, { "dt": 1637200260, "precipitation": 0 }, { "dt": 1637200320, "precipitation": 0 }, { "dt": 1637200380, "precipitation": 0 }, { "dt": 1637200440, "precipitation": 0 }, { "dt": 1637200500, "precipitation": 0 }, { "dt": 1637200560, "precipitation": 0 }, { "dt": 1637200620, "precipitation": 0 }, { "dt": 1637200680, "precipitation": 0 }, { "dt": 1637200740, "precipitation": 0 }, { "dt": 1637200800, "precipitation": 0 }, { "dt": 1637200860, "precipitation": 0.2334 }, { "dt": 1637200920, "precipitation": 0.4247 }, { "dt": 1637200980, "precipitation": 0.616 }, { "dt": 1637201040, "precipitation": 0.8072 }, { "dt": 1637201100, "precipitation": 0.9985 }, { "dt": 1637201160, "precipitation": 1.1539 }], "hourly": [{ "dt": 1637197200, "temp": 286.73, "feels_like": 286.55, "pressure": 1008, "humidity": 92, "dew_point": 285.46, "uvi": 0, "clouds": 90, "visibility": 9945, "wind_speed": 6.54, "wind_deg": 295, "wind_gust": 9.55, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "pop": 0.92, "rain": { "1h": 0.49 } }, { "dt": 1637200800, "temp": 285.89, "feels_like": 285.57, "pressure": 1009, "humidity": 90, "dew_point": 284.29, "uvi": 0, "clouds": 92, "visibility": 10000, "wind_speed": 6.81, "wind_deg": 302, "wind_gust": 11.55, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.8 }, { "dt": 1637204400, "temp": 284.5, "feels_like": 283.99, "pressure": 1010, "humidity": 88, "dew_point": 282.59, "uvi": 0, "clouds": 94, "visibility": 10000, "wind_speed": 6, "wind_deg": 301, "wind_gust": 11.28, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "pop": 1, "rain": { "1h": 0.24 } }, { "dt": 1637208000, "temp": 283.01, "feels_like": 280.42, "pressure": 1011, "humidity": 84, "dew_point": 280.44, "uvi": 0, "clouds": 96, "visibility": 10000, "wind_speed": 5.4, "wind_deg": 298, "wind_gust": 11.41, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "pop": 1, "rain": { "1h": 0.53 } }, { "dt": 1637211600, "temp": 281.7, "feels_like": 278.74, "pressure": 1013, "humidity": 77, "dew_point": 277.9, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 5.48, "wind_deg": 305, "wind_gust": 12.15, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }], "pop": 1, "rain": { "1h": 0.17 } }, { "dt": 1637215200, "temp": 280.27, "feels_like": 277.1, "pressure": 1015, "humidity": 74, "dew_point": 275.97, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 5.09, "wind_deg": 285, "wind_gust": 11.07, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.8 }, { "dt": 1637218800, "temp": 280.37, "feels_like": 276.88, "pressure": 1015, "humidity": 69, "dew_point": 274.94, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 5.95, "wind_deg": 297, "wind_gust": 11.11, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637222400, "temp": 279.11, "feels_like": 275.34, "pressure": 1016, "humidity": 63, "dew_point": 272.66, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 5.8, "wind_deg": 295, "wind_gust": 11.48, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637226000, "temp": 278.38, "feels_like": 274.72, "pressure": 1016, "humidity": 66, "dew_point": 272.45, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 5.12, "wind_deg": 289, "wind_gust": 10.28, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.07 }, { "dt": 1637229600, "temp": 277.9, "feels_like": 274.45, "pressure": 1016, "humidity": 65, "dew_point": 271.75, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 4.45, "wind_deg": 289, "wind_gust": 9.86, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637233200, "temp": 277.29, "feels_like": 273.92, "pressure": 1017, "humidity": 66, "dew_point": 271.54, "uvi": 0, "clouds": 99, "visibility": 10000, "wind_speed": 4.06, "wind_deg": 280, "wind_gust": 9.2, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637236800, "temp": 276.58, "feels_like": 273.31, "pressure": 1017, "humidity": 71, "dew_point": 271.77, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 3.64, "wind_deg": 264, "wind_gust": 8.45, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637240400, "temp": 276.53, "feels_like": 272.39, "pressure": 1018, "humidity": 69, "dew_point": 271.31, "uvi": 0, "clouds": 100, "visibility": 10000, "wind_speed": 5.15, "wind_deg": 266, "wind_gust": 10.17, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637244000, "temp": 276.56, "feels_like": 272.07, "pressure": 1018, "humidity": 65, "dew_point": 270.47, "uvi": 0.24, "clouds": 100, "visibility": 10000, "wind_speed": 5.91, "wind_deg": 274, "wind_gust": 10.99, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637247600, "temp": 277.03, "feels_like": 272.41, "pressure": 1018, "humidity": 60, "dew_point": 270.03, "uvi": 0.68, "clouds": 99, "visibility": 10000, "wind_speed": 6.53, "wind_deg": 274, "wind_gust": 11.96, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637251200, "temp": 277.64, "feels_like": 272.85, "pressure": 1018, "humidity": 58, "dew_point": 270.06, "uvi": 1.16, "clouds": 99, "visibility": 10000, "wind_speed": 7.43, "wind_deg": 271, "wind_gust": 10.86, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637254800, "temp": 278.22, "feels_like": 273.34, "pressure": 1018, "humidity": 53, "dew_point": 269.27, "uvi": 1.53, "clouds": 99, "visibility": 10000, "wind_speed": 8.23, "wind_deg": 266, "wind_gust": 11.53, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637258400, "temp": 278.23, "feels_like": 273.18, "pressure": 1017, "humidity": 49, "dew_point": 268.25, "uvi": 1.56, "clouds": 90, "visibility": 10000, "wind_speed": 8.81, "wind_deg": 269, "wind_gust": 12.42, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637262000, "temp": 278.47, "feels_like": 273.56, "pressure": 1017, "humidity": 47, "dew_point": 268.12, "uvi": 1.17, "clouds": 69, "visibility": 10000, "wind_speed": 8.57, "wind_deg": 270, "wind_gust": 12.43, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637265600, "temp": 277.78, "feels_like": 272.72, "pressure": 1018, "humidity": 53, "dew_point": 268.99, "uvi": 0.71, "clouds": 76, "visibility": 10000, "wind_speed": 8.38, "wind_deg": 274, "wind_gust": 12.44, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637269200, "temp": 276.45, "feels_like": 271.19, "pressure": 1019, "humidity": 56, "dew_point": 268.56, "uvi": 0.3, "clouds": 75, "visibility": 10000, "wind_speed": 7.79, "wind_deg": 276, "wind_gust": 13.09, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637272800, "temp": 275.12, "feels_like": 269.72, "pressure": 1020, "humidity": 61, "dew_point": 268.45, "uvi": 0, "clouds": 80, "visibility": 10000, "wind_speed": 7.12, "wind_deg": 274, "wind_gust": 12.93, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637276400, "temp": 274.46, "feels_like": 269.09, "pressure": 1021, "humidity": 66, "dew_point": 268.82, "uvi": 0, "clouds": 84, "visibility": 10000, "wind_speed": 6.61, "wind_deg": 273, "wind_gust": 12.59, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637280000, "temp": 273.81, "feels_like": 268.38, "pressure": 1022, "humidity": 72, "dew_point": 269.37, "uvi": 0, "clouds": 86, "visibility": 10000, "wind_speed": 6.33, "wind_deg": 274, "wind_gust": 11.19, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637283600, "temp": 273.11, "feels_like": 268.06, "pressure": 1022, "humidity": 87, "dew_point": 271.12, "uvi": 0, "clouds": 84, "visibility": 10000, "wind_speed": 5.22, "wind_deg": 268, "wind_gust": 11.42, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0.12 }, { "dt": 1637287200, "temp": 273, "feels_like": 267.81, "pressure": 1023, "humidity": 80, "dew_point": 269.94, "uvi": 0, "clouds": 92, "visibility": 10000, "wind_speed": 5.43, "wind_deg": 273, "wind_gust": 10.62, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.12 }, { "dt": 1637290800, "temp": 272.45, "feels_like": 267.22, "pressure": 1023, "humidity": 80, "dew_point": 269.36, "uvi": 0, "clouds": 95, "visibility": 10000, "wind_speed": 5.24, "wind_deg": 270, "wind_gust": 10.39, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0.04 }, { "dt": 1637294400, "temp": 272.14, "feels_like": 266.82, "pressure": 1023, "humidity": 81, "dew_point": 269.24, "uvi": 0, "clouds": 85, "visibility": 10000, "wind_speed": 5.26, "wind_deg": 271, "wind_gust": 10.58, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637298000, "temp": 272.02, "feels_like": 266.62, "pressure": 1024, "humidity": 82, "dew_point": 269.25, "uvi": 0, "clouds": 73, "visibility": 10000, "wind_speed": 5.35, "wind_deg": 272, "wind_gust": 10.99, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637301600, "temp": 272.01, "feels_like": 266.52, "pressure": 1025, "humidity": 82, "dew_point": 269.2, "uvi": 0, "clouds": 74, "visibility": 10000, "wind_speed": 5.5, "wind_deg": 274, "wind_gust": 11.09, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637305200, "temp": 271.95, "feels_like": 266.47, "pressure": 1025, "humidity": 81, "dew_point": 269.06, "uvi": 0, "clouds": 31, "visibility": 10000, "wind_speed": 5.46, "wind_deg": 280, "wind_gust": 11.06, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637308800, "temp": 272.08, "feels_like": 266.64, "pressure": 1026, "humidity": 78, "dew_point": 268.61, "uvi": 0, "clouds": 37, "visibility": 10000, "wind_speed": 5.44, "wind_deg": 280, "wind_gust": 10.51, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637312400, "temp": 272, "feels_like": 266.53, "pressure": 1026, "humidity": 77, "dew_point": 268.47, "uvi": 0, "clouds": 42, "visibility": 10000, "wind_speed": 5.46, "wind_deg": 282, "wind_gust": 10.69, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637316000, "temp": 271.88, "feels_like": 266.38, "pressure": 1027, "humidity": 78, "dew_point": 268.49, "uvi": 0, "clouds": 34, "visibility": 10000, "wind_speed": 5.45, "wind_deg": 282, "wind_gust": 10.73, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637319600, "temp": 271.72, "feels_like": 266.53, "pressure": 1028, "humidity": 79, "dew_point": 268.49, "uvi": 0, "clouds": 30, "visibility": 10000, "wind_speed": 4.86, "wind_deg": 284, "wind_gust": 10.55, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637323200, "temp": 271.64, "feels_like": 266.58, "pressure": 1029, "humidity": 79, "dew_point": 268.47, "uvi": 0, "clouds": 26, "visibility": 10000, "wind_speed": 4.62, "wind_deg": 281, "wind_gust": 10.16, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }], "pop": 0 }, { "dt": 1637326800, "temp": 271.83, "feels_like": 266.98, "pressure": 1030, "humidity": 78, "dew_point": 268.52, "uvi": 0, "clouds": 7, "visibility": 10000, "wind_speed": 4.38, "wind_deg": 281, "wind_gust": 9.75, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637330400, "temp": 273.1, "feels_like": 268.09, "pressure": 1031, "humidity": 70, "dew_point": 268.35, "uvi": 0.24, "clouds": 7, "visibility": 10000, "wind_speed": 5.14, "wind_deg": 286, "wind_gust": 9.15, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637334000, "temp": 274.58, "feels_like": 270.07, "pressure": 1031, "humidity": 61, "dew_point": 267.81, "uvi": 0.7, "clouds": 6, "visibility": 10000, "wind_speed": 4.91, "wind_deg": 296, "wind_gust": 7.02, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637337600, "temp": 275.73, "feels_like": 271.75, "pressure": 1032, "humidity": 54, "dew_point": 267.29, "uvi": 1.25, "clouds": 6, "visibility": 10000, "wind_speed": 4.48, "wind_deg": 299, "wind_gust": 5.49, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637341200, "temp": 276.53, "feels_like": 273.04, "pressure": 1031, "humidity": 50, "dew_point": 266.95, "uvi": 1.64, "clouds": 7, "visibility": 10000, "wind_speed": 3.97, "wind_deg": 298, "wind_gust": 4.61, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "pop": 0 }, { "dt": 1637344800, "temp": 277.04, "feels_like": 274.2, "pressure": 1031, "humidity": 47, "dew_point": 266.79, "uvi": 1.67, "clouds": 20, "visibility": 10000, "wind_speed": 3.16, "wind_deg": 295, "wind_gust": 3.81, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }], "pop": 0 }, { "dt": 1637348400, "temp": 277.36, "feels_like": 274.92, "pressure": 1031, "humidity": 46, "dew_point": 266.74, "uvi": 1.18, "clouds": 93, "visibility": 10000, "wind_speed": 2.73, "wind_deg": 278, "wind_gust": 3.32, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637352000, "temp": 277.11, "feels_like": 274.6, "pressure": 1031, "humidity": 47, "dew_point": 266.78, "uvi": 0.71, "clouds": 96, "visibility": 10000, "wind_speed": 2.76, "wind_deg": 265, "wind_gust": 3.31, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637355600, "temp": 276.65, "feels_like": 274.88, "pressure": 1031, "humidity": 53, "dew_point": 267.87, "uvi": 0.29, "clouds": 98, "visibility": 10000, "wind_speed": 1.9, "wind_deg": 254, "wind_gust": 2.92, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637359200, "temp": 275.25, "feels_like": 273.37, "pressure": 1031, "humidity": 58, "dew_point": 267.8, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 1.81, "wind_deg": 239, "wind_gust": 1.79, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "pop": 0 }, { "dt": 1637362800, "temp": 274.09, "feels_like": 272.38, "pressure": 1031, "humidity": 62, "dew_point": 267.56, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 1.56, "wind_deg": 216, "wind_gust": 1.5, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }, { "dt": 1637366400, "temp": 274, "feels_like": 271.39, "pressure": 1031, "humidity": 64, "dew_point": 267.95, "uvi": 0, "clouds": 98, "visibility": 10000, "wind_speed": 2.26, "wind_deg": 189, "wind_gust": 2.19, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "pop": 0 }], "daily": [{ "dt": 1637168400, "sunrise": 1637152111, "sunset": 1637187110, "moonrise": 1637184660, "moonset": 1637145480, "moon_phase": 0.45, "temp": { "day": 286.85, "min": 276.84, "max": 287.49, "night": 283.01, "eve": 287, "morn": 280.86 }, "feels_like": { "day": 286.7, "night": 280.42, "eve": 286.82, "morn": 277.9 }, "pressure": 1010, "humidity": 93, "dew_point": 285.62, "wind_speed": 7.72, "wind_deg": 213, "wind_gust": 16.34, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 2.1, "uvi": 0.27 }, { "dt": 1637254800, "sunrise": 1637238585, "sunset": 1637273462, "moonrise": 1637272560, "moonset": 1637235600, "moon_phase": 0.48, "temp": { "day": 278.22, "min": 272.14, "max": 281.7, "night": 272.14, "eve": 274.46, "morn": 277.29 }, "feels_like": { "day": 273.34, "night": 266.82, "eve": 269.09, "morn": 273.92 }, "pressure": 1018, "humidity": 53, "dew_point": 269.27, "wind_speed": 8.81, "wind_deg": 269, "wind_gust": 13.09, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 99, "pop": 1, "rain": 0.17, "uvi": 1.56 }, { "dt": 1637341200, "sunrise": 1637325059, "sunset": 1637359817, "moonrise": 1637360640, "moonset": 1637325780, "moon_phase": 0.5, "temp": { "day": 276.53, "min": 271.64, "max": 277.36, "night": 273.2, "eve": 274.09, "morn": 271.72 }, "feels_like": { "day": 273.04, "night": 269.71, "eve": 272.38, "morn": 266.53 }, "pressure": 1031, "humidity": 50, "dew_point": 266.95, "wind_speed": 5.5, "wind_deg": 274, "wind_gust": 11.09, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": 7, "pop": 0, "uvi": 1.67 }, { "dt": 1637427600, "sunrise": 1637411532, "sunset": 1637446173, "moonrise": 1637449080, "moonset": 1637415900, "moon_phase": 0.54, "temp": { "day": 276.84, "min": 272.69, "max": 276.84, "night": 275.47, "eve": 275.19, "morn": 273.09 }, "feels_like": { "day": 272.93, "night": 272.55, "eve": 272.01, "morn": 269.14 }, "pressure": 1024, "humidity": 59, "dew_point": 269.58, "wind_speed": 5.1, "wind_deg": 184, "wind_gust": 11.25, "weather": [{ "id": 616, "main": "Snow", "description": "rain and snow", "icon": "13d" }], "clouds": 100, "pop": 0.2, "rain": 0.18, "snow": 0.19, "uvi": 0.86 }, { "dt": 1637514000, "sunrise": 1637498004, "sunset": 1637532532, "moonrise": 1637537880, "moonset": 1637505900, "moon_phase": 0.57, "temp": { "day": 278.04, "min": 275.71, "max": 279.36, "night": 277.6, "eve": 279.15, "morn": 276.03 }, "feels_like": { "day": 274.96, "night": 273.58, "eve": 275.18, "morn": 272.96 }, "pressure": 1012, "humidity": 99, "dew_point": 277.79, "wind_speed": 6.36, "wind_deg": 274, "wind_gust": 12.13, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 1, "rain": 5.73, "uvi": 0.18 }, { "dt": 1637600400, "sunrise": 1637584476, "sunset": 1637618893, "moonrise": 1637627160, "moonset": 1637595600, "moon_phase": 0.6, "temp": { "day": 273.31, "min": 270.57, "max": 275.95, "night": 271.03, "eve": 270.97, "morn": 270.57 }, "feels_like": { "day": 266.75, "night": 264.97, "eve": 265.06, "morn": 263.98 }, "pressure": 1014, "humidity": 45, "dew_point": 262.79, "wind_speed": 8.77, "wind_deg": 301, "wind_gust": 12.96, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "clouds": 84, "pop": 0, "uvi": 1 }, { "dt": 1637686800, "sunrise": 1637670947, "sunset": 1637705255, "moonrise": 1637716800, "moonset": 1637685000, "moon_phase": 0.63, "temp": { "day": 275.99, "min": 270.69, "max": 275.99, "night": 271.26, "eve": 271.83, "morn": 270.69 }, "feels_like": { "day": 271.58, "night": 268.2, "eve": 268.34, "morn": 264.72 }, "pressure": 1021, "humidity": 55, "dew_point": 267.73, "wind_speed": 6.14, "wind_deg": 307, "wind_gust": 12.56, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "clouds": 33, "pop": 0, "uvi": 1 }, { "dt": 1637773200, "sunrise": 1637757418, "sunset": 1637791620, "moonrise": 1637806860, "moonset": 1637773920, "moon_phase": 0.66, "temp": { "day": 275.81, "min": 271.12, "max": 275.86, "night": 273.98, "eve": 274.04, "morn": 271.58 }, "feels_like": { "day": 271.72, "night": 269.69, "eve": 270.07, "morn": 267.93 }, "pressure": 1018, "humidity": 53, "dew_point": 267.24, "wind_speed": 4.75, "wind_deg": 182, "wind_gust": 11.89, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 100, "pop": 0.2, "rain": 0.11, "uvi": 1 }] }, "status": 200, "statusText": "OK", "headers": { "content-length": "20408", "content-type": "application/json; charset=utf-8" }, "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "transformRequest": [null], "transformResponse": [null], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "headers": { "Accept": "application/json, text/plain, */*" }, "params": { "lat": 42.2730207, "lon": -83.7517747, "appid": "c4c7af9e9a69dea63fae309d300dab02" }, "method": "get", "url": "https://api.openweathermap.org/data/2.5/onecall" }, "request": {} }
app.airQualityJson = { "coord": { "lon": -83.7518, "lat": 42.273 }, "list": [{ "main": { "aqi": 1 }, "components": { "co": 300.41, "no": 0, "no2": 6.77, "o3": 45.78, "so2": 1.03, "pm2_5": 5.38, "pm10": 5.56, "nh3": 0.07 }, "dt": 1637200800 }] }
