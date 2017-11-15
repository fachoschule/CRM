let Employee = require('../model/Employee');

module.exports = function(app) {
    // Load Register page

    app.post('/newregister', function (req,res) {
        let employee = new Employee();

        employee.gender = req.body.gender;
        employee.last_name = req.body.lastname;
        employee.first_name = req.body.firstName;
        employee.username = req.body.userName;
        employee.password = req.body.password;

        employee.date_of_birth = '"'+req.body.dateBirth+'"';
        employee.phone = req.body.phoneNumber;
        employee.deparment = req.body.deparment;
        employee.email = req.body.email;
        employee.address = req.body.homeAddress;

        employee.save()
            .then(item => {
                res.send("Employee Added to Database");
            })
            .catch(err => {
                res.status(400).send("Unable to Add");
            });

    });
    app.get('/emp-register',function(req,res){
        res.render('emp-register',{user: "Great User",title:"homepage"});
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
