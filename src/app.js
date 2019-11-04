const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

const port = process.env.PORT || 3000
    //Defines Paths for Express config...
const viewPaths = path.join(__dirname, '../templates/views')
app.use(express.static(path.join(__dirname, '../public')))
const partialPath = path.join(__dirname, '../templates/partials')
    //Set up HandkebArs engine and views location
app.set('views', viewPaths)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)


//Set up Static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sadik Shaikh',
        age: 24,
        mobileno: 9527637844
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ROBOT',
        name: 'Sadik Shaikh'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Any Help',
        body: 'Watch video PROPERLY!!!!',
        name: 'Sadik Shaikh'
    })
})


app.get('/weather', (req, res) => {
    const addr = req.query.address
    if (!addr) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(addr, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 HELP',
        msg: 'Help article not found',
        name: 'Sadik Shaikh'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        msg: 'Page not Found',
        name: 'Sadik Shaikh'
    })
})

app.listen(port, () => {
    console.log('Server is running on port no ' + port)
})