import { comaprePassword, convertPasswordToHash, generateToken } from "../lib/utility.js";
import UserModal from "../models/user.models.js";
import jwt from "jsonwebtoken"
export async function SignUpNewUser(req, res) {
    try {
        let ifUserExisits = await UserModal.findOne({ email: req.body.email })
        console.log(ifUserExisits, "ifUserExisits");

        if (ifUserExisits) {
            return res.status(400).send({
                message: "User Already Exsists",
                error: true
            })
        }

        let convertingPasswordToHash = await convertPasswordToHash(req.body.password)
        console.log(convertingPasswordToHash, "hashed password");

        let obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: convertingPasswordToHash,
            role: req.body.role
        }

        const newUser = await UserModal(obj)
        await newUser.save()

        delete obj.password

        let generatingToken = await generateToken(obj)

        res.status(201).json({
            message: "User Created Successfully",
            error: false,
            data: obj,
            token: generatingToken
        })

    } catch (e) {
        res.status(500).send({
            error: true,
            message: e.message
        })
    }
}


export async function getAllUsers(req, res) {
    try {
        let finding = await UserModal.find()
        res.status(200).send({
            message: "All Users Fetched Successfully",
            error: false,
            data: finding
        })
    } catch (e) {
        res.status(500).send({
            error: true,
            message: e.message
        })
    }
}

export async function LoginNewUser(req, res) {
    try {
        let user = await UserModal.findOne({ email: req.body.email });

        if (!user) {
            return res.send({
                message: "User Not Found",
                error: true
            });
        }

        let isPasswordCorrect = await comaprePassword(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.send({
                message: "Password Not Matched",
                error: true
            });
        }

        console.log(isPasswordCorrect);
        console.log(user, "user");

        let generatingToken = await jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_PASSWORD_SECRET_KEY,
            { expiresIn: '60d' }
        );
        console.log(generatingToken, "token");

        res.send({
            message: "Good",
            token: generatingToken 
        });
    } catch (e) {
        console.error(e); 
        res.send({
            message: "error"
        });
    }
}
