import mongoose, { model } from "mongoose";

const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    labels:{
        type:[String],
        default:[]
    },
    author:{
        type:String,
        require:true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        require:true
    }
});

export const Issue = mongoose.model("Issue",issueSchema);




