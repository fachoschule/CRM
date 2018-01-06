var Purchase_Order = require ('../model/Purchase_Order');
var Customer = require('../model/Customer');
var Product = require('../model/Product');
var sess ;
var util = require('util');
//here was get single customer
module.exports = function(app) {

// Customers Route

    app.get('/customer-order', function (req, res){
        sess = req.session;
        if(sess.name) {
            Purchase_Order.find({}, function (err, pos){
                console.log("type of pos " + typeof pos);
                if(err){
                    console.log(err);
                }else{
                    res.render('customer-order',{
                        pos: pos,
                        session: sess
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });
    app.get('/product-sold', function (req, res){
        sess = req.session;
        if(sess.name) {
            Purchase_Order.find({}, function (err, pos){
                console.log("type of pos " + typeof pos);
                if(err){
                    console.log(err);
                }else{
                    res.render('product-sold',{
                        pos: pos,
                        session: sess
                    });
                }
            });
        }else{
            res.render('login',{title:'Login Page'});
        }
    });


    app.get('/ajax/purchased-products', function (req, res){
        sess = req.session;
        if(sess.name) {
            Product.find({}, function (err,products){
                var poCount = 0;
                var poListCount = -1;
                let poList={};
                var tempArray=[];
                Purchase_Order.find({}, function (err, purchaseOrders){
                    products.forEach(function(productRow){
                        poCount = 0;
                        poListCount = poListCount + 1;
                        purchaseOrders.forEach(function (purchaseOrder_List) {

//console.log("Product display here "+purchaseOrder_List["products"]);
//console.log(productRow["_id"]);
                            for(var i =0; i<purchaseOrder_List['products'].length; i++)
                            {


                                // console.log(purchaseOrder_List[i]);
                                if(productRow["_id"]==purchaseOrder_List["products"][i]["product_id"]){

                                    // console.log(purchaseOrder_List["products"][i]["product_id"]);
                                    //console.log(purchaseOrder_List['products']);


                                    poCount = poCount +1; //purchaseOrder_List["products"][i]["product_id"];

                                    poList[poListCount] = {name:productRow["product_name"],y:poCount};
                                    // tempArray.push(poList);
                                    // console.log("products Array "+tempArray);
                                    // console.log("products Purchased are  "+poCount);
                                }
                            }
                        })

                    });

                    // console.log("purchase order list "+poList);

                    console.log("purchase order list of products"+ util.inspect(poList, false, null));
                    res.send(poList);
                });
            });

        }
    });
// Customer Purchased Graph
    app.get('/ajax/customer-order', function (req, res){

        var customers;
        //customer
        //pO
        //i =0
        //puchar = 0
        //foreach custo
        //for po
        //if cutid == po cutom id
        //for each o=product
        //purch ++

        //obj[i] = [cutomername: customerName , purcharorder:purch]
        sess = req.session;
        if(sess.name) {

            Customer.find({}, function (err,customers){

                var poCount = 0;
                var poListCount = -1;
                let poList = new Array();

                Purchase_Order.find({}, function (err, purchaseOrders){
                    customers.forEach(function(customerRow){
                        poCount = 0;
                        poListCount = poListCount + 1;
                        purchaseOrders.forEach(function (purchaseOrder_List) {
                            if(customerRow["_id"]==purchaseOrder_List['customer']['id']){
                                poCount = poCount + purchaseOrder_List["products"].length;
                                poList[poListCount]= [customerRow["last_name"], poCount];
                                // console.log("products ourchased are  "+poCount);
                            }
                        })
                    });
                    // console.log("purchase order list "+poList);
                    //console.log("purchase order list "+ util.inspect(poList, false, null));
                    res.json(poList);
                });
            });
            //return;
            /*
                        Purchase_Order.find({}, function (err, pos){
                            console.log("type of pos " + typeof pos);
                            if(err){
                                console.log(err);
                            }else{


                                    res.json(pos);
                                   // session: sess

                            }
                        });
                    }else{
                        res.render('login',{title:'Login Page'});
                   */ }
    });
};
