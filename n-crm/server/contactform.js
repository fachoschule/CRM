var express = require('express');
var nodemailer = require('nodemailer');
var NODE_TLS_REJECT_UNAUTHORIZED = '0';

var sess;
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {


    app.get('/contactform', function (req, res) {

        sess = req.session;
        res.render('contactform', {
            user: "Admin",
            title: "Registration",
            session: sess
        });
    });


    app.post('/SendEmail', function (req, res) {
        console.log("ss");

        var email = req.body.Email;
        var subject = req.body.Subject;
        var message = req.body.Message;

        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'Gmail',
            secure: false,
            auth: {
                user: 'hemanthrama143@gmail.com',
                pass: 'hemanth143'
            },
            tls:
                {
                    rejectUnauthorized: false
                }
        }))

        var mailOptions = {
            //from: 'hemanthrama143@gmail.com',
            to: 'Ecrmjs@gmail.com',
            subject: 'Feedback from ECRM Emplyoee',
            text: 'hallo',
            html: "From: " + email + '<br>' + "Subject:" + subject + '<br>' + "Message:" + message,
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (!error) {
                res.redirect('/contactform');
            }
            else {
                //alert("error");
                res.redirect('/contactform');
                //  res.send(error);
            }
        });


    });

};

