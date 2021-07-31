const express = require('express')
const PORT = 9999 || process.env.PORT
const open = require('open')
const generator = require('generate-password')

const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.render('index', { pwd: '' })
})

app.post('/', async(req, res) => {
    if (req.body) {
        if (req.body.specials && req.body.numbers) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: true,
                symbols: true
            })
            res.render('index', { pwd })
        } else if (req.body.specials && req.body.number === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: false,
                symbols: true
            })
            res.render('index', { pwd, counter })
        } else if (req.body.numbers && req.body.specials === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: true,
                symbols: false
            })
            res.render('index', { pwd })
        } else if (req.body.numbers === undefined && req.body.specials === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: false,
                symbols: false
            })
            res.render('index', { pwd })
        }
    } else {
        res.status(400).send({ message: 'Error while processing your request.' })
    }
})

app.listen(PORT, async() => {
    console.log('App is launching inside your browser, just be patient')
    await open('http://localhost:9999')
})