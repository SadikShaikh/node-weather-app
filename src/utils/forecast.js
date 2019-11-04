const req = require('request')

const forecast = (lati, long, callback) => {
    const url = 'https://api.darksky.net/forecast/218e140063b2323d34b20b6b68b11c85/' + encodeURIComponent(lati) + ',' + encodeURIComponent(long) + '?units=si'

    req({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot connect to Network!", undefined)
        } else if (body.error) {
            callback("Location invalid", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree temp. And have chance of rain ' + body.currently.precipProbability + '%. Longitude: ' + body.longitude + ' and Latitude: ' + body.latitude + '.')
        }
    })
}

module.exports = forecast