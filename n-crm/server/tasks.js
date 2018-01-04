module.exports = function (app) {
    var connection = require('./config');
    var Task = require('../model/Task');


    app.get('/tasks', function (req, res) {
            sess = req.session;
            if (sess.name) {
                connection.collection("users").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    connection.collection("tasks").find({}).toArray(function (error , taskdb) {
                        if(error) throw error;

                        res.render('tasks', {title: 'Tasks', users: result,session: sess, tasks : taskdb});
                    })
                })
            }
            else
            {
                res.render('login', {title: 'Login Page'});
            }



        }

    );
    app.get('/calendar', function (req, res) {
            sess = req.session;
            if (sess.name) {
                connection.collection("tasks").find({}).toArray(function (error , taskdb) {
                    if(error) throw error;
                    res.render('calendar', {title: 'Calendar',session: sess, tasks : taskdb});
                })
            }
            else
            {
                res.render('login', {title: 'Login Page'});
            }
        }
    );


    app.post('/task_insert', function (req, res, next) {
        task = new Task();
        task.title = req.body.title;
        task.things_to_do = req.body.things_to_do;
        task.deadline = req.body.deadline;
        task.users = req.body.users;
        task.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
            }
        });
        res.redirect('/tasks');
    });
    app.post('/gettitle', function (req, res, next) {
        var task = req.body.title;
        console.log(task);
        connection.collection("tasks").find({'title':new RegExp(task,'i')}).toArray(function (error , taskdb) {
            if(error) throw error;

            res.send({taskas:taskdb});
        })

    });


}