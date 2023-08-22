const mongoose=require('mongoose');
const url='mongodb+srv://prachik:123mongo@cluster0.3wkntez.mongodb.net/EmployeeManagement?retryWrites=true&w=majority';


//  Hi Prachi K

//Thank you for signing up! You've made an excellent decision! I am Kuk, the co-founder of ZEGOCLOUD, and I will help you onboard in a very short time. 

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log('Error Connecting to database');
})