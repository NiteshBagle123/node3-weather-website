console.log('Client side javascript file loaded');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log('print data', data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
message1.textContent = 'from javascript';

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const location = search.value;
    console.log('location',location);
    message1.textContent = 'Loading....';
    message2.textContent = '';
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/b'+ location +'.json?access_token=pk.eyJ1Ijoibml0ZXNoLWJhZ2xlIiwiYSI6ImNqejJ2N3d2ODA0ODIzbm15bWp3dnAxdTYifQ.XHn8ybqZvR2yB_vXPp-96g&linit=1').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
            //console.log('Error Message', data.error);
        } else {
            // console.log('print data', data);
            message1.textContent = data.features[0].center[1];
            message2.textContent = data.features[0].center[0];
            // console.log({
            //     latitude: data.features[0].center[1],
            //     longitude: data.features[0].center[0]
            // })
        }
    })
})
})