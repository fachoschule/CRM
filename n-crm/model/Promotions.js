let mongoose = require('mongoose');

// crm schema
let crmSchema = mongoose.Schema({
    promotion_code:{
        type: String,
        uppercase: true,
        require: true
    },
    promotion_name:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },


    description:{
        type: String,

    }
});

let Promotions = module.exports = mongoose.model('Promotions',crmSchema);
