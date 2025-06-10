// require("dotenv").config()
import 'dotenv/config'
import express from "express";
import projectRoutes from './routes/project.route';

const app = express()
const PORT = process.env.PORT || 3000

app.use("/api/v1", projectRoutes)

app.listen(PORT)