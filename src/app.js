const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory for htmls
app.use(express.static(publicDirectory))

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'You need help dud.',
        name : 'Mayank'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Mayank'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Mayank'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error : 'Address not provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if (error){
            return res.send({
                error
            })
        }
     
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                res.send({
                    error
                })
            }

            res.send({
                'forecast' : forecastData,
                location,
                address : req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error',{
        title : 'Error',
        name : 'Mayank',
        message : 'Help article not found'
    })
})

//match anything that hasn't been matched before so it must be last
app.get('*', (req, res) => {
    res.render('error',{
        title : 'Error',
        name : 'Mayank',
        message : 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})