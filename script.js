var resultView = new Vue({
    el: '#app',
    data: {

    },
    methods: {
        getWeather: function(e) {
            // if (e.keyCode == 13) {
            //     this.isLoading = true;
            //     let req_str = "https://itunes.apple.com/search?attribute=allArtistTerm&origin=*&term=" + encodeURI(this.artistName);
            //     axios
            //         .get(req_str)
            //         .then(response => (this.rawResults = response))
            //         .then(() => {
            //             this.allResults = [];
            //             this.sortedResults = [];
            //             this.genres = [];
            //             this.realGenres = [];
            //             console.log("success! print raw results returned by API:");
            //             console.log(this.rawResults);
            //             if (this.rawResults.data.resultCount == 0) {
            //                 alert("No artist was found with the keyword.");
            //                 return;
            //             }
            //             let itunesResults = this.rawResults.data.results;
            //             for (let i = 0; i < itunesResults.length; i++) {
            //                 let resultRow = {
            //                     artistName: "No information provided",
            //                     collectionName: "No information provided",
            //                     kind: "No information provided",
            //                     country: "No information provided",
            //                     trackId: "No information provided",
            //                     previewUrl: "",
            //                     genre: "No information provided",
            //                     trackPrice: 0,
            //                     imageUrl: "",
            //                     isPlay: false,
            //                     trackCensoredName: "No information provided",
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
            //                 if (itunesResults[i].hasOwnProperty("country")) {
            //                     if (!(itunesResults[i].country === "")) {
            //                         resultRow.country = itunesResults[i].country;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("primaryGenreName")) {
            //                     if (!(itunesResults[i].primaryGenreName === "")) {
            //                         resultRow.genre = itunesResults[i].primaryGenreName;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty("trackId")) {
            //                     if (!(itunesResults[i].trackId === "")) {
            //                         resultRow.trackId = itunesResults[i].trackId;
            //                     }
            //                 }
            //                 if (itunesResults[i].hasOwnProperty('trackPrice')) {
            //                     resultRow.trackPrice = itunesResults[i].trackPrice;
            //                 }
            //                 if (itunesResults[i].hasOwnProperty('artworkUrl100')) {
            //                     resultRow.imageUrl = itunesResults[i].artworkUrl100;
            //                 } else if (itunesResults[i].hasOwnProperty('artworkUrl60')) {
            //                     resultRow.imageUrl = itunesResults[i].artworkUrl60;
            //                 } else if (itunesResults[i].hasOwnProperty('artworkUrl30')) {
            //                     resultRow.imageUrl = itunesResults[i].artworkUrl30;
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
            //             this.totalFound = this.allResults.length;
            //             console.log("print processed results:");
            //             console.log(this.sortedResults);
            //             console.log(this.realGenres);
            //             this.isLoading = false;
            //         })
            //         .catch(error => {
            //             console.log("error!");
            //             console.log(error);
            //         })
            // }
        },
    }
})