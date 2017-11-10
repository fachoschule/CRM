let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

let Users = module.exports = mongoose.model('Users',crmSchema);
