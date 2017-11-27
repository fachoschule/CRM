let Product = require('../model/Product');
<<<<<<< HEAD

=======
let Customer = require('../model/Customer');
>>>>>>> customers/esam
module.exports = function(app) {
    // Load Home page
    app.get('/',function(req,res){
        res.render('test',{user: "Great User",title:"homepage"});
    });
    app.post('/testAddDB', function (req,res) {
<<<<<<< HEAD
        let product = new Product();
        product.product_id = "PR002";
        product.product_name = "Coca cola";
        product.image = "D://coca-cocla.png";
        product.description = "Su  gar water";
        product.save(function (err) {
=======
        console.log("Before adding");
        let cust = new Customer();
        cust.last_name = "PR002";
        cust.first_name = "Coca cola";
        cust.email = "abc";
        cust.adress = "abch";
        cust.contact_phone ="0192837";

        cust.save(function (err) {
>>>>>>> customers/esam
            if (err) {
                console.log(err);
                return;
            } else {
<<<<<<< HEAD
               // req.flash('success', 'Product Add Success');
=======
                console.log("save success");
                // req.flash('success', 'Product Add Success');
>>>>>>> customers/esam
            }
        });
    })
}