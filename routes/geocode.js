var util = require('util');
var csv = require('csv');
var fs = require('fs');
var request = require('request');
var inputArray = [];

var getLatLong = function(address, callback) {
    var loc = {lat:43 , lng:-73};
    //setTimeout( function() {
    //console.log(address);
    callback(loc);//},1000);

    /*var options = {
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    qs: {
        address: address,
        componentRestrictions: {administrativeArea: 'NY'},
        sensor: false
        }
    };
    request.get(options, function (req, res) {
        console.log(JSON.parse(res.body).status);
        var loc = JSON.stringify(JSON.parse(res.body).results[0].geometry.location);
        console.log(loc);
        callback(loc);
    });*/
};

var handleArray = function(inputArray, callback) {
    for(var i = 0; i < inputArray.length; i++) {
        //setTimeout( function(inputArray) {
        getLatLong(inputArray[i].ADDRESS+' '+inputArray[i].ZIP, function(loc) {
            inputArray[i].LAT = loc.lat;
            inputArray[i].LONG = loc.lng;
        });        
        //},1000);
    };
    console.log(inputArray);
    callback(inputArray);
};

/*fs.readFile('../public/csv/locationsmall.csv', function(err, data) {
    if (err) throw err;
    inputArray.push(data.toString());
});*/


csv()
.from.path('../public/csv/locationsmall.csv', {
    delimiter: ',', 
    columns: true
})
.to.stream(fs.createWriteStream('../public/csv/output.csv'), {
    columns: ['NAME', 'ADDRESS','CITY','URL','PHONE','TYPE','ZIP','LAT','LONG']
})
.on('record', function(row,index) {
    inputArray.push(row);
})
.on('close', function(count) {
    console.log("here");
    handleArray(inputArray, function () {
        console.log(inputArray); 
        console.log('Number of lines: '+count);
    });
})
.on('error', function(error) {
    console.log(error.message);
});

