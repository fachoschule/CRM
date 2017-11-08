let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    supplier: Scheme.Suppliers,
    product: Schema.Products,
    quantity:{
        type: Integer
    },
    description: {
        type: String
    }
});

let Product_Supplier = module.exports = mongoose.model('Product_Supplier',crmSchema);
