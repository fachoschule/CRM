var request = require('request');

module.exports = {
    converter:function (from,to,cb) {

        request('https://api.fixer.io/latest?base=' + from,function (error, response, body) {
            var info = JSON.parse(body);
            // console.log(info.rates[to]);
            var sum =Number(info.rates[to]);
           // console.log(sum);
            cb(sum);
        })

        /*
        utility.converter('EUR','USD',200,function (data) {
        partofJson = data;
        console.log(partofJson);
    })*/
    }
}