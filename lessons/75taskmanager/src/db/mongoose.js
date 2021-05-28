const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true
})



// const task = mongoose.model('task',{
//     description:{
//         type: String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type: Boolean,
//         default:false
//     }
// })

// const Addtask = new task({
//     description: "           Task Description 1"
// })

// Addtask.save().then(()=>{
//     console.log(Addtask)
// }).catch((error)=>{
//     console.log("errors! ",error);
// })