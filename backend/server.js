import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connecttomongodb from "./db/connecttomongoDB.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);
/*
app.get("/",(req,res)=>{
    res.send("Hello world!!");
});
*/

app.listen(PORT,()=>{
    connecttomongodb()
    console.log(`server running in port ${PORT}`)
});

/*
app.get("/api/auth/login",(req,res)=>{
    console.log("login page")
});

app.get("/api/auth/logout",(req,res)=>{
    console.log("logout page")
});
*/
