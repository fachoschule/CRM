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

    app.post('/edit-employee', function (req, res) {
        Employee.findById(req.param('_id'), (err, employees) => {
            if (err) {
                res.status(500).send(err);
            } else {
                //console.log(employees);
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                employees.last_name = req.param('last_name');
                employees.first_name = req.param('first_name');
                employees.role = req.param('role');
                employees.username = req.param('username');
                employees.department = req.param('department');
                employees.email = req.param('email');
                employees.address = req.param('address');
                employees.phone = req.param('phone');
                employees.gender = req.param('gender');


                employees.save()
                    .then(item => {
                        res.send("Updated");
                    })
                    .catch(err => {
                        res.status(400).send("Unable to save to database");
                    });
            }
        });
    });
}

