import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    name:{type:"String", required:true},
    email:{type:"String", required:true, unique:true},
    mobile:{type:"String", required:true, unique:true},
    password:{type:"String", required:true},
});

export const facultyModel = mongoose.model('faculty', facultySchema);


