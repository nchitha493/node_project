const request = require('request')
const forecast = (longitude,latitude,callback) =>{
    const weatherurl = 'http://api.weatherstack.com/current?access_key=b640c90d9751ee805c6682f91ffad8a8&query='+latitude+','+longitude+'&units=f';
    request({url:weatherurl,json:true},(error,{body})=>{
        //console.log(response.body);
            callback("",body.current.weather_descriptions[0])
        })
}

module.exports = forecast