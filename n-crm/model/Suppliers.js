let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    supplier_id:{
        type: String,
        uppercase: true,
        require: true
    },
    supplier_name:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    contact_phone: {
        type: String
    },
    tax_number: {
        type: String
    },
    fax_number: {
        type: String
    }
});

let Suppliers = module.exports = mongoose.model('Suppliers',crmSchema);
