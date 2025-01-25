import { comaprePassword, convertPasswordToHash, generateToken } from "../lib/utility.js";
import UserModal from "../models/user.models.js";

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




export async function loginUser(req, res) {
    try {
        let ifUserExisits = await UserModal.findOne({ email: req.body.email })
        console.log(ifUserExisits, "ifUserExisits");

        if (!ifUserExisits) {
            return res.status(400).send({
                message: "User Not Exsists",
                error: true
            })
        }

        let convertingPasswordToHash = await comaprePassword(req.body.password , ifUserExisits.password)
        console.log(convertingPasswordToHash, "hashed password");

        // let obj = {
            // firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     password: convertingPasswordToHash,
        //     role: req.body.role
        // }

        // const newUser = await UserModal(obj)
        // await newUser.save()

        // delete obj.password

        let generatingToken = await generateToken(ifUserExisits)

        res.status(201).json({
            message: "User Login Successfully",
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


// export async function loginUser(req, res) {
//     try {
//         const { email, password } = req.body;

//         // Find user by email or CNIC
//         const user = await UserModal.findOne({
//             email: email,
//         });

//         if (!user) {
//             return res.status(400).json({ error: "User not found!" });
//         }

//         console.log(user, "user in login");


//         // Compare password
//         const isMatch = await comaprePassword(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid credentials!" });
//         }

//         // Generate JWT token
//         const token = generateToken(user);

//         res.status(200).json({
//             message: "Login successful!",
//             token,
//             user: { _id: user._id, name: user.name, role: user.role, email: user.email, CNIC: user.CNIC },
//         });
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// }