import mongoose, { Document } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
    location: string
    date: Date
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "New York"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema)
