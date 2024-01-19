import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./fbroutes/fbroutes";

const app = express();
const port  = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("/api",router)


mongoose.connect('mongodb://localhost:27017/emty').then(()=>{
    console.log("MongoDB connected successfully");
}).catch((e)=>{
    console.error(e);
})

app.get("/",(req,res)=>{
    res.send("Welcome to the API");
});



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});


