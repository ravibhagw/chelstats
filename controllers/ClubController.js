// ClubController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var chelStats = require('../lib/chelStats');
var platformSelector = require('../lib/platformSelector')


var statsEngine = new chelStats();

router.get('/:platform/:clubName', function(req, res){
    //console.log(req.param('clubName'));
    statsEngine.getClubStats(req.param('clubName'), req.param('platform'), function(results){

       res.send(results);
    });
});

router.get('/:platform/:clubName/members', function(req, res){
    statsEngine.getPlayersStats(req.param('clubName'), req.param('platform'), function(results){

        res.send(results);
     });
});


module.exports = router;