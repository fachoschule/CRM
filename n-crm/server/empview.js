let Employee = require('../model/Employee');
var db = require('./config');

module.exports = function(app) {
    // Load Home page
    app.get('/empview', function (req, res) {
        Employee.find({}, function (err, employees) {
            if (err) {
                console.log(err);
            } else {
                res.render('empview', {
                    employees: employees
                });
            }
        });
    });
    app.post('/delete-employee', function (req, res) {
        Employee.findByIdAndRemove(req.param('_id'), function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
    });
}

