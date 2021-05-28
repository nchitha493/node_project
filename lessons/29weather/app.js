// const request = require('request')

// const weatherurl = 'http://api.weatherstack.com/current?access_key=b640c90d9751ee805c6682f91ffad8a8&query=nagercoil&units=f';

// const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/nagercoil.json?access_token=pk.eyJ1IjoiY2hpdGhhIiwiYSI6ImNrZzZqdGxzNTE0emoyc3IyZXQydXpkN3IifQ.0l5iH1fYDPc_icPeQHwKDA&limit=1";
// request({url:geoCodeUrl,json:true},(error,response)=>{
//     console.log(response.body.features[0].center[0]);
// })
// request({url:weatherurl,json:true},(error,response)=>{
//     console.log(response.body.current.weather_descriptions[0])
// })
const geocode = require('./geoCode.js')
const forecast = require('./forecast.js')
//const request = require('request')
//const yargs = require('yargs')
const address = process.argv[2]
geocode(address,(error,{longitude,latitude}={})=>{
    //console.log(data);
    forecast(longitude, latitude, (error, data) => {
        console.log('Error', error)
        console.log('Data', data)
      })
})




