import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utilis/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/email.js";


export const signup = async (req,res) => {
    const {email, password, name} = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExist = await User.findOne({email});
        if (userAlreadyExist) {
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 2000
        })

        await user.save();

        //jwt 
        generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });


    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
};

export const login = async (req,res) => {
    res.send("Login route")
};

export const logout = async (req,res) => {
    res.send("Logout route")
}