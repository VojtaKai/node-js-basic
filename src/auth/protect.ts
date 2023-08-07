import { NextFunction, Request, Response } from "express"

export const authenticatedToDashboardRestToLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next()
    }
    console.log("You are not authenticated. Log in first.")
    res.redirect("/login")
}

export const authenticatedStraightToDashboard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard")
    }
    next()
}
