const express = require('express')
const PORT = 9999 || process.env.PORT
const open = require('open')
const generator = require('generate-password')

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: '192.168.1.10',
    database: 'pwdgen',
    password: 'root',
    port: 5432,
})



const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
let counter;
app.get('/', async(req, res) => {
    await pool.query('SELECT count FROM counter WHERE id = 1', (err, result) => {
        if (err) throw err;
        counter = result.rows[0].count
        res.render('index', { pwd: '', counter: counter })
    })
})

app.post('/', async(req, res) => {
    await pool.query('SELECT count FROM counter WHERE id = 1', (err, result) => {
        if (err) throw err;
        counter = result.rows[0].count
        res.render('index', { pwd: '', counter: counter })
    })
    if (req.body) {
        if (req.body.specials && req.body.numbers) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: true,
                symbols: true
            })
            await pool.query('UPDATE counter SET count = count + 1 WHERE id = 1', (err, result) => {
                counter = result.rows[0].count

            })
            res.render('index', { pwd, counter })
        } else if (req.body.specials && req.body.number === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: false,
                symbols: true
            })
            await pool.query('UPDATE counter SET count = count + 1 WHERE id = 1', (err, result) => {
                counter = result.rows[0].count

            })
            res.render('index', { pwd, counter })
        } else if (req.body.numbers && req.body.specials === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: true,
                symbols: false
            })
            await pool.query('UPDATE counter SET count = count + 1 WHERE id = 1', (err, result) => {
                counter = result.rows[0].count

            })
            res.render('index', { pwd, counter })
        } else if (req.body.numbers === undefined && req.body.specials === undefined) {
            const pwd = generator.generate({
                length: parseInt(req.body.pwdLength),
                numbers: false,
                symbols: false
            })
            await pool.query('UPDATE counter SET count = count + 1 WHERE id = 1', (err, result) => {
                if (err) throw err;
                counter = result.rows[0].count

            })
            res.render('index', { pwd, counter })
        }
    } else {
        res.status(400).send({ message: 'Error while processing your request.' })
    }
})

app.listen(PORT, async() => {
    console.log('App is launching inside your browser, just be patient')
    await open('http://localhost:9999')
})