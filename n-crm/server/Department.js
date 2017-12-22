let Department = require('../model/Department');
let Employee = require('../model/Employee');
var db = require('./config');
var sess;
module.exports = function(app) {
    // Load Register page

    app.post('/depregister', function (req,res) {
        let department = new Department();


        department.name = req.body.department;
       // employee.email = req.body.email;
        department.location = req.body.location;

        department.save()
            .then(item => {
                res.redirect("/department-list");
            })
            .catch(err => {
                res.status(400).send("Unable to Add Department!!!");
            });

    });

    app.get('/department',function(req,res){
        sess = req.session;
        res.render('department',{
            user: "Admin",
            title:"Registration",
            session: sess
        });
    });


    app.get('/department-list', function (req, res) {
        sess = req.session;
        Department.find({}, function (err, departments) {
            Employee.find({}, function (err, employees) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(departments);
                    res.render('department-list', {
                        departments: departments,
                        employees: employees,
                        session: sess
                    });
                }
            });


        });
    });

    app.post('/department-list/Employee', function (req, res) {
        sess = req.session;

            Employee.find({department:req.body.departmentName}, function (err, employees1) {

                if (err) {
                    console.log(err);
                } else {
                    res.json(employees1);

                }
            });

        });


    app.post('/edit-department', function (req, res) {
        Department.findById(req.param('_id'), (err, departments) => {
            if (err) {
                res.status(500).send(err);
            } else {
               // console.log(departments);
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.

                departments.name = req.param('name');
                departments.location = req.param('location');

                departments.save()
                    .then(item => {
                        res.send("Updated");
                    })
                    .catch(err => {
                        res.status(400).send("Unable to save to database");
                    });
            }
        });
    });



    app.post('/delete-department', function (req, res) {
        Department.findByIdAndRemove(req.param('_id'), function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
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
