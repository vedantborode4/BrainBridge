import mongoose from "mongoose";

const contentTypes = ["image", "article", "video", "audio", "tweet"]

const contentSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: contentTypes
        },
        tags: [{
            type: mongoose.Types.ObjectId,
            ref: "Tag"
        }],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
    }
)

export const Content = mongoose.model("Content", contentSchema)