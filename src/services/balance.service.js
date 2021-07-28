const createError = require("http-errors")
const axios = require("axios")

const CASHBACK_BALANCE_API_URL = process.env.CASHBACK_BALANCE_API_URL || "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com"
const CASHBACK_BALANCE_API_TOKEN = process.env.CASHBACK_BALANCE_API_TOKEN || "ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm"

const api = axios.create({
  baseURL: CASHBACK_BALANCE_API_URL,
  headers: {
    "token": CASHBACK_BALANCE_API_TOKEN
  }
})

const getBalance = async cpf => {
  const res = await api.get("/v1/cashback",{ params: {cpf}})
  const { statusCode, body } = res.data
  if (statusCode === 200) {
    const { credit } = body
    return credit
  } else {
    throw createError(500, "Sorry, balance cannot be retrieved right now. Please try again later.")
  }
}

module.exports = {
  getBalance
}
