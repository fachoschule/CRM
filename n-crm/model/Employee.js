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
    username:{
        type: Schema.Types.user,
        required: true
    },
    date_of_birth:{
        type: Date
    },
    department:{
        type: String,
        required: true
    }
});

let Employees = module.exports = mongoose.model('Employees',crmSchema);
