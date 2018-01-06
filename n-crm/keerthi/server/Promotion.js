var Promotion = require('../model/Promotions');
var db = require('./config');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//const session =require(express-session);
var db = require('./config');
var sess;
module.exports = function (app) {

    app.post('/createNewPromotion', function (req, res) {
        //sess = req.session;
        let promotions = new Promotion();
        //  console.log( req.param('promotionCode'));
        promotions.promotion_code = req.body.promotionCode;// req.param('promotionCode');
        promotions.promotion_name = req.body.promotionName;//  req.param('promotionName');
        promotions.Image = req.body.promotionImage;//req.param('promotionImage');
        //promotion.description = req.param('description');


        promotions.save()
            .then(item => {
                console.log("saved");
                res.redirect("/promoview");
            })
            .catch(err => {
                res.status(400).send("Unable to Add promotion!!! May be Promocode already existed");
            });

    });
    app.get('/SendPromotions', function (req, res) {
        db.collection("promotions").find({}).toArray(function(err,promotion){
            sess = req.session;
            console.log(promotion);
            res.render('SendPromotions',{user : "Admin",promotion:promotion,title:"Registration",session: sess });
        })
    });
    app.post('/SendEmailPromotion', function (req, res) {

        var email = req.body.Email;
        var subject = req.body.promotions;
        var message = req.body.Message;
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'hemanthrama143@gmail.com',
        //         pass: 'hemanth143'
        //
        //     }
        // });
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: true,
            auth: {
                user: 'ecrmjs@gmail.com',
                pass: 'adminadmin123'
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
           // from: 'ecrmjs@gmail.com',
            to: email,//'arshadyab@gmail.com',
            subject:subject,//'hallo',
            text: message ,
            //html: '<b>Hello world?</b>'
        };

        transporter.sendMail(mailOptions, function (error, res) {
            if (error) {
                console.log(error);
            } else {
                console.log('');
                res.render('/');
            }
        });
        sess = req.session;
        res.render('promotion', {
            user: "Admin",
            title: "Registration",
            session: sess
        });

    });


    app.get('/promotion', function (req, res) {
        sess = req.session;
        res.render('promotion', {
            user: "Admin",
            title: "Registration",
            session: sess
        });
    });
    app.post('/SavePromotion', function (req, res) {
        console.log('SavePromotion');

    });
    app.get('/promoview', function (req, res) {
        console.log(' ');

        sess = req.session;
        Promotion.find({}, function (err, promotions) {
            if (err) {
                console.log(err);
            } else {
                res.render('promoview', {
                    promotion: promotions,
                    session: sess
                });
            }
        });

    });
    // Load Home page
    app.get('/Sendpromotion', function (req, res) {
        sess = req.session;
        Promotion.find({}, function (err, promotions) {
            if (err) {
                console.log(err);
            } else {
                res.render('SendPromotions', {
                    promotion: promotions,
                    session: sess
                });
            }
        });

    });

    app.post('/delete-promotion', function (req, res) {
        Promotion.findByIdAndRemove(req.param('_id'), function (err) {
            if(err){
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });
    });

    app.post('/edit-Promotions', function (req, res) {
        console.log('edit-Promotions');
        Promotion.findById(req.params._id, (err, promotion) => {
            if (err) {
                res.status(500).send(err);
            } else {
                //console.log(employees);
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                promotion._id = req.params._id;
                promotion.promotion_name = req.param('editpromotion_name');
                promotion.promotion_code = req.param('editpromotion_code');
                promotion.Image = req.param ('Image');

                ('email');
                promotion.save()
                    .then(item => {
                        res.send("Updated");
                    })
                    .catch(err => {
                        res.status(400).send("Unable to save to database");
                    });
            }
        });
    });

}