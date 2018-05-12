// Chelstats v0.1
// Using Node.js, this library can retrieve EASHL club and player stats
var https = require('https');


const baseUrl = 'https://www.easports.com/iframe/nhl14proclubs/api/platforms';

var chelStats = class {

    // No point using a constructor to store clubname or platform, as every request will be different

    getClubId(clubName, platform, callback) {
        var url = baseUrl+'/'+platform+'/clubsComplete/'+clubName;
        https.get(url, function(res) {
            res.on("data", function(chunk) {
                var myData = JSON.parse(chunk);
                callback(Object.keys(myData.raw)[0]);
            });
        }).on('error', function(e){
            console.log('error');
        });
    }
    
    getDetailedClubStats(clubName, platform, callback) {
        this.getClubId(clubName, platform, function(clubId) {
            var url = baseUrl+'/'+platform+'/clubs/'+clubId+'/stats';
            https.get(url, function(res){
                res.on("data", function(chunk) {
                    var myData = JSON.parse(chunk);
                    callback(myData.raw[clubId]);
                });
            });
        });
    }
    
    getClubStats(clubName, platform, callback) {
        var url = baseUrl+'/'+platform+'/clubsComplete/'+clubName;
        https.get(url, function(res) {
            res.on("data", function(chunk) {
                var myData = JSON.parse(chunk);
                callback(myData.raw);
            });
        }).on('error',
         function(e){
            console.log('unexpected error');
        });
    }
    
    
    getPlayersStats(clubName, platform, callback) {
        this.getClubId(clubName, platform, function(clubId) {
            this.getPlayersStatsByClubId(clubId, platform, callback);
        });
    }




    
    // TODO: Should have a method can get by clubId
    getPlayersStatsByClubId(clubId, platform, callback){
        var url = baseUrl+'/'+platform+'/clubs/'+clubId+'/members';
        https.get(url, function(res){
            res.on("data", function(chunk) {
                var myData = JSON.parse(chunk);
                
                var players = [];
                
                var playersFormatted = [];

                Object.keys(myData.raw[0]).forEach(function(itemKey){
                    var item = myData.raw[0][itemKey];
                    var blazeId = item.blazeId;
                    players.push({"gamertag":item.name, "blazeId":blazeId});

                });
                
                Promise.all(players.map((item) => {
                    var requestUrl = baseUrl + '/' + platform + '/members/' + item.blazeId + '/stats';
                    return new Promise((resolve) => {
                        https.get(requestUrl, function(res) {
                            res.on('data', function(chunk) {
                              const playerData = JSON.parse(chunk);
                              resolve({
                                "gamertag": item.gamertag,
                                "data": playerData.raw[Object.keys(playerData.raw)[0]]
                              });
                            });
                        });
                    });
                }))
                .then(callback);          
            });
        });
    }

    // Will need to call a method to resolve clubName from Id, then call getClubStats
    getClubStatsByClubId(clubId, platform, callback){

    }

    
};



module.exports = chelStats;