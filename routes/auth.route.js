import express from "express"
import { loginUser, SignUpNewUser } from "../controllers/auth.controllers.js";

let authRouter = express.Router();

authRouter.post("/signup", SignUpNewUser)
authRouter.post("/login" , loginUser)
export default authRouter