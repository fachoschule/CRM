let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

// crm schema
let crmSchema = mongoose.Schema({

    role:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
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
    },
    password:{
        type: String,
        required: true
    },
    passwordToken: {
        type: String
    },
    passwordExpires: {
        type: String
    }
});
crmSchema.plugin(uniqueValidator);
let Employees = module.exports = mongoose.model('Employees',crmSchema);
