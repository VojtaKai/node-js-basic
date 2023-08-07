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
            return done(null)
        }

        // compare password

        try {
            const isMatch = await bcryptjs.compare(password, existingUser.password)
            if (isMatch) {
                return done(null, existingUser)
            }
            console.log("Wrong password")
            return done(null)
        } catch (err) {
            console.log(err)
            return done(null)
        }
    }
)

export const loginCheck = async (passport: PassportStatic) => {
    passport.use(localStrategy)
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user: IUser | null = await User.findById(id)
            done(null, user)
        } catch {
            console.log("User not found")
            done(null)
        }
    })
}
