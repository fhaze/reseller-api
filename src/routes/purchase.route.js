const { asyncHandler } = require('../utils')
const { jwt } = require("../security")

const express = require("express")
const {validateFields} = require("../utils")
const {getByCpf, getByCodeAndCpf} = require("../datasource/repo/purchase.repo");
const {updateByCodeAndCpf, removeByCodeAndCpf, create} = require("../services/purchase.service");
const router = express.Router()

router.get("/", jwt, asyncHandler(async(req, res) => {
  const { cpf } = req.user
  res.status(200).json(await getByCpf(cpf))
}))

router.get("/:code", jwt, asyncHandler(async(req, res) => {
  const { code } = validateFields(req, [{ name: "code", required: true, origin: "param" }])
  const { cpf } = req.user

  const purchases = await getByCodeAndCpf({ code, cpf })

  if (purchases.length === 0) {
    res.status(404).json(`purchase with code ${code} does not exist or you don't have permission to view or modify.`)
    return
  }

  delete purchases[0].id
  delete purchases[0].resellerId
  res.status(200).json(purchases[0])
}))


router.post("/", jwt, asyncHandler(async(req, res) => {
  const { code, date, value } = validateFields(req, [
    { name: "code", required: true },
    { name: "date", required: true },
    { name: "value", required: true },
  ])
  const { cpf: resellerCpf } = req.user
  await create({ code, resellerCpf, date, value })
  res.status(201).json({message: "purchase created successfully"})
}))

router.put("/:code", jwt, asyncHandler(async(req, res) => {
  const fields = validateFields(req, [
    { name: "code", origin: "param", required: "true" },
    { name: "date" },
    { name: "value" },
  ])
  const { cpf } = req.user
  const { code } = fields
  await updateByCodeAndCpf(code, cpf, fields)
  res.status(200).json({message: "purchase updated successfully"})
}))

router.delete("/:code", jwt, asyncHandler(async(req, res) => {
  const { code } = validateFields(req, [
    { name: "code", origin: "param", required: "true" },
  ])
  const { cpf } = req.user
  await removeByCodeAndCpf({code, cpf})
  res.status(200).json({message: "purchase deleted successfully"})
}))

module.exports = router
