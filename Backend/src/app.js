import express from "express";
import {createServer} from "node:http";
import {connectToSocket} from "./controllers/socketManager.js"
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = connectToSocket(server);
import userRoutes from "./routes/userroute.js"

app.set("port",(process.env.PORT || 8000))

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);
 const start = async() =>{
app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://deepak09012004:Deepak%40123@cluster0.bpsprnw.mongodb.net/")
    console.log(`MongoDB connected ${connectionDB.connection.host}`);
    
    server.listen(app.get("port"),()=>{
        console.log("Listning on port 8000");
    });
};
start();