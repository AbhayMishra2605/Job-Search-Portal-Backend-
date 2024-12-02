const mongoose = require("mongoose");



const jobSchema= new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    addLogoUrl:{
        type:String,
        required:true
    },
    jobPosition:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    jobType:{
        type: String,
        required: true,
        enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    jobDescription:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
        required:true,
    },
    skillRequired:{
        type:[String],
        required:true,
        enum:["html","json","JavaScript","React","mongodb","express","Node.js", "SQL"]
    },
    information:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

module.exports= mongoose.model("Job",jobSchema);


