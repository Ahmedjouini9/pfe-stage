const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId :{
        type: String,
      required: true,
    },
    desc: {
        type: String,
        required: true
    },
    numberEmploye: {
        type: Number,
        required: true,
    },
    employePerformance: {
        type: String,
        required: true,
    },
 
    
},
{timesstamps:true}
)

module.exports = Poste = mongoose.model('poste',postSchema);