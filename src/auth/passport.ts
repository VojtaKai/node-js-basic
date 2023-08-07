// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require("bcryptjs")
import { PassportStatic } from "passport"
import LocalStrategy from "passport-local"

import { IUser, User } from "../models/user"

const localStrategy = new LocalStrategy.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            console.log("This email is not registered for any user")
            return done(new Error("This email is not registered for any user"))
        }

        // compare password

        try {
            const isMatch = await bcryptjs.compare(password, existingUser.password)
            if (isMatch) {
                return done(null, existingUser)
            }
            console.log("Wrong password")
            return done(new Error("WrongPassword"))
        } catch (err) {
            console.log(err)
        }
    }
)

export const loginCheck = async (passport: PassportStatic) => {
    passport.use(localStrategy)
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser(async (id, done) => {
        const user: IUser | null = await User.findById(id)

        if (user) {
            done(null, user.id)
        }
        done(new Error("User not found"))
    })
}
