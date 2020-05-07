const express = require('express')
const rn = require('random-number')
const mongoose = require('./db/mongoose')
const Code = require('./model/code')

const port = process.env.PORT || 3000
const app = express()
var getRandomNumber = rn.generator({
    min:  0, 
    max:  999999, 
    integer: true
  })

app.post('/code', (req, res) => {
    const generatedCode = getRandomNumber()
    const newCode = new Code({
        code: generatedCode,
        requestingDevice: req.body.device
    })
    res.status(201).send({code: generatedCode})
})

app.post('/code/:id', async (req, res) => {
    const receivedCode = req.params.id
    try {
        const code = await Code.findOne({code: receivedCode})
        code.responderDevice = req.body.device
        code.accessToken = req.body.accessToken
        res.status(200).send({device: code.requestingDevice})
    } catch (e) {
        res.status(401).send(e)
    }
})

app.get('/code/:id', async (req, res) => {
    const receivedCode = req.params.id
    try {
        const code = await Code.findOne({code: receivedCode})
        if (code.accessToken) {
            res.status(200).send({accessToken, device: responderDevice})
        } else {
            res.status(503).send({message: 'Just a little more time my child'})
        }
    } catch (e) {
        res.status(401).send(e)
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to Headless Auth')
})

app.get('*', (req, res) => {
    res.send('Unknown')
})

app.listen(port, () => {
    console.log('started the server')
})