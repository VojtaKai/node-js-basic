import express from "express"
import { loginView, registerView, registerUser } from "../controllers/loginController"

export const router = express.Router()

router.get("/login", loginView)
router.get("/register", registerView)
router.post("/register", registerUser)
router.get("/", (req, res, _next) => {
    console.log("Path: '/'\nMethod: 'GET'\n========")
    return res.send("ahoj")
})
