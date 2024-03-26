import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        require:true
    }
});

export const Project = mongoose.model("Project",projectSchema);

