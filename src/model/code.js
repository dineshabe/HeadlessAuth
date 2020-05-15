const mongoose = require('mongoose')
const codeSchema = mongoose.Schema({ 
    code: { 
        type: String, 
        require: true, 
        unique: true 
    }, 
    userUuid: { type: String }, 
    userEmail: { type: String }, 
    companyUuid: { type: String }, 
    firstName: { type: String }, 
    lastName: { type: String }, 
    requestingDevice: { 
        type: String,
        require: true 
    }, 
    responderDeviceName: { type: String }, 
    responderDeviceId: { type: String }, 
    isConnected: { type: Boolean }, 
    accessToken: { type: String }, 
    refreshToken: { type: String }, 
    roles: { type: [String] }, 
    tokenUrl: { type: String }, 
    issuerUrl: { type: String }, 
    clientId: { type: String }, 
    partner: { type: String }, 
    logoutUrl: { type: String }, 
    accessTokenExpirationTime: { type: String }
})
    
    const Code = mongoose.model('Code', codeSchema)
    
    module.exports = Code