require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f8b3c4a51ae484d26692cf5').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async (id) =>{
    const task = await Task.findByIdAndDelete(id);
    const count  = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('5f8b3cd313e2a44d4e98e09d').then((count) => {
    console.log(count);
}).catch((e)=>{
    console.log(e);
})