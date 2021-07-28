const createError = require("http-errors")
const crypto = require("crypto")
const KEY = "my-super-secret-key"

const sha512 = text => {
  const hash = crypto.createHmac("sha512", KEY)
  hash.update(text)
  return hash.digest("hex")
}

const validateFields = (req, fields) => {
  const emptyFields = []
  const minFields = []
  const maxFields = []
  const map = {}
  fields.forEach(f => {
    const { name, required, origin, min, max } = f
    const field = origin === "param" ? req.params[name] : req.body[name]

    if (field === "" || field === undefined) {
      if (required) {
        emptyFields.push(name)
      }
    } else {
      if (min !== null && field.length < min) {
        minFields.push(`${name} min length is ${min}`)
      } else if (min !== null && field.length > max) {
        maxFields.push(`${name} max length is ${min}`)
      } else {
        map[name] = field
      }
    }
  })
  if (emptyFields.length === 0 && minFields.length === 0 && maxFields.length === 0) {
    return map
  } else {
    let err = ""
    if (emptyFields.length > 0) {
      err += `${emptyFields} ${emptyFields.length===1?"is":"are"} required. `
    }
    if (minFields.length > 0) {
      minFields.forEach(msg => err += `${msg}. `)
    }
    if (maxFields.length > 0) {
      maxFields.forEach(msg => err += `${msg}. `)
    }
    throw createError(400, err.slice(0, -1))
  }
}

const validateCpf = cpf => {
  let sum
  let rest
  sum = 0
  cpf = cpf.match(/\d/g).join("")
  if (cpf === "00000000000") return { valid: false }

  for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11))  rest = 0
  if (rest !== parseInt(cpf.substring(9, 10)) ) return { valid: false }

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11))  rest = 0
  return { valid: rest === parseInt(cpf.substring(10, 11)), formatted: cpf }
}

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

module.exports = {
  sha512,
  validateFields,
  validateCpf,
  validateEmail,
  asyncHandler
}
