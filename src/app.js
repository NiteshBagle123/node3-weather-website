const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoencode');
const forecast = require('./utils/forecast');
const app = express();

// define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partial');

// set handler bars and view engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
// set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        name: 'Nitesh',
        title: 'Weather App'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Nitesh',
        position: 'Member Technical',
        title: 'Title page about information'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        name: 'Nitesh',
        position: 'Member Technical',
        title: 'Title page about help'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address query string is mandatory'
        })
    }
    geocode(req.query.address, (error, { Latitude ,  Longitude } = {})=>{
        if(error){
            return console.log(error)
        }
        forecast(Latitude, Longitude, (error, foreCastdata) => {
            if(error){
                return console.log(error)
            }
            res.send({
                forcastValue: foreCastdata,
                address: req.query.address,
                longitude: Longitude,
                latitude: Latitude
            })
        })
    });
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            errors: 'You must provide the valid search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('not-found',{
        title: '404', 
        message: 'Help article Not found',
        name: 'Nitesh'
    });
})

app.get('*', (req, res)=>{
    res.render('not-found',{
        title: '404', 
        message: 'Page Not found',
        name: 'Nitesh'
    });
})

app.listen('3000', ()=>{
    console.log('Server Running on port:3000');
});