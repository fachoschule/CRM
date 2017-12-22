let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String
       // required: true
    },
    passwordToken: {
        type: String
    },
    passwordExpires: {
        type: String
    }

});

let Users = module.exports = mongoose.model('Users',crmSchema);
