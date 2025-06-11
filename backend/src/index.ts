// require("dotenv").config()
import 'dotenv/config'
import express from "express";
import projectRoutes from './routes/project.route';
import connectDB from './db/index';

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use("/api/v1", projectRoutes)

app.listen(PORT)