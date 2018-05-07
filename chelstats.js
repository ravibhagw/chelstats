// Chelstats v1.0
var https = require('https');


const baseUrl = 'https://www.easports.com/iframe/nhl14proclubs/api/platforms';
var platformSelector = {
    "PS4":"ps4",
    "Xbox":"xboxone"
};




function getDetailedClubStats(clubName, platform, callback) {
    this.getClubId(clubName, platformSelector.Xbox, function(res) {
        var url = baseUrl+'/'+platform+'/clubs/'+res+'/stats';
        https.get(url, function(res){
            res.on("data", function(chunk) {
                var myData = JSON.parse(chunk);
                callback(myData);
            });
        });
    });
}

function getClubStats(clubName, platform, callback) {
    var url = baseUrl+'/'+platform+'/clubsComplete/'+clubName;
    https.get(url, function(res) {
        res.on("data", function(chunk) {
            var myData = JSON.parse(chunk);
            callback(myData);
        });
    }).on('error', function(e){
        console.log('error');
    });
}

function getClubId(clubName, platform, callback) {
    var url = baseUrl+'/xboxone/clubsComplete/'+clubName;
    https.get(url, function(res) {
        res.on("data", function(chunk) {
            var myData = JSON.parse(chunk);
            callback(Object.keys(myData.raw)[0]);
        });
    }).on('error', function(e){
        console.log('error');
    });
}

getClubId('megaforce',platformSelector.Xbox, function(res){
    console.log(res);
});