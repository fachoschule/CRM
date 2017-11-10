const express = require('express');
const router = express.Router();

//bring in customers models
let Customers = require('../model/customer');

//here was get single customer

// Add Customer Route
router.get('/add', function (req, res) {
    res.render('add_customer',{
        title: 'Add Customers'
    });
});

// Add Submit POST Route
router.post('/add', function(req, res){
    req.checkBody('last_name','Last name is required').notEmpty();
    req.checkBody('first_name','First name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('contact_phone','Contact Phone is required').notEmpty();
    req.checkBody('adress','Address is required').notEmpty();

    //get the errors
    let errors = req.validationErrors();

    if (errors){
        res.render('add_customer',{
            title:'Add Customers',
            errors:errors
        });
    } else {

        let customer = new Customers();
        customer.last_name = req.body.last_name;
        customer.first_name = req.body.first_name;
        customer.email = req.body.email;
        customer.contact_phone = req.body.contact_phone;
        customer.adress = req.body.adress;

        customer.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Customer Added');
                res.redirect('/customers');
            }
        });
    }
});

// Get Single Customer
router.get('/:id', function (req, res) {
    Customers.findById(req.params.id, function (err, customer) {
        res.render('customers',{
            customer:customer
        });
    });
});

// load Edit Form
router.get('/edit/:id', function (req, res) {
    Customers.findById(req.params.id, function (err, customer) {
        res.render('edit_customers',{
            title:'Edit Customer',
            customer:customer
        });
    });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
    let customer = {};
    customer.last_name = req.body.last_name;
    customer.first_name = req.body.first_name;
    customer.email = req.body.email;
    customer.contact_phone = req.body.contact_phone;
    customer.adress = req.body.adress;

    let query ={_id:req.params.id}

    Customers.update(query, customer, function(err){
        if(err){
            console.log(err);
            return;
        }else {
            req.flash('success', 'Customer Updated');
            res.redirect('/customers');
        }
    });
});

// Delete Customer
router.delete('/:id', function (req, res) {
    let query = {_id:req.params.id}

    Customers.remove(query, function (err) {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });

});

module.exports = router;