const request = require('request');

// forcast.io的api key
// 9b753a730aaf93ce05dbf7c4525a7fe9
const getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/9b753a730aaf93ce05dbf7c4525a7fe9/${latitude},${longitude}`,
        json: true,
    }, (err, res, body) => {
        if(err) {
            callback('can not connect the forecast server');
        } else if(res.statusCode === 404) {
            console.log('can not fetch weather');
        } else if(!err && res.statusCode === 200) {
            const sendBackRes = {
                lat: body.latitude,
                lng: body.longitude,
                currentTemperature: body.currently.temperature,
            }
            callback(undefined, sendBackRes);
        }
    });
}

module.exports.getWeather = getWeather;