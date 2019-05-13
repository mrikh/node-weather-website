const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmlraCIsImEiOiJjanVkMHJjbXMwMmljNDRtdHg4aXBhcWpyIn0.CB5gbTryA8N3bUo4NCcD0g&limit=1'
    request({url, json : true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to the service!', undefined)
        }else if (body.error || body.features.length == 0){
            callback('Unable to fetch your location. Try something else.', undefined)
        }else{
            const location = body.features[0]
            callback(undefined, {
                latitude : location.center[1],
                longitude : location.center[0],
                location : location.place_name
            })
        }
    })
}

module.exports = geocode 