
const request = require('request')

const geocode = (address,callback)=>{
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiY2hpdGhhIiwiYSI6ImNrZzZqdGxzNTE0emoyc3IyZXQydXpkN3IifQ.0l5iH1fYDPc_icPeQHwKDA&limit=1";
    request({url:geoCodeUrl,json:true},(error,{body})=>{
            //console.log(response.body.features[0].center[0]);
            callback("",{latitude:body.features[0].center[1],longitude:body.features[0].center[0]})
        })
}
module.exports = geocode