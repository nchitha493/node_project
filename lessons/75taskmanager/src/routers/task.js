const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks',auth,(req, res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(201).status(400).send(error)
    })
})

router.get('/tasks', auth, async (req,res)=>{
    //Task.find({owner:req.user._id})
    // req.user.populate('task').execPopulate().then((tasks)=>{
    //     console.log(tasks);
    //     res.send(req.user.tasks)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed ==='true';
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] == 'asc'? 1 : -1
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth ,(req,res)=>{
    const _id = req.params.id
    console.log(req.user._id);
    //Task.findById(_id).
    Task.findOne({_id,owner:req.user._id}).then((tasks)=>{
        if(!tasks){
            return res.status(404).send()
        }
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send()
    })
})


module.exports = router