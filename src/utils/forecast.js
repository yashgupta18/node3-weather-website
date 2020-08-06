const forecast=(address,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&appid=3fce7fdd661ec8fe7c1a6652262a1a42'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Cannot connect to services',undefined)
        }else if(body.error){
            callback('Error in body')
        }else{
            callback(undefined,{
                temp:body.main.temp,
                country:body.weather[0].description
            })
    }
})}

const request=require('request')

module.exports=forecast