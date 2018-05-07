// Chelstats v1.0
var https = require('https');


const baseUrl = 'https://www.easports.com/iframe/nhl14proclubs/api/platforms';
var platformSelector = {
    "PS4":1,
    "XboxOne":2
};


function getClubId(clubName, platform) {
    getasync(baseUrl+'/xboxone/clubsComplete/'+clubName, platform);
}


function getasync(url) {
    return https.get(url, function(error,response,body) {
        if(error) {
                console.log(error);
        } else {
                console.log(response);
        }
    });
}


console.log(getClubId('megaforce','xboxone'));