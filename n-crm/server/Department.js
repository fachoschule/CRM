let Department = require('../model/Department');
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
                res.redirect("/department");
            })
            .catch(err => {
                res.status(400).send("Unable to Add Employer!!! May be Username Already Exist or syntax error");
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
            if (err) {
                console.log(err);
            } else {
                res.render('department-list', {
                    departments: departments,
                    session: sess
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
