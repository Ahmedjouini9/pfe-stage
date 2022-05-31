const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String},
    lastname: { type: String},
    phonenumber: { type: String},
    address: { type: String},
    region: { type: String},
    country: { type: String},
    email: { type: String, required: true ,unique: true },
    password: { type: String, required:true },
    isAdmin: {type: Boolean,default: false,},
    isClient: {type: Boolean,default: false,},
    img: { type: String },
    history: {type:Array,default:[]},
},
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
