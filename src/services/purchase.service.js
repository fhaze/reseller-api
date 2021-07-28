const createError = require("http-errors")
const cashback = require("./cashback.service")
const resellerRepo = require("../datasource/repo/reseller.repo")
const purchaseRepo = require("../datasource/repo/purchase.repo")

const purchaseStatus = {
  IN_VALIDATON: "Em validação",
  APPROVED: "Aprovado"
}
const MASTER_CPF = process.env.MASTER_CPF || "15350946056"

const create = async ({ code, resellerCpf, date, value }) => {
  const resellers = await resellerRepo.getByCpf(resellerCpf)
  if (resellers.length === 0) {
    throw createError(400, `reseller with cpf '${resellerCpf}' does not exist.`)
  }
  if ((await purchaseRepo.getByCode(code)).length > 0) {
    throw createError(400, `purchase with code '${code}' already exist.`)
  }
  let status = purchaseStatus.IN_VALIDATON
  if (resellerCpf === MASTER_CPF) {
    status = purchaseStatus.APPROVED
  }
  const { id } = resellers[0]
  const { value: cashbackValue, percentage: cashbackPercentage } = cashback.calculate(value)
  const { insertId } = await purchaseRepo.create({ code, id, date, value, status, cashbackValue, cashbackPercentage })
  return { insertId, code, id, date, value, status, cashbackValue, cashbackPercentage }
}

const removeByCodeAndCpf = async ({code, cpf}) => {
  const purchases = await purchaseRepo.getByCodeAndCpf({code, cpf})
  if (purchases.length === 0) {
    throw createError(404, `purchase with code '${code}' does not exist or you don't have permission to view or modify.`)
  }
  const { id, status } = purchases[0]
  if (status !== purchaseStatus.IN_VALIDATON) {
    throw createError(400, `you can only delete a purchase with status '${purchaseStatus.IN_VALIDATON}'.`)
  }
  await purchaseRepo.remove(id)
}

const updateByCodeAndCpf = async (code, cpf, fields) => {
  const purchases = await purchaseRepo.getByCodeAndCpf({code, cpf})
  if (purchases.length === 0) {
    throw createError(404, `purchase with code '${code}' does not exist or you don't have permission to view or modify.`)
  }
  const purchase = purchases[0]
  if (purchase.status !== purchaseStatus.IN_VALIDATON) {
    throw createError(400, `you can only update a purchase with status '${purchaseStatus.IN_VALIDATON}'.`)
  }
  for (const k in fields) {
    if (fields.hasOwnProperty(k)) {
      purchase[k] = fields[k]
    }
  }
  const { id, resellerId, date, value, status } = purchase
  const { value: cashbackValue, percentage: cashbackPercentage } = cashback.calculate(value)
  await purchaseRepo.update(id, { resellerId, date, value, status, cashbackValue, cashbackPercentage })
}

module.exports = {
  create,
  removeByCodeAndCpf,
  updateByCodeAndCpf,
  purchaseStatus,
  MASTER_CPF
}
