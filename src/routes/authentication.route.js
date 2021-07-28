const { auth } = require("../services/authentication.service")
const express = require("express")
const {validateFields, asyncHandler} = require("../utils")
const router = express.Router()

router.post("/", asyncHandler(async(req, res) => {
  const { cpf, password } = validateFields(req, [
    { name: "cpf", required: true },
    { name: "password", required: true },
  ])
  const accessToken = await auth({cpf, password})
  res.status(200).json({accessToken})
}))

module.exports = router
