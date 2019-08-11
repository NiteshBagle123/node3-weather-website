const request = require('request');
module.exports = (lat, long, callback)=>{
    const url = `https://api.darksky.net/forecast/7c1a4f358ab4d073ee874857853666bd/${lat},${long}?lang=en`;
    const option = { url: url, json: true}
    request(option, (error, { body })=>{
        if(error){
            callback('unable to connect to web services', undefined);
        } else if(body.error){
            callback('Error occured', undefined);
        } else {
            callback(undefined, {
                rain: body.daily.data[0].summary,
                temperature: body.currently.temperature
            })
        }
    })
};