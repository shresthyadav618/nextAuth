import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
username : {
    type:String,
    required: [true ," please specify the username"]
},

email : {
    type : String,
    required: [true,"please specify the email"]
},
password : {
    type : String,
    required: [true,"please specify the password"]
},
isVerified : {
    type : Boolean,
    default : false
},
isAdmin : {
    type: Boolean,
    default: false
},
forgotPasswordToken : String,
forgotPasswordTokenExpiry : Date,
verifyToken : String,
verifyTokenExpiry : Date,

});

const userModel = mongoose.models.User || mongoose.model("User",userSchema);

export default userModel;