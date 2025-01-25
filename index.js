import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./lib/dbConnect.js"
import authRouter from "./routes/auth.route.js"

let app = express()
let port = process.env.PORT


app.use(cors())
app.use(express.json())
dotenv.config()


app.use("/api/auth" , authRouter)

app.listen(4000 , () => {
    console.log("Server is runnig on port " + process.env.PORT)
    connectDB()
})