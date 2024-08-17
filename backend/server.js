import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connecttomongodb from "./db/connecttomongoDB.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;


app.use(express.json());

app.use("/api/auth",authRoutes);

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
