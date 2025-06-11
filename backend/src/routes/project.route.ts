import { Router } from "express"
import z from "zod"
import { User } from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const projectRoutes = Router()

const jwtSecret = `${process.env.JWTSECRET}`;


const signupZodvalidationSchema = z.object({
    email: z.string().email(),
    username: z.string().toLowerCase(),
    password: z.string()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),

})

const signinZodvalidationSchema = z.object({
    username: z.string().toLowerCase(),
    password: z.string()
                .min(8)
                .max(20)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),

})

projectRoutes.post("/signup", async (req , res) => {
    const parsedData = signupZodvalidationSchema.safeParse(req.body)

    try {
        if(!parsedData.success){
            res
            .status(411)
            .json({
                message: "Error in inputs"
            })
            return
        }
    
        const existingEmail = await User.findOne({
                email: parsedData.data.email
        })
        if(existingEmail){
            res
            .status(403)
            .json({
                message: "User already exists with this email"
            })
            return
        }

        const existingUsername = await User.findOne({
                email: parsedData.data.username
        })
        if(existingUsername){
            res
            .status(403)
            .json({
                message: "User already exists with this username"
            })
            return
        }
    
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 5)
    
        await User.create({
            email: parsedData.data.email,
            username: parsedData.data.username,
            password: hashedPassword
        })
    
        res
        .status(200)
        .json({
            message: "Signed up"
        })
    } catch (error) {
        res
        .status(500)
        .json({
            message: "Internal server error",
            error: error
        })
    }
})

projectRoutes.post("/signin", async (req, res) => {
    const parsedData = signinZodvalidationSchema.safeParse(req.body)

    try {
        if(!parsedData.success){
            res
            .status(411)
            .json({
                message: "Error in inputs"
            })
            return
        }

        const user = await User.findOne({
            username: parsedData.data.username
        })

        if(!user) {
            res
            .status(403)
            .json({
                message: "User doen't exist"
            })
            return        
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password)

        if(!isPasswordValid) {
            res
            .status(403)
            .json({
                message: "Invalid credentials"
            })
            return     
        }

        const token = jwt.sign({
            username: parsedData.data.username
        },
        jwtSecret,   
        {
            expiresIn: "7d"
        })

        res
        .status(200)
        .json({
            message: "Login successful",
            token: token            
        })
    } catch (error) {
        res
        .status(500)
        .json({
            message: "Internal server error",
            error: error
        })
    }
})

projectRoutes.post("/content", (req, res) => {

})

projectRoutes.get("/content", (req, res) => {

})

projectRoutes.delete("/content", (req, res) => {

})

projectRoutes.post("/share", (req, res) => {

})

projectRoutes.get("/brain/:shareLink", (req, res) => {

})


export default projectRoutes