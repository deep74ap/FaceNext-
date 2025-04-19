import httpStatus from "http-status";
import {User} from "../models/userModel.js";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";



const login = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).json({message : "Feilds missing"});
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User is not registered"});
        }
        if(bcrypt.compare(password,user.password)){
            let token= crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token: token});
        }
    }
    catch(e){
        res.status(500).json({message:`Something went wrong${e}`});
    }
}






const register = async(req,res)=>{
    const {name,username,password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(httpStatus.FOUND).json({message :"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword,
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"User registered sucessfully"});
    }
    catch(e){
        res.json({message:`Something went wrong ${e}`})
    }
}
export {login , register}