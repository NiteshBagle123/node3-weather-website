const request = require('request');
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibml0ZXNoLWJhZ2xlIiwiYSI6ImNqejJ2N3d2ODA0ODIzbm15bWp3dnAxdTYifQ.XHn8ybqZvR2yB_vXPp-96g&linit=1';
    const option = { url: url, json: true};
    request(option, (error, { body })=>{
        if(error){
            callback('unable to connect to web services', undefined);
        } else if(body.error){
            callback('Error occured', undefined);
        } else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0]
            })
        }
    })
};

module.exports = geocode;