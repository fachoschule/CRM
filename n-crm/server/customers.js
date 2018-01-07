//bring in customers models
let Customers = require('../model/Customer');
var sess ;

// get single customer
module.exports = function(app) {

// Customers Route
    app.get('/customers', function (req, res){
        sess = req.session;
        if (sess.name) {
        Customers.find({}, function (err, customers){
            if(err){
                console.log(err);
            }else{
                res.render('index',{
                    title: 'Customers',
                    customers: customers,
                    session: sess
                });
            }
        });
        }
        else
        {
            res.render('login', {title: 'Login Page'});
        }
    });
// Add Customer Route
    app.get('/add-customer', function (req, res) {
        sess = req.session;
        res.render('add_customer', {
            title: 'Add Customers',
            session: sess
        });
    });

// Add Submit POST Route
    app.post('/addCustomer', function (req, res) {

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
                res.redirect('/customers');
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
    app.post('/edit-customer', function (req, res) {
        Customers.findById(req.param('id'), (err, customer) => {
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                customer.last_name = req.param('last_name');
                customer.first_name = req.param('first_name');
                customer.email = req.param('email');
                customer.contact_phone = req.param('contact_phone');
                customer.adress = req.param('adress');

                // Save the updated document back to the database
                customer.save((err, todo) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.status('200').send('OK');
                });
            }
        });

    });

// Delete Customer
    app.post('/delete-customer', function (req, res) {
        console.log("delete customer " + req.body._id);
        let query = {_id: req.body._id}

        Customers.remove(query, function (err) {
            if (err) {
                console.log(err);
                res.send('500');
            }
            res.send('OK');
        });

    });

};