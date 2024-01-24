import mongoose from "mongoose";



interface IMachine {
    machine:string,
    production:number,
    watt_consumption:number,
    time:string,
    temperature?:number,
    box?:number
};


const machineSchema = new mongoose.Schema({
    machine : {type:String,required :true},
    production  :{type:Number, required: true },
    watt_consumption:{ type: Number,default:0},
    time: {type: Date,default: Date.now,},    
    temperature: { type: Number},
    box: { type: Number},
    created_at: { type: Date, default: Date.now },
});

const Machine = mongoose.model<IMachine>("machines",machineSchema);


export default Machine;