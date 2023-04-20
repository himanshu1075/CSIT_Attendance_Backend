import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{type:"String", required:true},
    email:{type:"String", required:true, unique:true},
    mobile:{type:"String", required:true, unique:true},
    enrollment:{type:"String", required:true, unique:true},
    section:{type:"String",required:true },
    password:{type:"String", required:true},
    class:{type:"String", required:true},
    subjects:{ },
    ML:{type:"Object",default: -1},
    CGMM:{type:"Object",default: -1},
    SEA:{type:"Object",default: -1},
    CNS:{type:"Object",default: -1},
    MLLab:{type:"Object",default: -1},
    SEALab:{type:"Object",default: -1},
    MinorProject:{type:"Object",default: -1},
    PythonLab:{type:"Object",default: -1},
    AndroidLab:{type:"Object",default: -1}
});

export const studentModel = mongoose.model('student', studentSchema);


