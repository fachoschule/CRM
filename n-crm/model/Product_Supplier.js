let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    supplier: {
        id: String,
        name: String
    },
    product: {
        id: String,
        name: String
    },
    quantity:{
        type: Integer
    },
    costPerItem:{
        type: Double
    },
    currency:{
        type: String
    },
    description: {
        type: String
    }
});

let Product_Supplier = module.exports = mongoose.model('Product_Supplier',crmSchema);
