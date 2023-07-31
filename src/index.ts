import express from "express"
import { router } from "./routes/login"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

mongoose
    .connect(process.env.MONGODB_CLUSTER_URI as string)
    .then(() => console.log("Connected to the DB"))
    .catch(err => console.log("err", err))

app.set("view engine", "ejs")

app.use(router)

app.listen(PORT, () => {
    console.log("Server is listening on the port 3000")
})
