let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    poNumber:{
        type: String,
        uppercase: true,
        require: true
    },
    poName:{
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date
    },
    deliveryTo: {
        type: String
    },
    currency: {
        type: String,
        required: true
    },
    customer: {
        id: String,
        name: String
    },
    products: [{
        product_id: String,
        productID: String,
        product_name: String,
        external_code: String,
        costPerItem: Number,
        currency: String,
        exchange_rate: Number,
        description: String,
        quantity: Number,
        amount: Number,
        customer_rate: Number,
       // img: Buffer,
        //contentType: String,
    }],
    description:{
        type : String,
        required : true
    },
    vat: {
        type : Number
    },
    totalAmount: {
        type : Number,
    },
    totalAfterVAT:{
        type : Number
    }
});

let Products = module.exports = mongoose.model('Purchase_Order',crmSchema);
