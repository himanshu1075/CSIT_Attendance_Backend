import express from 'express';
import { deleteFaculty, fetchallfaculties, login, saveFaculty, updateFaculty } from '../controllers/facultyController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const facultyRouter = express.Router();

facultyRouter.post('/savefaculty', saveFaculty);
facultyRouter.get('/fetchallfaculties', fetchallfaculties);
facultyRouter.put('/updatefaculty/:id', updateFaculty);
facultyRouter.post('/faculty/login', login);
facultyRouter.delete('/deletefaculty/:id',verifyToken, deleteFaculty);

export default facultyRouter;