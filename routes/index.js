;

var fs = require('fs');
var csv = require('csv');
var request = require('request');


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });

var options = {
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    qs: {
        address: '711 2nd Ave, 10016',
        componentRestrictions: {administrativeArea: 'NY'},
        sensor: false
        }
};

request.get(options, function (req, res) {
    console.log(JSON.parse(res.body).status);
});

};

//var geocode = require('./geocode');
//geocode.start();


csv()
.from.path('../public/csv/output.csv',{ delimiter: ','})
.on('data', function (row) {console.log(row)});
