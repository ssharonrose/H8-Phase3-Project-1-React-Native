const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET

function signToken(payload) { // nge decrypt payload yang kita simpan pas login
    return jwt.sign(payload, SECRET)
}

function verifyToken(token) { // buat nge unpack si payload 
    return jwt.verify(token, SECRET)
}

module.exports = { signToken, verifyToken }