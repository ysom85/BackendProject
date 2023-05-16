import {User} from "../models/user.js"
import bcrypt from "bcrypt"

import sendCookie from "../utils/features.js"
export const getAllUsers = async (req,res)=>{
    const users =  await User.find({})
    const keyword = req.query.keyword;
    console.log(keyword)
     
        res.json({
            sucess: true,
            users: [],
        })
    }
export const register =  async (req,res)=>{

    const {name,email,password} = req.body
    let user = await User.findOne({email})
    if(user) return res.status(404).json({
        sucess: false,
        message: "User Already Exist",
    });
    const hashedPassword = await bcrypt.hash(password,10)
    user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
     
    sendCookie(user, res, "Registerd Sucessfully",201);
}

export const login  = async(req,res,next) =>{
    const {email,password} = req.body
    // here we add.select("+password") because in model or schema password access is false that can not be access direrctly hence here it is called along that.
    const user = await User.findOne({email}).select(" + password");
    if(!user) return res.status(404).json({
        sucess: false,
        message: "Invalid Email or Password",
    });
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(404).json({
        sucess: false,
        message: "Invalid Email or Password",
    });
    sendCookie(user, res, `Welcome Back, ${user.name}`,200)
     
      
}

export const getMyProfile = (req,res) =>{
    
    res.status(200).json({
        sucess: true,
        user: req.user,
    })
}
export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development"? "lax" :  "none",
        secure: process.env.NODE_ENV === "Development"? false : true,
    })
    
    .json({
        sucess: true,
        user: req.user,
    })
}