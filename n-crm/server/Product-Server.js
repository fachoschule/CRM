var Product = require('../model/Product');
var Supplier = require('../model/Suppliers');
var Brand = require('../model/Product_Brand');
var ProType = require('../model/Product_Type');
var sess ;
module.exports = function(app) {
    app.get('/product/redirect-adding-suppliers-for-product', function (req,res) {
        sess = req.session;
        if(sess.name) {
            res.render('add_product_supplier',{
                title:'Add Suppliers For Product',
                session : sess
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    // Load Home page
    app.get('/create-product',function(req,res){
        sess = req.session;
        if(sess.name) {

            Brand.find({}, function (err, brands){
                if(err){
                    console.log(err);
                }else{
                    ProType.find({}, function (err, types){
                        if(err){
                            console.log(err);
                        }else {
                            res.render('add_product',{
                                brands: brands,
                                types : types,
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
            console.log('proID'+ req.body.productID);
            product.product_id = req.param('productID');
            product.product_name =req.param('productName');
            product.image = req.param('productName');
            product.description = req.param('description');
            Brand.findById(req.param('brandID'), function (err, brand){
                product.brand = {
                    brand_id: req.param('brandID'),
                    brand_name : brand.brand_name
                };
            });

            ProType.findById(req.param('typeID'), function (err, type){
                product.pro_type = {
                    type_id : req.param('typeID'),
                    type_name :  type.proType_name
                };
            });
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
    app.get ('/product/load-suppliers-information', function (req,res) {
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
    //generate new product id
    app.get('/product/generate-new-product-id', function (req, res) {
        sess = req.session;
        if(sess.name) {
            Brand.findById(req.param('brand'), function (err, brand){
                if(err){
                    console.log(err);
                }else{
                    ProType.findById(req.param('type'), function (err, type){
                        if(err){
                            console.log(err);
                        }else {
                            let brName = brand.brand_name.substring(0,3);
                            let typeName = type.proType_name.substring(0,3);
                            let br_type = brName + "_" + typeName;

                            Product.find({'product_id': new RegExp(br_type, 'i')  }, function (err, products) {
                                //console.log(products);
                                if(err) {
                                    console.log(err);
                                }else{
                                    var pro_id;
                                    if(products == null){
                                         pro_id = br_type + '_' + '001';
                                    }else {
                                        id = products.length + 1;
                                        pro_id = br_type + '_' + '00' + id;
                                    }
                                    res.send({product_id: pro_id});
                                }
                            })
                        }
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    })
}