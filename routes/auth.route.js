import express from "express"
import { getAllUsers, SignUpNewUser } from "../controllers/auth.controllers.js";

let authRouter = express.Router();

authRouter.post("/signup", SignUpNewUser)
authRouter.post("/login" , SignUpNewUser)
authRouter.get("/allUsers", getAllUsers)
export default authRouter