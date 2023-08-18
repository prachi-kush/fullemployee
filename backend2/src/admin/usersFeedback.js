const express=require('express')
const router =express.Router();
const Feedback = require('../database/feedbackSchema'); // Import the feedback model

router.get('/:key',async(req,res)=>{
  
    try{
        let feedbackData=await Feedback.find(
          
               {"feedbackType":req.params.key}
             
        )
       
        res.send(feedbackData).status(200)
   }catch(errr){
        console.log("errrr",errr)
        res.send(errr)
    }
  })
  module.exports=router;
  