var request = require('request');

<<<<<<< HEAD
var converter = function (from, to, number, cb) {

    request('https://api.fixer.io/latest?base=' + from, function (error, response, body) {

        var info = JSON.parse(body);
        var sum = Number(info.rates[to]) * number;
        cb(sum);
    })};

var decoratedConverter = function (from, to, cb) {
        request('https://api.fixer.io/latest?base=' + from, function (error, response, body) {
            var info = JSON.parse(body);
            var sum = Number(info.rates[to]);
=======
module.exports = {
    converter:function (from,to,cb) {

        request('https://api.fixer.io/latest?base=' + from,function (error, response, body) {
            var info = JSON.parse(body);
            // console.log(info.rates[to]);
            var sum =Number(info.rates[to]);
           // console.log(sum);
>>>>>>> 9790392c60636ed2941c88ce9e3e2f886c35a920
            cb(sum);
        })};


        module.exports = {converter,decoratedConverter

            /*
            utility.converter('EUR','USD',200,function (data) {
            partofJson = data;
            console.log(partofJson);
        })*/

    }