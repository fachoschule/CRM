var todolist = require('../model/todolist');
var db = require('./config');
var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
//const session =require(express-session);
var db = require('./config');
var sess;
module.exports = function (app) {

    app.get('/todolist', function (req, res) {
        sess = req.session;

        todolist.find((req,todolistdata)=>{
                console.log("todo data find it");
            res.render('todolist',  {
                user: "Admin",
                title: "Registration",
                session: sess,
                todolist:todolistdata

            });

        });
    });
    app.post('/AddToDoList', function (req, res) {


        let todo = new todolist();
        todo.myInput = req.body.myInput;// req.param('promotionCode');
        todo.status = "remain";
        todo.save()
            .then(item => {
                console.log("saved");
                res.redirect("/todolist");
            })
            .catch(err => {
                res.status(400).send("nothing");
            });

    });
    app.post('/delete_todolist', function (req, res) {
        todolist.findByIdAndRemove(req.param('_id'), function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
    });
    app.post('/Complete_todolist', function (req, res) {
        const doc ={
            status:"complete"

        }
        todolist.findByIdAndUpdate(req.param('_id'),doc, function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
    });


}