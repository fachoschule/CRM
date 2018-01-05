var Product = require ('../model/Product');
var ProdSupp = require ('../model/Product_Supplier');
var External_Code = require ('../model/External_Product_Code');
module.exports = function(app) {
    app.get('/new-feed-general', function (req, res) {
        sess = req.session;
        if(sess.name) {

            Product.find({'final_cost.cost': 0}, function (err, products) {
                External_Code.find({'status' : 0}, function (err, externalCodes) {
                    res.render('new-feed', {
                        session : sess,
                        products: products,
                        externalCodes: externalCodes,
                        title : "New Feed"
                    });
                })

            })
        }else {
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/redirect-add-final-cost', function (req, res) {
        sess = req.session;
        if(sess.name){
            Product.findById(req.param('proID'), function (err, product) {
                ProdSupp.find({"product.id" : req.param('proID')}, function (err, prosupps) {
                    console.log('log: ' +prosupps);
                    res.render('determine-final-cost', {
                        session : sess,
                        product: product,
                        title : "Add final cost",
                        prosupps: prosupps
                    })
                });
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
}