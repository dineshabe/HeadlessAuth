const express = require('express')
const rn = require('random-number')
const mongoose = require('./db/mongoose')
const Code = require('./model/code')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
var getRandomNumber = rn.generator({ min: 0, max: 999999, integer: true})

app.post('/code', async (req, res) => { 
    const generatedCode = getRandomNumber() 
    const newCode = new Code({ code: generatedCode, requestingDevice: req.body.device, isConnected: false }) 
    try { 
        await newCode.save() 
        res.status(201).send({ code: generatedCode }) 
    } catch (e) { 
        res.status(400).send(e) 
    }})
    
app.post('/code/:id', async (req, res) => { 
    const receivedCode = req.params.id 
    try { 
        const code = await Code.findOne({ code: receivedCode }) 
        code.responderDevice = req.body.deviceName 
        code.accessToken = req.body.accessToken
        code.userUuid = req.body.userUuid 
        code.userEmail = req.body.userEmail 
        code.companyUuid = req.body.companyUuid 
        code.firstName = req.body.firstName 
        code.lastName = req.body.lastName 
        code.responderDeviceId = req.body.deviceId 
        code.refreshToken = req.body.refreshToken 
        code.roles = req.body.roles 
        code.tokenUrl = req.body.tokenUrl 
        code.issuerUrl = req.body.issuerUrl 
        code.clientId = req.body.clientId 
        code.partner = req.body.partner 
        code.logoutUrl = req.body.logoutUrl 
        code.accessTokenExpirationTime = req.body.accessTokenExpirationTime 
        code.isConnected = true 

        await code.save() 
        res.status(200).send({ device: code.requestingDevice }) 

    } catch (e) { 
        res.status(401).send(e) 
    }
})
            
app.get('/code/:id', async (req, res) => { 
    const receivedCode = req.params.id 
    try { 
            const code = await Code.findOne({ code: receivedCode }) 
            if (code.isConnected) { 
                res.status(200).send({ accessToken: code.accessToken, refreshToken: code.refreshToken, userUuid: code.userUuid, userEmail: code.userEmail, companyUuid: code.companyUuid, firstName: code.firstName, lastName: code.lastName, deviceId: code.responderDeviceId, deviceName: code.responderDevice, roles: code.roles, tokenUrl: code.tokenUrl, issuerUrl: code.issuerUrl, clientId: code.clientId, partner: code.partner, logoutUrl: code.logoutUrl, accessTokenExpirationTime: code.accessTokenExpirationTime }) 
            } else { 
                res.status(503).send({ message: 'Just a little more time my child' })
            } 
        } catch (e) { 
            res.status(401).send(e) 
        }
})

app.get('/connected/:id', async (req, res) => { 
    const receivedCode = req.params.id 
    try { 
        const code = await Code.find({ responderDeviceId: receivedCode }) 
        if (code.length > 0) { 
            let connectedDevices = [] 
            code.forEach((item) => {connectedDevices.push(item.requestingDevice)}) 
            res.status(200).send({connectedDevices}) 
        } else { 
            res.status(503).send({ message: 'No connected devices found' }) 
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