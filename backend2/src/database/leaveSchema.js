const mongoose=require('mongoose');
const EmployeeLeaveSchema=new mongoose.Schema({

      email: {
        type: String,
        required: true
      },
      leaveType: {
        type: String,
        required: true
      },
      dateFrom: {
        type: String,
        required: true
      },
      dateTo:{
        type:String,
        required: true
      },
      description:{
        type:String,
         required: true
      },
      status:{
        type:String
      }
      
      
      
      
    
})

module.exports=mongoose.model("employeeleaveschemas",EmployeeLeaveSchema)