import express from "express"
import { SignUpNewUser } from "../controllers/auth.controllers.js";

let authRouter = express.Router();

authRouter.post("/signup", SignUpNewUser)

export default authRouter