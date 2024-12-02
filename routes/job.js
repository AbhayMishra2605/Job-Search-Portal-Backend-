const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Job = require('../schema/job.schema');
const authMiddleware = require('../middleware/auth');
dotenv.config();



router.get('/',async(req,res)=>{
    const jobs=await Job.find()
    res.status(200).json({job:jobs});

})

router.get('/:id',async(req,res)=>{
    const job=await Job.findById(req.params.id)
    if(!job){
        return res.status(404).json({message:'Job not found'})
    }
    res.status(200).json(job);
})



router.delete('/:id',authMiddleware,async(req,res)=>{
    const {id}= req.params;
    const job = await  Job.findById(id);
    const user = req.user.id;
    if(!job){
        return res.status(404).json({message:'Job not found'})
    }
    if(job.user.toString() !== user){
        return res.status(401).json({message:'Unauthorized'})
    }
    await Job.deleteOne({ _id: id });
    res.status(200).json({ message: "Job deleted" });
})

router.post('/',authMiddleware,async(req,res)=>{
    const {companyName,addLogoUrl,jobPosition,salary,jobType,jobDescription,aboutCompany,skillRequired,information,user}=req.body;
    try {
        const user = req.user;
        const job = await Job.create({
            companyName,
            addLogoUrl,
            jobPosition,
            salary,
            jobType,
            jobDescription,
            aboutCompany,
            skillRequired,
            information,
            user: user.id,
        });
        res.status(200).json(job);
    } catch (err) {
        
        res.status(500).json({ message: "Error in creating job" }   );
           
     
    }
})



router.put('/:id',authMiddleware,async(req,res)=>{
    const {id}= req.params;
    const {companyName,addLogoUrl,jobPosition,salary,jobType,jobDescription,aboutCompany,skillRequired,information,user}=req.body;
    const job = await Job.findById(id);
    if(!job){
        return res.status(404).json({message:'Job not found'})
    }
    if(job.user.toString() !== req.user.id){
        return res.status(401).json({message:'You are not authorized to update this job'})
    }
    try{
        await Job.findByIdAndUpdate(id,{
            companyName,addLogoUrl,jobPosition,salary,jobType,jobDescription,aboutCompany,skillRequired,information
        })
        res.status(200).json({message:'Job updated successfully'})
    }catch(e){
        res.status(404).json({message:'Error in updating job'})
        
    }
})


module.exports = router;

