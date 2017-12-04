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
        const { latitude, longtitude } = results;
        getWeather.getWeather(latitude, longtitude, (err, weaterRes) => {
                if(err) console.log(err)
                else {
                    console.log(`latitude: ${weaterRes.lat}`);
                    console.log(`longitude: ${weaterRes.lng}`);
                    console.log(`current temperature ${weaterRes.currentTemperature}`);
                    console.log(`apparent temperature is ${weaterRes.apparentTemperature}`);
                }    
        });
    }
});