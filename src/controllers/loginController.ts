import { Request, Response } from "express"
import core from "express-serve-static-core"
import passport from "passport"

export const loginUser = (
    req: Request<
        core.ParamsDictionary,
        null,
        {
            email: string
            password: string
        }
    >,
    res: Response
) => {
    const { email, password } = req.body

    if (!email || !password) {
        console.log("login credetials missing")
        res.render("login", {
            email,
            password
        })
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res)
    }
}

export const loginView = (req: Request, res: Response) => {
    res.render("login", {})
}
