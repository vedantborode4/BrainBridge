import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 100    
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true
}
)

export const User = mongoose.model("User", userSchema)