import express from 'express';
import { deleteStudent, fetchAllStudents, fetchAttendanceSubjectWise, fetchStudentSubjectwise, fetchTotalAttendence, login, markAbsent, saveStudent, updateAttandance, updateStudent } from '../controllers/studentController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const studentRouter = express.Router();

studentRouter.post('/savestudent', saveStudent);
studentRouter.get('/fetchallstudents', fetchAllStudents);
studentRouter.get('/3rdyear/csit-2/subjects/:sub',verifyToken, fetchStudentSubjectwise);
studentRouter.put('/updatestudent/:id', updateStudent);
studentRouter.put('/updateattandance/:subject/:id', updateAttandance);
studentRouter.put('/markabsent/:subject/:id', markAbsent);
studentRouter.post('/student/login', login);
studentRouter.delete('/deletestudent/:id',verifyToken, deleteStudent);
studentRouter.get('/fetchTotalAttendence/:id',fetchTotalAttendence);
studentRouter.get('/student/academics/attendance/:id',fetchAttendanceSubjectWise);

export default studentRouter;