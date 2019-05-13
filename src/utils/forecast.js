const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/291a9359c9c03f59999fd057f5b70e4b/' + latitude + ',' + longitude

    request({url, json : true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to the weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const current = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + current.temperature + ' degrees out. There is a ' + current.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast