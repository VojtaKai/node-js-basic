import { Request, Response } from "express"

export const loginView = (_req: Request, res: Response) => {
    res.render("login", {})
}

export const registerView = (_req: Request, res: Response) => {
    res.render("register", {})
}
