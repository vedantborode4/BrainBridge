import {Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const JWTSECRET = `${process.env.JWTSECRET}`

export const userAuthMiddelware = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers["authorization"];

    const decoded = jwt.verify(header as string, JWTSECRET)

    if (!header) {
        res
        .status(403)
        .json({ 
            message: "Missing Authorization header" 
        })
        return 
    }
    
    if(decoded) {
        if(typeof decoded === "string"){
            res
            .status(403)
            .json({
                message: "You are not logged in"
            })
            return;
        }

        req.userId = (decoded as JwtPayload).id;

        next()
    } else {
        res
        .status(403)
        .json({
            message: "You are not logged in"
        })
    }
}