//var User = require('../model/User');
var Employee = require('../model/Employee');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var sess ;
module.exports = function(app) {
    // Load Home page
    app.get('/',function(req,res){
        res.render('login',{title:'login page'});
    });
    //Redirect Forgot password page
    app.get('/forgot_password', function (req,res) {
        res.render('forgot_password',{title:'Forgot Password Page'});
    })
    app.post('/forgot_password', function (req, res) {
       var to = 'avaz.babayev@student.fh-kiel.de';
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                Employee.find({ username: req.param('email') }, function(err, user) {
                    if (!user) {
                        //req.flash('error', 'No account with that email address exists.');
                        return res.render('/forgot_password');
                    }
                    console.log(user);

                    user[0].passwordToken = token;
                    user[0].passwordExpires = Date.now() + 3600000; // 1 hour

                    // Save the updated document back to the database
                    user[0].save((err, todo) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        done(err, token, user);
                    });

                    console.log(user);
                });
            },
            function(token, user, done) {
                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'maihathi.92@gmail.com',
                        pass: ''
                    }
                });
                var mailOptions = {
                    to: to,
                    from: 'ha.t.mai@student.fh-kiel.com',
                    subject: 'ECRM is reset password',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                   // req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) console.log(err);
            res.render('/forgot_password');
        });
    })
// Load Home page
    app.post('/login/checkAuthentication',function(req,res){
        console.log(req.body.email);
        Employee.find({"username": req.body.email}, function (err, user){
            if(err){
                console.log(err);
            }else{
                password = req.body.password;
                console.log(password);
                console.log(user[0]);
                if(user[0].password == password)
                {
                    sess = req.session;
                    sess.name = user[0].username;
                    sess.nickname = user[0].last_name;
                    //sess.nickname = user[0].nickname;
                    res.redirect('/new-feed-general');
                   // console.log('success');
                }else{
                    console.log('fail login');
                    res.render('login',{title:'Home Page'});
                }
            }
        });
       // res.render('add_product');
    });
    app.get('/logout', function (req,res) {
        sess = req.session;
        sess.name = "";
        res.render('login',{title:'Home Page'});
    })
}