var External_Product = require ('../model/External_Product_Code');
var Customer = require('../model/Customer');
var sess ;
module.exports = function(app) {
    app.get('/ext-product/redirect-add-external-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
            Customer.find({}, function (err, customers) {
                res.render('add_external_product_code',{
                    title:'Add New External Product Code',
                    customers: customers,
                    session : sess
                });
            });

        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/external-product/create-new-external-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
           var extProductCode = req.param('extProductCode');
           var customer_id = req.param('customer');
           var description = req.param('description');
           var externalCode = req.param('externalCode');
           console.log(externalCode);
           Customer.findById(customer_id, function (err, customer) {
               let external_product = new External_Product();
               external_product.external_product_id = extProductCode;
               external_product.description = description;
               external_product.status = 0;
               external_product.customer ={
                   id: customer._id,
                   name: customer.last_name
               }
               external_product.save((err, todo) => {
                   if (err) {
                      console.log(err);
                    }else{
                       External_Product.find({}, function (err, extproducts) {
                           res.render('list_external_product_code', {
                               externals: extproducts,
                               session: sess
                           });
                       });
                   }
                   //res.writeHead(200, {'Content-Type': 'text/plain'});
                   //res.redirect('/list-external-product-code');
               });
               //res.redirect('/list-external-product-code');
           })

        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/list-external-product-code',function(req,res){
        sess = req.session;
        if(sess.name) {
            External_Product.find({}, function (err, extproducts) {
                res.render('list_external_product_code', {
                    externals: extproducts,
                    session: sess
                });
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
}