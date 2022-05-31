const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema ({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true

    },
    domaine:{
        type: String,
        required: true

    },
    pay:{
        type: String,
        required: true
    },
    companyPicture:{
        type: String,
        // required: true
    },
    userId:[
        { 
        type: Schema.Types.ObjectId,
        ref:'User',
        required : true
    }
],
},

)

module.exports = Company = mongoose.model('company',companySchema);
