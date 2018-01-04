let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    proType_id:{
        type: String,
        uppercase: true,
        require: true
    },
    proType_name:{
        type: String,
        required: true
    }
});

let ProductTypes = module.exports = mongoose.model('Product_Types',crmSchema);
