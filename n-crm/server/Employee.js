let Employee = require('../model/Employee');
let Department = require('../model/Department');
//let User = require('../model/User');
var db = require('./config');
var sess;


module.exports = function(app) {

/////////////////////// Registering Employee Records ///////////////////////

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
        employee.department = req.body.departmentname;
        employee.email = req.body.email;
        employee.address = req.body.homeAddress;


        employee.save()
            //user.save()
            .then(item => {
                res.redirect("/emp-register");
            })
            .catch(err => {
                res.status(400).send("Unable to Add Employer!!! May be Username Already Exist or syntax error");
            });

    });

    //////////////////// Get Departments Name from Department Collection/Model ////////////////////////////

    app.get('/emp-register',function(req,res){
        sess = req.session;
        if(sess.name) {
        Department.find({}, function (err, departments) {
            if (err) {
                console.log(err);
            } else {
                res.render('emp-register', {
                    departments:departments,
                    session: sess
                });
            }
            /*
            res.render('emp-register',{
            user: "Admin",
            title:"Registration",
            session: sess
            */
        });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });

/////////////////////// For Viewing Employee Records in Table Page 'empview' ///////////////////////

    app.get('/empview', function (req, res) {
        sess = req.session;
        if(sess.name) {
        Employee.find({}, function (err, employees) {
            Department.find({}, function (err, departments) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('empview', {
                        employees: employees,
                        departments: departments,
                        session: sess
                    });
                }
            });

        });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });

///////////////////////////////////////// Find By ID and Delete Employee Record ///////////////////////////

    app.post('/delete-employee', function (req, res) {
        sess = req.session;
        if(sess.name) {
        Employee.findByIdAndRemove(req.param('_id'), function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
///////////////////////////////////////// Find By ID and Edit/Update Employee Record ///////////////////////////
    app.post('/edit-employee', function (req, res) {
        sess = req.session;
        if(sess.name) {
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
        }else{
            res.render('login',{title:'Login Page'});
        }
    });

}