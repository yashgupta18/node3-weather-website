// function to call api
const request=require('request')

const geocode= (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoieWFzaGd1cHRhMTgiLCJhIjoiY2tkNjBld3E2MGx2aDJ1cnQzeG1kYTlpeSJ9.z7kh0P95bg_HOHTbn3gyeA'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to loction services',undefined)
            
        }else if(body.features.length===0){
            callback('unable to connect to loction services.Try another',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode