import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true,
         match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
    ]
    },
       password: {
        type: String,
        required: [true, "Password is required"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        ]
    }

})

const User=mongoose.model("User",userSchema)
export default User;