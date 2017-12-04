const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.option({
    a: {
        demand: true,
        alias: 'address',
        string: true,
        describe: 'Address to fetch weather for',
    }
}).help().alias('help', 'h').argv;

const encodeAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeUrl)
.then((res) => {
    if(res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    const address = res.data.results[0].formatted_address;
    const location = res.data.results[0].geometry.location;
    const weatherUrl = `https://api.darksky.net/forecast/9b753a730aaf93ce05dbf7c4525a7fe9/${location.lat},${location.lng}`;
    console.log(address);
    return axios.get(weatherUrl);
})
.then((res) => {
    const temparture = res.data.currently.temperature;
    const apparentTemperature = res.data.currently.apparentTemperature;
    console.log(`目前溫度為華式 ${temparture}, 體感溫度華式 ${apparentTemperature}`);
})
.catch((e) => {
    if(e.code === 'ENOTFOUND') console.log('Unable to connect api server');
    else console.log(e.message);
});
