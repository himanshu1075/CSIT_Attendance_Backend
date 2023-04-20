import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import configureDB from './src/configs/dbConfig.js';
import studentRouter from './src/routers/studentRouter.js';
import cors from "cors";
import facultyRouter from './src/routers/facultyRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(studentRouter);
app.use(facultyRouter);

app.listen((process.env.PORT || 5500), ()=> {
    configureDB();
    console.log(`Server is running on Port ${ process.env.SERVER_PORT}`);
})