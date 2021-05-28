const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please give valid email')
            }
        }
    },
    age: {
        type: Number,
        defaut:1,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        vadidate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password Should not be a password")
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            require: true
        }
    }],
    avatar: { 
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref:'task',
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObject  = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString() },'thisismycourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
 const user = await User.findOne({email})
 if(!user) {
     throw new Error('Unable to login')
 }

 const isMatch = await bcrypt.compare(password, user.password)
 if(!isMatch) {
     throw new Error('Unable to login')
 }

 return user
}

userSchema.pre('save',async function(next){
    const user = this
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
// const me = new User({
//     name:'       Chitha',
//     email:'sSs@Gmail.COM',
//     password: 'password'
// })

// me.save().then(()=> {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })