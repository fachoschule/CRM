var Product = require ('../model/Product');
var Supplier = require ('../model/Suppliers');
var Brand = require ('../model/Product_Brand');
var ProType = require ('../model/Product_Type');
var ProSupp = require ('../model/Product_Supplier');
var ExternalCode = require ('../model/External_Product_Code');
var multer = require('multer');
var fs = require('fs');

var sess ;
module.exports = function(app) {
    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./Images");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });
    var upload = multer({ storage : Storage}).single('userPhoto');

    app.post('/product/createNewProduct', function (req,res) {
        sess = req.session;
        if(sess.name) {
       // console.log('1111L '+ req.file);
        upload(req,res,function(err) {
            console.log(req.file);
            if(err) {
                console.log('here');
               // return res.end("Error uploading file.");
            }
            //console.log('finish');

               // console.log(req.param('externalCode'));
                let product = new Product();
                    console.log(req.param('knowSupplier'));
                    product.product_id = req.param('productID');
                    product.product_name = req.param('productName');
                    product.image = {
                        img: fs.readFileSync(req.file.path),
                        contentType: 'image/png'
                    };
                    product.description = req.param('description');
                    product.brand = {
                        brand_id: req.param('brandID'),
                        brand_name: req.param('brandName')
                    };
                    product.pro_type = {
                        type_id: req.param('typeID'),
                        type_name: req.param('typeName')
                    };

                    product.external_codes = req.param('externalCode');
                    var ex = req.param('externalCode');
                    for(var i = 0; i < ex.length;i++){

                        ExternalCode.findById(ex[i], function (err, extproducts) {

                            extproducts.status = 1;
                            extproducts.save();
                        });

                    }
                    product.final_cost= {
                        cost: 0,
                        currency: ""
                    }
                    product.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            if (req.param('knowSupplier') != 'on') {
                               // console.log('kinds = 1');
                                Product.find({}, function (err, products) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('list_products', {
                                            products: products,
                                            session: sess
                                        });
                                    }
                                });
                            } else {
                                sess.product = product;
                                res.redirect('/product/redirect-adding-suppliers-for-product');
                            }
                        }
                    });
        });
        }else{
                res.render('login',{title:'Login Page'});
            }
        });
    app.get('/product/redirect-adding-suppliers-for-product', function (req, res) {
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
    app.post('/product/finish-adding-the-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
            sess.product = null;
            res.send({redirect: '/list-product'});
        }else{
            res.render('login',{title:'Login Page'});
        }
    })
    app.post('/product/add-supplier-into-product', function (req, res) {
        sess = req.session;
        if(sess.name) {
            var costItem = req.param('costItem');
            var currency = req.param('currency');
            var supplierID = req.param('supplierID');
            var suppName = req.param('supplierName');
            let proSupp = new ProSupp();
            console.log('test first: '+ suppName);
            if(suppName == '' || suppName == null || typeof suppName == 'undefined'){
               // console.log('here');
                Supplier.find({'_id': supplierID}, function (err, supp) {
                    console.log('here' + supp);
                    suppName = supp.supplier_name;
                })
            }
            console.log('test then: '+ suppName);
            proSupp.supplier = {
                id : supplierID,
                name : suppName
            };
            proSupp.product = {
                id : sess.product._id,
                name : sess.product.product_name
            };
            proSupp.costPerItem = costItem;
            proSupp.currency = currency;
            proSupp.standardPrice = 0.000;
            proSupp.save(function (err, proSupp) {
                if (err) {
                    res.status(500).send(err)
                }
                ProSupp.find({'product.id' : sess.product._id}, function (err, suppliers) {
                    res.status(200).send({
                        suppliers: suppliers
                    });
                })

            });
            sess.suppliers = supplierID;
        }
        else {
            res.render('login',{title:'Login Page'});
        }
    })
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
                            ExternalCode.find({"status": 0}, function (err, externalCodes) {
                                res.render('add_product',{
                                    brands: brands,
                                    types : types,
                                    externalCodes : externalCodes,
                                    session: sess
                                });
                            })

                        }
                    });
                }
            });



        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/product/ajax/load-supplier-information', function (req, res) {
        sess = req.session;
        if(sess.name) {
            Supplier.findById({'_id': req.param('supplierID')}, function (err, supplier) {
                res.send({supplier: supplier});
            })
        }else{
            res.render('login',{title:'Login Page'});
        }
    })
    app.get('/list-product',function(req,res){
        sess = req.session;
        if(sess.name) {
            Product.find({}, function (err, products){
                if(err){
                    console.log(err);
                }else{
                    console.log(products);
                    products.forEach(function (p) {
                        console.log(p.description);
                    });
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

    app.get('/product/ajax/loadProduct', function (req, res) {
        var page = Integer.parseInt(req.param('page'));
        var perPage = Integer.parseInt(req.param('perPage'));
        var offset = Integer.parseInt(req.param('offset'));
        var start = page * perPage;
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
                                    res.send({
                                        product_id: pro_id,
                                        brand_name: brand.brand_name,
                                        type_name : type.proType_name
                                    });
                                }
                            })
                        }
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/product/add-final-cost', function (req, res) {
       Product.findById(req.param('product_ID'), function (err, pro) {
            pro.final_cost = {
                cost: req.param('itemCost'),
                currency: req.param('currency')
            }
            pro.save();
            res.redirect('/new-feed-general');
       })
    });
}