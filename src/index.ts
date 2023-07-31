import express from "express"
import { router } from "./routes/login"

const app = Express()

const app = express()
const PORT = process.env.PORT ?? 3000

app.set("view engine", "ejs")

app.use(router)

app.listen(PORT, () => {
    console.log("Server is listening on the port 3000")
})
