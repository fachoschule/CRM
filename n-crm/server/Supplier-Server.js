module.exports = function(app) {
    // Load Home page
    var Supplier = require('../model/Suppliers');
    var connection = require('./config');
    var sess ;

    app.get('/supplier',function(req,res){
        sess = req.session;
        res.render('supplier',{title:"Supplier", session: sess});
    });
    app.get('/view_supplier/:page',function(req,res){
        sess = req.session;
        var perPage = 9
        var page = req.params.page || 1
        if(sess.name) {
            Supplier.find({}).skip((perPage * page) - perPage).limit(perPage)
                .exec(function(err, result) {
                    Supplier.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('view_supplier', {
                            title:"Supplier",
                            session: sess,
                            sened:result,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
                })
        }else{
            res.render('login',{title:'Login Page'});
        }

    });

    app.post('/insert-supplier', function (req, res, next) {
        supplier = new Supplier();
        supplier.supplier_id = "SUP_001";
        supplier.address = req.body.address;
        supplier.supplier_name = req.body.supplier_name;
        supplier.contact_phone = req.body.telephone;
        supplier.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                //req.flash('success', 'Product Add Success');
            }
        });
        res.redirect('/supplier');
    });
    app.post('/delete', function (req, res, next) {
        var query = {_id: req.body.identification};
        Supplier.remove(query,function (err) {
            if(err) throw err;
        })
        res.redirect('/supplier');
    });
    app.post('/save', function (req, res, next) {
        var telephone = req.body.telephone;
        var address = req.body.address;
        var supplier_name = req.body.supplier_name;
        var id = req.body.identification;
        console.log(telephone + address + supplier_name + id);
        var myquery = {"_id": id};
        var newvalues = {telephone: telephone, address: address, supplier_name: supplier_name};
        // connection.collection('suppliers').update(myquery,newvalues);
        Supplier.findById(id, function (err, supplier) {
            supplier.contact_phone = telephone;
            supplier.supplier_name = supplier_name;
            supplier.address = address;
            supplier.save(function (err, res) {
                if (err) throw err;

            });
        })
    });


    // Part for create product-supplier

    //ajax get the information of 1 supplier
    app.get('/product/ajax/load-supplier-information', function (req, res) {
        sess = req.session;
        if(sess.nickname){
            Supplier.findById( req.param('supplierID'), function (err, supplier){
                if(err){
                    console.log(err);
                }else{
                    res.send({supplier: supplier});
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.post('/product/add-new-supplier', function (req,res) {
       sess = req.session;
       if(sess.nickname){
           supplier = new Supplier();
           supplier.supplier_id = req.body.suppID;
           supplier.address = req.body.suppAddress;
           supplier.supplier_name = req.body.suppName;
           supplier.contact_phone = req.body.suppTelephone;
           supplier.tax_number = req.body.suppTaxNumber;
           supplier.fax_number = req.body.suppFax;
           supplier.save(function (err) {
               if (err) {
                   res.send({
                       inform : 'error'
                   });
               } else {
                   res.send({
                       supplier: supplier,
                       inform : 'OK'
                   });
               }
           });
       }else{
           res.render('login',{title:'Login Page'});
       }
    });
}