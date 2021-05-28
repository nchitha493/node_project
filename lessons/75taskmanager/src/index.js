const express = require('express')
require('./db/mongoose')
//const User = require('./models/user')
//const Task = require('./models/task')

const app = express()
const port = process.env.PORT
//const mongooseUrl = process.env.PORT == 3000 
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')


// app.use((req,res,next)=>{
//     if(req.method === 'GET'){

//     } else{
//         next()
//     }
// })
app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

const multer = require('multer')
const upload = multer({
    dest:'images',
    limits:{
        fileSize: 100000
    },
    fileFilter(req,file, cb){
        if (!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error("Please Upload a Word Document"))
        }
         cb(undefined,true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})
app.post('/upload', upload.single('upload') ,(req, res) => {
    res.send()
})

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
// const task = await Task.findById('5f933e592f1c13303fa8fedc')
// await task.populate('owner').execPopulate()
// console.log(task.owner);
// const user = await User.findById('5f968b828e6a7a17321ede88')
// await user.populate('tasks').execPopulate()
// console.log(user.tasks);
// }
// main()