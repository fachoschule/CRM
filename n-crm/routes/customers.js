//bring in customers models
let Customers = require('../model/Customer');

//here was get single customer
module.exports = function(app) {

// Customers Route
    app.get('/customers', function (req, res){
        console.log('customer here');
        Customers.find({}, function (err, customers){
            if(err){
                console.log(err);
            }else{
                res.render('index',{
                    title: 'Customers',
                    customers: customers
                });
            }
        });
    });
// Add Customer Route
    app.get('/add-customer', function (req, res) {
        res.render('add_customer', {
            title: 'Add Customers'
        });
    });

// Add Submit POST Route
    app.post('/addCustomer', function (req, res) {
        console.log("Before adding");

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
                console.log("save success");
                res.redirect('/');
                // req.flash('success', 'Product Add Success');
            }
        });


    });

// Get Single Customer
//     app.get('/:id', function (req, res) {
//         Customers.findById(req.params.id, function (err, customer) {
//             res.render('customers', {
//                 customer: customer
//             });
//         });
//     });
//
// // load Edit Form
//     app.get('/edit/:id', function (req, res) {
//         Customers.findById(req.params.id, function (err, customer) {
//             res.render('edit_customers', {
//                 title: 'Edit Customer',
//                 customer: customer
//             });
//         });
//     });
//
// // Update Submit POST Route
//     app.post('/edit/:id', function (req, res) {
//         let customer = {};
//         customer.last_name = req.param('last_name');
//         customer.first_name = req.param('first_name');
//         customer.email = req.param('email');
//         customer.contact_phone = req.param('contact_phone');
//         customer.adress = req.param('adress');
//
//         let query = {_id: req.params.id}
//
//         Customers.update(query, customer, function (err) {
//             if (err) {
//                 console.log(err);
//                 return;
//             } else {
//                 req.flash('success', 'Customer Updated');
//                 res.redirect('/customers');
//             }
//         });
//     });
//
// // Delete Customer
    app.post('/delete-customer', function (req, res) {
        console.log("delete customer " + req.body._id);
        let query = {_id: req.body._id}

        Customers.remove(query, function (err) {
            if (err) {
                console.log(err);
                res.send('500');
            }
            console.log("delete");
            res.send('OK');
        });

    });

};