const { create } = require("../services/reseller.service")
const { jwt } = require("../security")

const express = require("express")
const {validateFields, asyncHandler} = require("../utils")
const {getBalance} = require("../services/balance.service");
const router = express.Router()

router.post("/", asyncHandler(async(req, res) => {
  const { fullname, cpf, email, password } = validateFields(req, [
    { name: "fullname", required: true},
    { name: "email", required: true},
    { name: "cpf", required: true},
    { name: "password", required: true},
  ])
  await create({ fullname, cpf, email, password })
  res.status(201).json({message: "reseller created successfully"})
}))

router.get("/balance", jwt, asyncHandler(async (req, res) => {
  const { cpf } = req.user
  const credits = await getBalance(cpf)
  res.status(200).json({ credits })
}))

module.exports = router
