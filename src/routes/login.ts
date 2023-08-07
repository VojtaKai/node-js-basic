import express from "express"
import {
    loginView,
    registerView,
    registerUser,
    loginUser,
    dashboardView
} from "../controllers/loginController"
import {
    authenticatedToDashboardRestToLogin,
    authenticatedStraightToDashboard
} from "../auth/protect"

export const router = express.Router()

router.get("/login", authenticatedStraightToDashboard, loginView)
router.post("/login", loginUser)
router.get("/register", authenticatedStraightToDashboard, registerView)
router.post("/register", registerUser)
router.get("/dashboard", authenticatedToDashboardRestToLogin, dashboardView)
router.get("/", (req, res, _next) => {
    console.log("Path: '/'\nMethod: 'GET'\n========")
    return res.send("ahoj")
})
