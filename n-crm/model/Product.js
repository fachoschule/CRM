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
        required: true
    },
    image: {
        type: String,
    },
    brand: {
        brand_id : String,
        brand_name : String
    },
    pro_type: {
        type_id: String,
        type_name: String
    },
    description:{
        type: String,
        required: true
    }
});

let Products = module.exports = mongoose.model('Products',crmSchema);
