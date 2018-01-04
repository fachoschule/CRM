module.exports = function(app) {

    var Supplier = require('../model/Suppliers');
    var connection = require('./config');
    var sess ;
    app.get('/supplier',function(req,res){
        sess = req.session;
        if(sess.name) {
            res.render('supplier',{title:"Supplier", session: sess});
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/view_supplier',function(req,res){
        sess = req.session;
        if(sess.name) {
            connection.collection("suppliers").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render('view_supplier',{title:"View Supplier",sened:result , session: sess});
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
        supplier.telephone = req.body.telephone;
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
    app.post('/delete_supplier', function (req, res, next) {
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
        Supplier.findById(id, function (err, res) {
            res.set(newvalues);
            res.save(function (err, res) {
                if (err) throw err;

            });
        })
    });

}