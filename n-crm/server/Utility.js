var request = require('request');

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
        cb(sum);
    })};

        module.exports = {converter,decoratedConverter

            /*
            utility.converter('EUR','USD',200,function (data) {
            partofJson = data;
            console.log(partofJson);
        })*/

    }