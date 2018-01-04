var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//const session =require(express-session);

module.exports = function (app) {


    app.get('/SendPromotions', function (req, res) {
        sess = req.session;
        res.render('SendPromotions', {
            user: "Admin",
            session: sess,
            title: "Registration"

        });
        //res.render('SendPromotions')
    });
    app.post('/SendEmail', function (req, res) {

        var email = req.body.Email;
        var subject = req.body.Subject;
        var message = req.body.Message;
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'hemanthrama143@gmail.com',
        //         pass: 'hemanth143'
        //
        //     }
        // });
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: 'hemanthrama143@gmail.com',
                pass: 'hemanth143'
            }
        }))

        var mailOptions = {
            from: 'hemanthrama143@gmail.com',
            to: 'maihathi.92@gmail.com',
            subject: 'hallo',
            text: 'hallo',
            html: '<b>Hello world?</b>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.send('Email sent: ' + info.response);
            }
        });


    });



    // Load Home page

}

