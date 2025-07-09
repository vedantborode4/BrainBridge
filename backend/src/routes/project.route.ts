import { Router } from "express"
import z from "zod"
import { User } from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userAuthMiddelware } from "../middlewares/user.auth.middleware"
import { Content } from "../models/content.model"
import { Tag } from "../models/tag.model"
import { Link } from "../models/link.model"
import { random } from "../utils/random"

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

const contentZodvalidationSchema = z.object({
    title: z.string(),
    link: z.string(),
    tags: z.array(z.string()),
    type: z.enum(["image", "article", "video", "audio", "tweet"])
})

const deleteZodvalidationSchema = z.object({
    contentId: z.string()
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
                username: parsedData.data.username
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
                message: "User doesn't exist"
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
            id: user._id
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

projectRoutes.post("/content", userAuthMiddelware, async (req, res) => {

    const parsedData = contentZodvalidationSchema.safeParse(req.body)
    
    const userId = req.userId

    if(!parsedData.success){
        res
        .status(411)
        .json({
            message: "Error in inputs"
        })
        return
    }
    
    try {
        const {tags} = parsedData.data

        const tagsId = []

        for(const tagTitle of tags) {
            const normalizedTitle = tagTitle.toLowerCase().trim()

            let tag = await Tag.findOne({
                title: normalizedTitle
            }) 

            if(!tag) {
                tag = await Tag.create({
                    title: normalizedTitle
                })
            }

            tagsId.push(tag._id)
        }

        await Content.create({
            title: parsedData.data.title,
            link: parsedData.data.link,
            tags: tagsId,
            type: parsedData.data.type,
            userId: userId
        })

        res
        .status(200)
        .json({
            message: "content has been created"
        })

    } catch (error) {
        res
        .status(403)
        .json({
            message: "error while creating content"
        })
    }
})

projectRoutes.get("/content", userAuthMiddelware, async (req, res) => {

    const userId = req.userId

    const content = await Content.find({
        userId: userId
    })

    res
    .status(200)
    .json({
        content
    })
})

projectRoutes.delete("/content", userAuthMiddelware,  async (req, res) => {

    const userId = req.userId

    const parsedData = deleteZodvalidationSchema.safeParse(req.body);
    
    if (!parsedData.success) {
        res
        .status(403)
        .json({ 
            message: "Invalid content ID" 
        });
        return
    }

    const contentId = parsedData.data.contentId

    await Content.deleteOne({
        _id: contentId,
        userId
    })

    res
    .status(200)
    .json({
        message: "content deleted successfully"
    })
    
})

projectRoutes.post("/share", userAuthMiddelware, async (req, res) => {
    const share = req.body.share 

    if(share){

        const existingLink = await Link.findOne({
            userId : req.userId
        })

        if(existingLink){
            res
            .status(200)
            .json({
                message: "sharable link already exists",
                hash: existingLink.hash
            })
            return
        }

        const hash = random(10);

        await Link.create({
            userId: req.userId,
            hash: hash
        })
        
        res
        .status(200)
        .json({
            message: "created sharable link",
            hash: hash
        })
    } else {
        await Link.deleteOne({
            userId: req.userId
        })

        res
        .status(200)
        .json({
            message: "deleted sharable link"
        })
    }
})

projectRoutes.get("/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
        hash
    })

    if (!link) {
        res
        .status(403)
        .json({
            message: "Incorrect input"
        })
        return
    }

    const content = await Content.find({
        userId: link.userId
    })

    const user = await User.findOne({
        _id: link.userId
    })

    if (!user) {
        res
        .status(403)
        .json({
            message: "user not found, error should ideally not happens"
        })
        return
    }

    res
    .status(200)
    .json({
        username: user.username,
        content: content
    })
})


export default projectRoutes