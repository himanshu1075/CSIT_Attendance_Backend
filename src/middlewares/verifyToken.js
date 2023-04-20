import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export function verifyToken(request, response, next) {
    const authHeader = request.get('Authorization');
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        // console.log(authHeader);
        // console.log(token);
        jwt.verify(token, "Jai Shree Ram", (error, payload)=>{
            if(error) {
                response.status(StatusCodes.UNAUTHORIZED).send({message: "Access Denied"});
            }
            else {
                next();
            }
        })
    }
    else {
        response.status(StatusCodes.UNAUTHORIZED).send({message: "Access Denied"});
    }
}