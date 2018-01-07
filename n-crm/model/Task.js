let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    things_to_do:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    users: {
        type: String,
        required: true
    }
});

let Tasks = module.exports = mongoose.model('Tasks',crmSchema);
