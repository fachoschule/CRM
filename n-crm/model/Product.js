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
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    }
});

let Products = module.exports = mongoose.model('Products',crmSchema);
