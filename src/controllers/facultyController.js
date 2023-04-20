import { StatusCodes } from "http-status-codes";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { facultyModel } from "../models/facultyModel.js";




export async function saveFaculty(request, response) {
    try {
        const newPassword = bcrypt.hashSync(request.body.password, 12);
        request.body['password']=newPassword;
        const faculty = new facultyModel(request.body);
        const s = await faculty.save();
        response.status(StatusCodes.CREATED).json(s);
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR).json({"message":error.message});
    }
}



export async function login(request, response) {
    try {
        const faculty = await facultyModel.findOne({"email": request.body.email})

        if(faculty) {
            if(bcrypt.compareSync(request.body.password, faculty.password)) {
                const token = jwt.sign({faculty:faculty._id}, "Jai Shree Ram");
                response.status(StatusCodes.OK).json({token:token})
            }
            else {
                response.status(StatusCodes.BAD_REQUEST).json({message:"Invalid password"})
            }
        }
        else {
            response.status(StatusCodes.BAD_REQUEST).json({message:"Invalid enrollment"})
        }

    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.message});
    }
}


export async function fetchallfaculties(request, response) {
    try {
        const faculty = await facultyModel.find();
        
        response.status(StatusCodes.OK).json(faculty);
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR).json({"message":error.message});
    }
}
export async function updateFaculty(request, response) {
    try {
        await facultyModel.findOneAndUpdate({"email":request.params.id}, request.body);
        const faculty = await facultyModel.findOne({"email":request.params.id});
         response.status(StatusCodes.OK).json(faculty);
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR).json({"message":error.message});
    }
}

export async function deleteFaculty(request, response) {
    try {
        await facultyModel.findOneAndRemove({"email":request.params.id});
         response.status(StatusCodes.OK).json({"message":"Faculty data removed successfully"});
    } catch (error) {
        response.status( StatusCodes.INTERNAL_SERVER_ERROR).json({"message":error.message});
    }
}
