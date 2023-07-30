import Express from "express"

const app = Express()

const PORT = process.env.PORT ?? 3000

app.get("/", (req, res, _next) => {
    console.log("Path: '/'\nMethod: 'GET'\n========")
    return res.send("ahoj")
})

app.listen(PORT, () => {
    console.log("Server is listening on the port 3000")
})
