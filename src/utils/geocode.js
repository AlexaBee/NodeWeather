const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxleGJlZTEiLCJhIjoiY2tkd20zazg5MnNiMTJ4dGFmZG4zOGp0cSJ9.ZcjNd94IZfuAZzfdbjS7aQ&limit=1'
    request({ url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to internet', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {center, place_name} = response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
                  }
            )
        }
    })
}

module.exports = geocode;