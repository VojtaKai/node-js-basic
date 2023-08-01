import express from "express"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import { router } from "./routes/login"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose
    .connect(process.env.MONGODB_CLUSTER_URI as string)
    .then(() => console.log("Connected to the DB"))
    .catch(err => console.log("err", err))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(jsonParser)
app.use(urlencodedParser)
app.use(router)

app.listen(PORT, () => {
    console.log("Server is listening on the port 3000")
})
