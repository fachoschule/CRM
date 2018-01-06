let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    myInput:{
        type: String,
        uppercase: true,
        require: true
    },
    status:{
        type: String,

    }
});

let todolist = module.exports = mongoose.model('todolist',crmSchema);
