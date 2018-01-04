let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    external_product_id:{
        type: String,
        uppercase: true,
        require: true
    },
    customer:{
        id: String,
        name: String
    },
    img: {
        data: Buffer,
        contentType: String
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: Number,
        require: true
    }
});

let External_Product = module.exports = mongoose.model('External_Products',crmSchema);
