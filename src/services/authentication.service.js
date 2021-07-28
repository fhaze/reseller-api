const createError = require("http-errors")
const resellerRepo = require("../datasource/repo/reseller.repo")
const utils = require("../utils")
const { sign } = require("../security")

const auth = async ({ cpf, password }) => {
  const { valid, formatted: formattedCpf } = utils.validateCpf(cpf)
  if (!valid) {
    throw createError(400, `cpf '${cpf}' is invalid.`)
  }
  const resellers = await resellerRepo.getByCpfAndPassword({cpf: formattedCpf, password: utils.sha512(password)})
  if (resellers.length === 0) {
    throw createError(404, "reseller does not exist by cpf and password combination.")
  }
  const { cpf: resellerCpf } = resellers[0]
  return sign({ cpf: resellerCpf })
}

module.exports = {
  auth
}
