const req = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FkaWtiYXNoYXNoYWlraCIsImEiOiJjazJlZDFxaTgwODliM2JtbWNmNXhqczEwIn0.eXNg_f8rlMetMdlUSopuOg&limit=1'

    req({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot connect to mapbox!!", undefined)
        } else if (!body.features[0]) {
            callback("Locaton invalid!!", undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}


module.exports = geocode