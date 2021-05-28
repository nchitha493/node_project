const http=require('http');
const weatherurl = 'http://api.weatherstack.com/current?access_key=b640c90d9751ee805c6682f91ffad8a8&query=nagercoil&units=f';

const request = http.request(weatherurl,(response)=>{
    let data= '';
    response.on('data',(chunk)=>{
        data= data+chunk.toString()
        
    })
    response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(body);
    })
})
request.on('error',(error)=>{
    console.log(error);
})
request.end()