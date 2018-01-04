let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    product_id:{
        type: String,
        uppercase: true,
        require: true
    },
    product_name:{
        type: String,
       // required: true
    },
    image: {
        img: Buffer,
        contentType : String
    },
    brand: {
        brand_id : String,
        brand_name : String
    },
    pro_type: {
        type_id: String,
        type_name: String
    },
    final_cost:{
        cost: Number,
        currency: String
    },
    external_codes: [{
        code : String,
        code_name: String,
        customer : String
    }],
    description:{
        type: String,
        //required: true
    }
});

let Products = module.exports = mongoose.model('Products',crmSchema);
