//let Product = require('../model/Product');
let Customer = require('../model/Customer');
module.exports = function(app) {
    // Load Home page
    app.get('/create-product',function(req,res){
        res.render('add_product');
    });
    app.post('/testAddDB111', function (req,res) {
        console.log("Before adding");
        let cust = new Customer();
        cust.last_name = "PR002";
        cust.first_name = "Coca cola";
        cust.email = "abc";
        cust.adress = "abch";
        cust.contact_phone ="0192837";

        cust.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("save success");
                // req.flash('success', 'Product Add Success');
            }
        });
    })
}