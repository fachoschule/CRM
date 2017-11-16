let Employee = require('../model/Employee');

module.exports = function(app) {
    // Load Register page

    app.post('/newregister', function (req,res) {
        let employee = new Employee();

        employee.role = req.body.selectview;
        employee.gender = req.body.selectgender;
        employee.last_name = req.body.lastname;
        employee.first_name = req.body.firstName;
        employee.username = req.body.userName;
        employee.password = req.body.password;
        employee.date_of_birth = '"'+req.body.dateBirth+'"';
        employee.phone = req.body.phoneNumber;
        employee.department = req.body.department;
        employee.email = req.body.email;
        employee.address = req.body.homeAddress;

        employee.save()
            .then(item => {
                res.send("New Record Save to Database");
            })
            .catch(err => {
                res.status(400).send("Unable to save to database");
            });

    });
    app.get('/emp-register',function(req,res){
        res.render('emp-register');
    });
}

//employee.save()
/*
employee.save(function (err) {
    if (err) {
        console.log(err);
        return;
    }else {

    }
});
*/
