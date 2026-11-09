import mongoose from "mongoose";
import { enums } from "../../common/index.js";
let userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength : 2,
        maxLength : 50,
        required : true
    },
    lastName : {
        type : String,
        minLength : 2,
        maxLength : 50,
        required : true
    },
    phone : {
        type : String,
        minLength : 2,
        maxLength : 20,
        required : true
    },
    email : {
        type : String,
        minLength : 2,
        maxLength : 50,
        required : true,
        unique : true
    },
    gender : {
        type : Number,
        enum : Object.values(enums.genderEnum)
    },
    role : {
        type : Number,
        enum : Object.values(enums.roleEnum),
        default : enums.roleEnum.user
    },
    password : {
        type : String,
        required : true,
        // select : false
    }
},{
    timestamps : true,
    strict : true,
    strictQuery : true,
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    autoIndex : true
})

userSchema.virtual("userName").set(function (value){
    let [firstName , lastName ,...familyName ] = value.split(" ")
    this.firstName = firstName
    this.lastName = lastName
    this.familyName = familyName ? familyName : ""
}).get(function (){
    return `${this.firstName} ${this.lastName} ${this.familyName}`
})

export const userModel = mongoose.model("user" , userSchema )