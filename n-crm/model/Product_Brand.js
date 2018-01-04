let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    brand_id:{
        type: String,
        uppercase: true,
        require: true
    },
    brand_name:{
        type: String,
        required: true
    }
});

let Brands = module.exports = mongoose.model('Product_Brands',crmSchema);
