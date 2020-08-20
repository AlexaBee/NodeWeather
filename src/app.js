const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Alex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address || req.query.address.length === 0) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    debugger
    geocode(req.query.address, (error, points) => {
        if (error)
            return res.send({error})
        else 
            if (points) forecast(points, (error, forecast) => {
                if (error) return res.send({error}) 
                else
                    if (forecast) return res.send({forecast}) 
            })
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found',
        name: 'Alex'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: '404 Page not found',
        name: 'Alex'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})