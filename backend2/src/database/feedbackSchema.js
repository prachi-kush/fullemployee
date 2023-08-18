const mongoose=require('mongoose');
const feedbackSchema=new mongoose.Schema({

    feedbackType: {
        type: String,
        required: true
      },
      issue: {
        type: String,
        required: true
      },
      solution: {
        type: String,
        required: true
      },
      myname:{
        type:String,
        
      },
      department:{
        type:String,
       
      }
      
      
      
      
      
    
})

module.exports=mongoose.model("feedbackSchema",feedbackSchema)