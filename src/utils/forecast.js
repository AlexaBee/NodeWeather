const request = require('request')

const forecast = ({latitude, longitude, location} = {}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=68234e6b81cee2b69ccb0ffd9bd4cfec&query=' 
    + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to internet', undefined)
        } else if (body.error) {
            callback('Undefind params', undefined)
        } else {
            const {temperature, feelslike} = body.current
            callback(undefined, {forecast: 'It is currently ' + temperature + 
            ' degrees out. It feels like ' + feelslike + ' degreese out.', location})
        }
    })
}

module.exports = forecast