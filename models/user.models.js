import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    firstName: {type: String , required: true},
    lastName: {type: String},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true},
    role: {type: String , default: "user" , enum: ["user", "admin"]}
})

let UserModal = mongoose.model("users", UserSchema)

export default UserModal;