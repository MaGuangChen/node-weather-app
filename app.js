const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const getWeather = require('./getWeather/getWeather');
// .option() method可以定義我們要傳入的option

const argv = yargs
.option({
    a: {
        demand: true,
        alias: 'address',
        string: true,
        describe: 'Address to fetch weather for'
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        getWeather.getWeather(results.latitude, 
            results.longtitude, (err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(`latitude: ${res.lat}`);
                    console.log(`longitude: ${res.lng}`);
                    console.log(`current temperature ${res.currentTemperature}`);
                }    
        });
    }
});