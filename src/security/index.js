const jwtHandler = require("express-jwt")
const jwtWebToken = require('jsonwebtoken')

const SECRET = process.env.TOKEN_SECRET || "my-seeeeeeeeecret-for-this-token"
const ALGORITHM = process.env.TOKEN_ALGORITHM || "HS512"
const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "1h"

const jwt = jwtHandler({ secret: SECRET, algorithms: [ALGORITHM] })
const sign = ({ cpf }) => jwtWebToken.sign({ cpf }, SECRET, { algorithm: ALGORITHM, expiresIn: EXPIRES_IN })

module.exports = {
  jwt,
  sign
}
