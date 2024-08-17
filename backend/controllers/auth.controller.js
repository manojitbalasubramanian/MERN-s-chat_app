import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup =async(req,res)=>{
    try {
        const {fullname,username,password,confrimpassword,gender} = req.body;

        if(password!==confrimpassword){
            return res.status(400).json({error:"password doesn't match"})
        }

        const user = await User.findOne({username});//findone in to find the user in mongodb

        if(user){
            return res.status(400).json({error:"username already exist"})
        }

        // HASH PASS HERE
        const salt = await bcrypt.genSalt(10) //the value 10 denotes the time interval
        const hashedpassword = await bcrypt.hash(password,salt)

        // avatar img
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullname,
            username,
            password:hashedpassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newuser){
            await newuser.save();

            res.status(201).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                username:newuser.username,
                password:newuser.password,
                profilepic:newuser.profilepic
            })// insterd of .json ,json makes err
        }
        else{
            res.status(400).json({error:"invalid user data"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
};

export const login =(req,res)=>{
    console.log("loginuser");
    res.send("hi")
};

export const logout =(req,res)=>{
    console.log("logoutuser");
};