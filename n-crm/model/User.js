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
    },
    last_name:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    department:{
        type: String,
    },
    email:{
        type: String,
    },
    gender:{
        type: String,
    },
    date_of_birth:{
        type: Date,
    },
    address:{
        type: String,
    },
    phone:{
        type: String,
    }

});

let Users = module.exports = mongoose.model('Users',crmSchema);
