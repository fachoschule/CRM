let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    last_name:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact_phone:{
        type: String,
        required: true
    },
    adress:{
        type: String
    }
});

let Customers = module.exports = mongoose.model('Customers',crmSchema);
