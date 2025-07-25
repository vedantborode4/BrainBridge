// require("dotenv").config()
import 'dotenv/config'
import express from "express";
import projectRoutes from './routes/project.route';
import connectDB from './db/index';
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000 ;
const FRONTENDURL =  process.env.FRONTENDURL ;
connectDB()

app.use(cors({
    origin: FRONTENDURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());
app.use("/api/v1", projectRoutes)

app.listen(PORT)