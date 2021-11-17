
const State = {
    AVAILABLE: 1, // USER DIDN'T CHOOSE IT AS BUSY AND GOOD WEATHER
    BUSY: 2, // USER CHOOSE IT AS BUSY
    UNAVAILABLE: 3, // BAD WEATHER
};
Object.freeze(State);

var resultView = new Vue({
    el: '#app',
    data: {
        location: '', // e.g. Ann Arbor, MI
        locationResults: [], // e.g. places recommendation for Ann Arbor
        rawResults: null,
        weatherResults: [], // e.g. Ann Arbor weather for today and next 6 days
        dateArray:[], // e.g.["Nov.17 W","Nov.18 TH","Nov.19 F","Nov.20 SAT","Nov.21 SUN",...]

        schedule:{
            // today
            "0":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            // tomorrow
            "1":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            // the day after tomorrow
            "2":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            "3":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            "4":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            "5":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
            "6":[State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE,State.AVAILABLE],
        },


    },
    methods: {
        /**
         * get the weather forecast data for today and next 6 days from an API
         * process rawResults and store useful data in weather
         * @param {*} e 
         */
        getWeather: function(e) {
            // if (e.keyCode == 13) {
            //     let req_str = "...&term=" + encodeURI(this.artistName);
            //     axios
            //         .get(req_str)
            //         .then(response => (this.rawResults = response))
            //         .then(() => {
            //             this.allResults = [];
            //             let itunesResults = this.rawResults.data.results;
            //             for (let i = 0; i < itunesResults.length; i++) {
            //                 let resultRow = {
            //                     artistName: "No information provided",
            //                     collectionName: "No information provided",
            //                     kind: "No information provided",
            //                     country: "No information provided",
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("artistName")) {
            //                     if (!(itunesResults[i].artistName === "")) {
            //                         resultRow.artistName = itunesResults[i].artistName;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("trackCensoredName")) {
            //                     if (!(itunesResults[i].trackCensoredName === "")) {
            //                         resultRow.trackCensoredName = itunesResults[i].trackCensoredName;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("collectionName")) {
            //                     if (!(itunesResults[i].collectionName === "")) {
            //                         resultRow.collectionName = itunesResults[i].collectionName;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("previewUrl")) {
            //                     if (!(itunesResults[i].previewUrl === "")) {
            //                         resultRow.previewUrl = itunesResults[i].previewUrl;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("kind")) {
            //                     if (!(itunesResults[i].kind === "")) {
            //                         resultRow.kind = itunesResults[i].kind;
            //                     }
            //                 }
            //                 if (!this.genres.includes(resultRow.genre)) {
            //                     let obj = {};
            //                     obj["name"] = resultRow.genre;
            //                     obj["isSelected"] = false;
            //                     obj["filterResults"] = [];
            //                     this.realGenres.push(obj);
            //                     this.genres.push(resultRow.genre);

            //                 }

            //                 this.allResults.push(resultRow);
            //                 idx = this.getGenreIdx(resultRow.genre);
            //                 this.realGenres[idx]["filterResults"].push(resultRow);
            //             }
            //             this.sortedResults = JSON.parse(JSON.stringify(this.allResults));
            //         })
            //         .catch(error => {
            //             console.log("error!");
            //             console.log(error);
            //         })
            // }
        },
        /**
         * onclick handler when user clicks a time cell
         * modify this.schedule 
         * 
         * @param {*} e 
         */
        clickCell: function(e) {
        },
        /**
         * get the location data from an API
         * process rawResults and store useful data in weather
         * @param {*} e 
         */
        getLocation: function(e) {
        },
        /**
         * get the dateArray based on today's date
         * @param {*} e 
         */
        getDateArray: function(e) {
        }
    }
})