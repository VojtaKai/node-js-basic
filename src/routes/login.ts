import express from "express"
import {
    loginView,
    registerView,
    registerUser,
    loginUser,
    dashboardView
} from "../controllers/loginController"

export const router = express.Router()

router.get("/login", loginView)
router.post("/login", loginUser)
router.get("/register", registerView)
router.post("/register", registerUser)
router.get("/dashboard", dashboardView)
router.get("/", (req, res, _next) => {
    console.log("Path: '/'\nMethod: 'GET'\n========")
    return res.send("ahoj")
})
