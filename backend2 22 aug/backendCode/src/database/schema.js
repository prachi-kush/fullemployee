const mongoose=require('mongoose');
const jwt =require('jsonwebtoken')
const SECRET_Key='ttttttttttttttttt';

const EmployeeSchema=new mongoose.Schema({
    name: {
        type: String,
        //required: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },
      number: {
        type: String,
        //required: true
      },
      address: {
        type: String,
       // required: true
      },
      joiningDate:{
        type:String,
      },
      dob:{
        type:String,
      },
      department:{
        type:String,
      },
      education:{
        type:String,
      },
      motherName:{
        type:String,
      },
      fatherName:{
        type:String,
      },
      gender:{
        type:String,
      },
      imageUrl: {
        type: String
      },
      password: {
        type: String,
        required: true
      },
    age:{
        type:String,
        //required:true
    },
    skills:{
      type:String,
    },
    isApproved: {
        type: Boolean,
        default: false
      },
      tokens:[
        {
            token:{
                type:String,
                required:true 
            }
        }
      ]
   // refreshToken:String
})


//generating tokens===============
EmployeeSchema.methods.generateAuthToken=async function(){
    try{
          let token=jwt.sign({_id:this._id},SECRET_Key)
          this.tokens=this.tokens.concat({token:token});
          await this.save();
          return token;
       }catch(err){
        console.log(err)
    }
}

module.exports=mongoose.model("employeeschemas",EmployeeSchema)