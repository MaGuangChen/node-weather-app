const request = require('request');

// geocode搭配request，因為request不支援promise所以放進request用
const geocodeAddress = (address) => {
    return new Promise((reject, resolve) => {
        const encodeAddress = encodeURIComponent(address);
        request(
            { 
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
                json: true,
            }, (err, res, body) => {
                if(err) reject('Unable to connect to Google server.');
                else if(body.status === 'ZERO_RESULTS') reject('Unable find that address');
                else if(body.status === 'OK') {
                    const data = body.results[0];
                    const location = data.geometry.location;
                    resolve({
                        address: `${data.formatted_address}`,
                        latitude: `${location.lat}`,
                        longtitude: `${location.lng}`
                    });
                }
            });
    });
};

// 期望一個promise comback
geocodeAddress('19146')
.then(location => {
        const res = JSON.stringify(location, undefined, 2);
        console.log(res);
    }
).catch(err => console.log(err));
