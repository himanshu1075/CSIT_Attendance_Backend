import { StatusCodes } from "http-status-codes";
import { studentModel } from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function saveStudent(request, response) {
    try {
        const newPassword = bcrypt.hashSync(request.body.password, 12);
        request.body['password'] = newPassword;
        const student = new studentModel(request.body);
        const s = await student.save();
        response.status(StatusCodes.CREATED).json(s);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}

export async function fetchStudentSubjectwise(request, response) {
    try {
        const sub = request.params.sub;
        const student = await studentModel.find({$and:[ {"subjects": { $in: [sub] }}, {"section":"csit-2"}]}).sort({ "enrollment": 1 });
        // console.log(student);

        response.status(StatusCodes.OK).json(student);
        // console.log(moment.format("Do MMMM YYYY"));
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}

export async function fetchAllStudents(request, response) {
    try {
        const student = await studentModel.find().sort({ "enrollment": 1 });

        response.status(StatusCodes.OK).json(student);
        // console.log(moment.format("Do MMMM YYYY"));
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}

export async function fetchAttendanceSubjectWise(request, response) {
    try {
        const studen = await studentModel.findOne({$and:[ {"enrollment": request.params.id}]}).select({ _id: 0, ML: 1, SEA: 1, CGMM: 1, CNS: 1, MinorProject: 1, PythonLab: 1, AndroidLab: 1, MLLab: 1, SEALab: 1 })
        const student = (studen).toJSON();
        response.status(StatusCodes.OK).json(student);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message": "Kuch to gadbad h daya"});
    }
}

export async function fetchTotalAttendence(request, response) {
    try {
        const studentss = await studentModel.findOne({ "enrollment": request.params.id }).select({ _id: 0, ML: 1, SEA: 1, CGMM: 1, CNS: 1, MinorProject: 1, PythonLab: 1, AndroidLab: 1, MLLab: 1, SEALab: 1  })
        const student = (studentss).toJSON()
        // const attendenceInML = Object.keys(student.ML).length;
        // const attendenceInSEA = Object.keys(student.SEA).length;
        // const attendenceInCGMM = Object.keys(student.CGMM).length;
        // const attendenceInCNS = Object.keys(student.CNS).length;
        // const total = attendenceInML + attendenceInSEA + attendenceInCGMM + attendenceInCNS;
          
          let totalAttendance = 0;
          let presentAttendance = 0;
          
          const subjects = ["ML",
          "CGMM",
          "SEA",
          "CNS",
          "MLLab",
          "SEALab",
          "MinorProject",
          "PythonLab",
          "AndroidLab"];
          
          for (let subject of subjects) {
            if (student.hasOwnProperty(subject)) {
              const attendance = student[subject];
              const dates = Object.keys(attendance);
          
              for (let date of dates) {
                const value = attendance[date];
                if (value === 1) {
                  presentAttendance++;
                }
                totalAttendance++;
              }
            }
          }
          
          const attendancePercentage = (presentAttendance / totalAttendance) * 100;
          
          response.status(StatusCodes.OK).json({"attendance":attendancePercentage.toFixed(2)})
        //   console.log(`Attendance percentage: ${attendancePercentage.toFixed(2)}%`);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}


export async function updateStudent(request, response) {
    try {
        await studentModel.findOneAndUpdate({ "enrollment": request.params.id }, request.body);
        const student = await studentModel.findOne({ "enrollment": request.params.id });
        response.status(StatusCodes.OK).json(student);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}
export async function updateAttandance(request, response) {
    try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const sub = request.params.subject;
        const student = await studentModel.findOne({ "enrollment": request.params.id });
        request.body[sub] = { ...student[sub], [day + ":" + month + ":" + year]: 1 }
        console.log(request.body[sub]);
        await studentModel.findOneAndUpdate({ "enrollment": request.params.id }, request.body);

        const students = await studentModel.findOne({ "enrollment": request.params.id });
        response.status(StatusCodes.OK).json(students);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}
export async function markAbsent(request, response) {
    try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const sub = request.params.subject;
        const student = await studentModel.findOne({ "enrollment": request.params.id });
        request.body[sub] = { ...student[sub], [day + ":" + month + ":" + year]: 0 }
        // console.log(request.body[sub]);
        await studentModel.findOneAndUpdate({ "enrollment": request.params.id }, request.body);

        const students = await studentModel.findOne({ "enrollment": request.params.id });
        response.status(StatusCodes.OK).json(students);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}

export async function deleteStudent(request, response) {
    try {
        await studentModel.findOneAndRemove({ "enrollment": request.params.id });
        response.status(StatusCodes.OK).json({ "message": "Student removed successfully" });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "message": error.message });
    }
}

export async function login(request, response) {
    try {
        const student = await studentModel.findOne({ "enrollment": request.body.enrollment })

        if (student) {
            if (bcrypt.compareSync(request.body.password, student.password)) {
                const token = jwt.sign({ student: student._id }, "Jai Shree Ram");
                response.status(StatusCodes.OK).json({ token: token })
            }
            else {
                response.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid password" })
            }
        }
        else {
            response.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid enrollment" })
        }

    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}