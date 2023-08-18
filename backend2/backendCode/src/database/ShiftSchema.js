const mongoose=require('mongoose');
const ShiftSchema=new mongoose.Schema({

      email: {
        type: String,
        required: true,
        unique:true,
      },
      shiftType:{
        type: String,
        required: true
      },
      dateFrom: {
        type: String,
        required: true
      },
      reason:{
        type:String,
         required: true
      },
      status:{
        type:Boolean
      }
      
      
      
    
})

module.exports=mongoose.model("emplyeeshiftschemas",ShiftSchema)