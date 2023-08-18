const mongoose=require('mongoose');
const url='mongodb+srv://prachik:123mongo@cluster0.3wkntez.mongodb.net/EmployeeManagement?retryWrites=true&w=majority';



const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log('Error Connecting to database');
})