var express = require('express');
var nodemailer = require('nodemailer');
var NODE_TLS_REJECT_UNAUTHORIZED='0';
var db = require('./config');

var sess;
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {


    app.get('/fileacomplaint',function(req,res){
        sess = req.session;
        res.render('fileacomplaint',{
            user: "Admin",
            title:"Registration",
            session: sess
        });
    });


    app.post('/SendEail', function (req, res) {

        var fullname = req.body.Fullname;
        var empID = req.body.EmpID;
        var phone = req.body.Phone;
        var email = req.body.Email;
        var naturecomp = req.body.Naturecomp;
        var dept = req.body.Dept;
        var date = req.body.Date;
        var date1 = req.body.Date1;
        var message = req.body.Message;


        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            secure: false,
            auth: {
                user: 'hemanthrama143@gmail.com',
                pass: 'hemanth143'
            },
            tls:{
              rejectUnauthorized: false
            }
        });

        var mailOptions = {
            //from: 'hemanthrama143@gmail.com',
            to: 'ecrmjs@gmail.com',
            subject: 'Complaint from ECRM',
            text: 'hallo',

            html: "Name: " + fullname +'<br>' + "EmployeeID:"+  empID +'<br>' + "Phone:" +  phone +'<br>' + "Email:" +  email
                        +'<br>' + "Nature of complaint:" +  naturecomp +'<br>' + "Department:" +  dept +'<br>' + "Date Event Took Place:" +  date
                        +'<br>' + "Date You Noticed the Problem:" +  date1 +'<br>' + "Message:" +  message,
        };
        console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.redirect('/fileacomplaint');
                console.log(error);
            } else {
              //  bootbox.alert("success");
                res.redirect('/fileacomplaint');
            }
        });


    });

};




