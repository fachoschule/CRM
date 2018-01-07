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
var formatDate = function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
        module.exports = {converter,decoratedConverter, formatDate

            /*
            utility.converter('EUR','USD',200,function (data) {
            partofJson = data;
            console.log(partofJson);
        })*/
    }