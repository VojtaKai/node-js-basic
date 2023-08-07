import { Request, Response } from "express"

export const dashboardView = (req: Request, res: Response) => {
    res.render("dashboard", {
        user: req.user
    })
}
