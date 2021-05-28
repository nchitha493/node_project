const express = require('express')
//const bcrypt =  require('bcryptjs')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Only upload jpg, jpeg, png"))
        }
         cb(undefined,true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})

const {sendWelcomeEmail} = require('../emails/account')

const router = new express.Router()

router.get('/test',(req,res) => {
    res.send('From a new file')
})

router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
        //res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.post('/users/logout',auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req, res)=>{
    try{
        req.user.tokens = []

        await req.user.save()
        res.send()
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user)
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error:error.message})
})

router.get('/users/:id/avatar', async (req, res)=>{
    const user = await User.findById(req.params.id)
    try{
        if(!user.avatar)
        {
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
},(error,req,res,next) => {
    res.status(400).send({error:error.message})
})

router.get('/users', auth , async (req,res)=>{
    
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.post('/users/login',async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        res.status(404).send(e)
        console.log(e)
    }
    res.send('sss')
})

router.get('/users/:id',  auth ,async (req,res)=>{
    const _id = req.params.id
    try{
        const users = await User.findById(_id);
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then((users)=>{
    //     if(!users){
    //         return res.status(404).send()
    //     }
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.patch('/users/me', auth ,async (req, res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try{
        const user = req.user

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/users/:id', auth ,async (req, res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try{
        const user = await User.findById(_id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        //const user = await User.findByIdAndUpdate(_id , req.body, {new: true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth ,async (req, res)=>{
    const _id = req.user.id

    try{
        // const user = await User.findByIdAndDelete(_id)
        // if(!user){
        //     return res.status(404).send()
        // }
        req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', auth ,async (req, res)=>{
    const _id = req.params.id

    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router