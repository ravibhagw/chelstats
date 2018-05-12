var express = require('express');
var app = express();

app.get('/api/test', function(req, res){
    res.json({test:'successful!'});
});

app.listen(3000);