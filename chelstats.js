// Chelstats v1.0
var https = require('https');


const baseUrl = 'https://www.easports.com/iframe/nhl14proclubs/api/platforms';
var platformSelector = {
    "PS4":"ps4",
    "Xbox":"xboxone"
};

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



function getDetailedClubStats(clubName, platform, callback) {
    getClubId(clubName, platformSelector.Xbox, function(clubId) {
        var url = baseUrl+'/'+platform+'/clubs/'+clubId+'/stats';
        https.get(url, function(res){
            res.on("data", function(chunk) {
                var myData = JSON.parse(chunk);
                callback(myData.raw[clubId]);
            });
        });
    });
}

function getClubStats(clubName, platform, callback) {
    var url = baseUrl+'/'+platform+'/clubsComplete/'+clubName;
    https.get(url, function(res) {
        res.on("data", function(chunk) {
            var myData = JSON.parse(chunk);
            callback(myData.raw);
        });
    }).on('error', function(e){
        console.log('error');
    });
}


getDetailedClubStats('megaforce',platformSelector.Xbox, function(res){
    console.log(res);
});

