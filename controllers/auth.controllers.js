import { convertPasswordToHash, generateToken } from "../lib/utility.js";
import UserModal from "../models/user.models.js";

export async function SignUpNewUser(req, res) {
    try {
        let ifUserExisits = await UserModal.findOne({ email: req.body.email })
        console.log(ifUserExisits , "ifUserExisits");
        
        if (ifUserExisits) {
            return res.status(400).send({
                message: "User Already Exsists",
                error: true
            })
        }

        let convertingPasswordToHash = await convertPasswordToHash(req.body.password)
        console.log(convertingPasswordToHash , "hashed password");
        
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