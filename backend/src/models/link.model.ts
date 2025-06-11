import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        hash: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        }
    }
)

export const Link = mongoose.model("Link", linkSchema)