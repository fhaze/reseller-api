const createError = require("http-errors")
const resellerRepo = require("../datasource/repo/reseller.repo")
const utils = require("../utils")

const create = async ({ fullname, cpf, email, password }) => {
  const { valid, formatted: formattedCpf } = utils.validateCpf(cpf)
  if (!valid) {
    throw createError(400, `cpf '${cpf}' is invalid.`)
  }
  if (!utils.validateEmail(email)) {
    throw createError(400, `email '${email}' is invalid.`)
  }
  const exists = await resellerRepo.getByCpf(formattedCpf)
  if (exists.length > 0) {
    throw createError(400, `reseller with cpf '${cpf}' already exists.`)
  }
  const { insertId } = await resellerRepo.create({fullname, cpf: formattedCpf, email, password: utils.sha512(password)})
  return insertId
}

module.exports = {
  create,
}
