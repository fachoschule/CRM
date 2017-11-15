let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

// crm schema
let crmSchema = mongoose.Schema({

    gender:{
      type: String,
    },
    last_name:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    date_of_birth:{
        type: Date
    },
    department:{
        type: String,
    },
    address:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
    }
});
crmSchema.plugin(uniqueValidator);
let Employees = module.exports = mongoose.model('Employees',crmSchema);
