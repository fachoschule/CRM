var Product = require('../model/Product');
var Supplier = require('../model/Suppliers')
var sess ;
module.exports = function(app) {
    // Load Home page
    app.get('/create-product',function(req,res){
        sess = req.session;
        if(sess.name) {
            res.render('add_product',{session: sess});
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/list-product',function(req,res){
        sess = req.session;
        if(sess.name) {
            Product.find({}, function (err, products){
                if(err){
                    console.log(err);
                }else{
                    console.log(products);

                    res.render('list_products',{
                        products: products,
                        session: sess
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/edit-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
            Product.findById(req.param('id'), (err, product) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // Update each attribute with any possible attribute that may have been submitted in the body of the request
                    // If that attribute isn't in the request body, default back to whatever it was before.
                    product.product_id = req.param('proID');
                    product.product_name = req.param('proName');
                    product.description = req.param('descrip');

                    // Save the updated document back to the database
                    product.save((err, todo) => {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.status(200).send(product);
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/delete-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
            Product.findByIdAndRemove(req.param('_id'), function (err) {
                if(err){
                    console.log(err);
                    res.send('500');
                }
                res.send('OK');
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/product/createNewProduct', function (req,res) {
        sess = req.session;
        if(sess.name) {
            let product = new Product();
            product.product_id = req.param('productID');
            product.product_name =req.param('productName');
            product.image = req.param('productName');
            product.description = req.param('description');

            product.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    Product.find({}, function (err, products){
                        if(err){
                            console.log(err);
                        }else{
                            res.render('list_products',{
                                products: products,
                                session: sess
                            });
                        }
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    //load ajax for supplier list
    app.get ('/product/load-supplier-information', function (req,res) {
        sess = req.session;
        if(sess.name) {
            Supplier.find({}, function (err, suppliers){
                if(err){
                    console.log(err);
                }else{
                    console.log(suppliers);
                    res.send({suppliers: suppliers});
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
}