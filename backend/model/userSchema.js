const mongoose = require('mongoose');
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');

const userSchema = new Schema({
    Name:{
        type:String
    },
    Username:{
        type:String,
        unique:true,
        require:[true, 'Name is required']
    },
    Email:{
        type:String,
        lowercase:true,
        unique:[true,'Already registered'],
        require:[true, 'Name is required']
    },
    Password:{
        type:String,
        require:[true, 'Name is required']
    },
    Bio:{
        type:String
    },
    forgotPasswordToken:{
        type:String
    },
    forgetPasswordExpiryDate:{
        type:Date
    }

})

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id, Email:this.Email},
            process.env.SECRET, 
            {expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user', userSchema);
//'user' is collection name in instagram_users database
module.exports = userModel;