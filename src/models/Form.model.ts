import mongoose, { Schema } from "mongoose";

interface User extends Document{
    Email : string,
    Password:string,
}

const userloginschema = new mongoose.Schema({
    Email: {type :String , required : true},
    Password: {type :String , required : true}
});


const userlogins = mongoose.model<User>("LoginsData",userloginschema);

export default userlogins;