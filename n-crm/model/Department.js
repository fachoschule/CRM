let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

// crm schema
let crmSchema = mongoose.Schema({

    name:{
        type: String,
    },
    location:{
        type: String,
    }
});
crmSchema.plugin(uniqueValidator);
let Department = module.exports = mongoose.model('Departments',crmSchema);
