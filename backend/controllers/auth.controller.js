import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetokens.js";


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

            generatetokenandsetcookie(newuser._id,res);

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

export const login =async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const ispasswordcorrect = await bcrypt.compare(password,user?.password || ""); // "user?.password" is the user entered password , ? is to check if it is null
                                                                                        // OR "" in the above line is f
        if(!user){
            return res.status(400).json({error:"invalid username"});
        }
        if(!ispasswordcorrect){
            return res.status(400).json({error:"invalid password"});

        }

        generatetokenandsetcookie(user._id,res);

        res.status(200).json({
                _id:user._id,
                fullname:user.fullname,
                username:user.username,
                profilepic:user.profilepic
        });


    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
};

export const logout =(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("error in logout controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
};