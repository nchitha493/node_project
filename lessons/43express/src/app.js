const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

console.log(path.join(__dirname,'../public'));

const app = express()

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handelbars engine and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Chitha'
    })
})
app.get('/about' , (req,res) => {
    res.render('about',{
        name:'chitha',
        age:27,
        title:'About',
    })
})
// app.get('/about' , (req,res) => {
//     res.send('about Page')
// })
app.get('/weather' , (req,res) => {


    geocode(req.query.address,(error,{longitude,latitude}={})=>{
        //console.log(data);
        forecast(longitude, latitude, (error, data) => {
            console.log('Error', error)
            console.log('Data', data)
            res.send({
                product:data
            })
          })
    })
    // res.render('weather',{
    //     forecast:'Snowing',
    //     location:'nagercoil',
    //     title:'Weather'
    // })
})

app.get('/products' , (req,res) => {
    console.log(req.query);
    res.send({
        product:[]
    })
})

app.get('/weather/*',(req,res)=>{
    res.send('weather article not found');
})

app.get('*',(req,res)=>{
    res.send('My 404 page');
})

// app.get('/weather' , (req,res) => {
//     res.send('weather Page')
// })
app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})