var gm = require('googlemaps');
var util = require('util');
var csv = require('csv');
var fs = require('fs');
var errcount = 0;

var getCoords = function(address, callback) {
    setTimeout( function() {
    gm.geocode(address, function(err, res){
        console.log(res.status);
        if (err) { console.log(err); console.log(errcount++); }
        else {
        var loc = JSON.stringify(res.results[0].geometry.location);
        console.log(loc);
        callback(loc);}
    })},2000);
};

/*gm.reverseGeocode(gm.checkAndConvertPoint([41.850033, -87.6500523]), function(err, data){
        util.puts(JSON.stringify(data));
        });*/

csv()
.from.path('../public/csv/locations.csv', {
    delimiter: ',', 
    columns: true
})
.to.stream(fs.createWriteStream('../public/csv/output.csv'), {
columns: ['NAME', 'ADDRESS','CITY','URL','PHONE','TYPE','ZIP','LAT','LONG']
})
.transform( function(row){
    getCoords(row.ADDRESS+' '+row.ZIP, function(loc) {
        row.LAT = loc.lat;
        row.LONG = loc.lng;
        return row;
    });        

})
.on('record', function(row,index) {
    if (index < 10)
    { console.log('#'+index+' '+JSON.stringify(row)); }
})
.on('close', function(count) {
    console.log('Number of lines: '+count);
})
.on('error', function(error) {
    console.log(error.message);
});






