var Product = require('../model/Product');
var db = require('./config');
module.exports = function(app) {
    // Load Home page
    app.get('/create-product',function(req,res){
        res.render('add_product');
    });
    app.get('/list-product',function(req,res){
        Product.find({}, function (err, products){
            if(err){
                console.log(err);
            }else{
                res.render('list_products',{
                    products: products
                });
            }
        });
    });
    app.post('/edit-product', function (req, res) {
        Product.findById(req.param('id'), (err, product) => {
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                product.product_id = req.param('proID')  ;
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
    });
    app.post('/delete-product', function (req, res) {
               Product.findByIdAndRemove(req.param('_id'), function (err) {
                   if(err){
                       console.log(err);
                       res.send('500');
                   }
                   res.send('OK');
               });
    });
    app.post('/product/createNewProduct', function (req,res) {
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
                             products: products
                         });
                     }
                 });
             }
         });
    });
}