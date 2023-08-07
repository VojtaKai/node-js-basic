import { Request, Response } from "express"
import core from "express-serve-static-core"
import { User } from "../models/user"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require("bcryptjs")

export const registerView = (req: Request, res: Response) => {
    res.render("register", {})
}

export const registerUser = async (
    req: Request<
        core.ParamsDictionary,
        null,
        {
            name: string
            email: string
            password: string
            confirm: string
            location: string
        }
    >,
    res: Response
) => {
    console.log("req", req.body)
    const { name, email, location, password, confirm } = req.body

    if (!name || !email || !password || !confirm) {
        console.log("Fill Empty fields")
        res.render("register", {
            name,
            email,
            password,
            confirm
        })
    }

    if (password !== confirm) {
        console.log("Password doesn't match")
    } else {
        try {
            const existingUser = await User.findOne({ email: email })
            if (existingUser) {
                console.log("User already exists")
                res.render("register", {
                    name,
                    email,
                    password,
                    confirm
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    location,
                    password
                })
                const salt = await bcryptjs.genSaltSync(10)

                const passwordHash = await bcryptjs.hash(password, salt)
                newUser.password = passwordHash
                newUser.save()
                res.redirect("login")
            }
        } catch (err) {
            res.status(500).render("register", {
                name,
                email,
                password,
                confirm
            })
        }
    }
    return
}
