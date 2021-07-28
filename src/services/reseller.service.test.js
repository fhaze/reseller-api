const assert = require("assert")
const sinon = require("sinon")
const utils = require("../utils")
const reseller = require("./reseller.service")
const resellerRepo = require("../datasource/repo/reseller.repo")

describe("reseller rules", () => {
  let validateCpf
  let validateEmail
  let getByCpf
  let create

  beforeEach(() => {
    validateCpf = sinon.stub(utils, "validateCpf")
    validateEmail = sinon.stub(utils, "validateEmail")
    getByCpf = sinon.stub(resellerRepo, "getByCpf")
    create = sinon.stub(resellerRepo, "create")
  })

  afterEach(() => {
    validateCpf.restore()
    validateEmail.restore()
    getByCpf.restore()
    create.restore()
  })

  it("should create if cpf and email are valid and reseller doesn't exist", async () => {
    validateCpf.returns({ valid: true, formatted: "12345678912" })
    validateEmail.returns(true)
    getByCpf.resolves([])
    create.resolves({ insertId: 1 })

    await assert.doesNotReject(() => reseller.create({ fullname: "hoge", cpf: "12345678912", password: "abc", email: "a@a"}))
  })
  it("shouldn't create if cpf and email are valid but cpf is already in use", async () => {
    validateCpf.returns(false)
    validateEmail.returns(true)
    getByCpf.resolves([ { id: 1 } ])
    create.resolves({ insertId: 1 })

    await assert.rejects(() => reseller.create({ fullname: "hoge", cpf: "12345678912", password: "abc", email: "a@a"}))
  })
  it("shouldn't create if cpf or email is invalid", async () => {
    validateCpf.returns(false)
    validateEmail.returns(false)
    getByCpf.resolves([])
    create.resolves({ insertId: 1 })

    await assert.rejects(() => reseller.create({ fullname: "hoge", cpf: "12345678912", password: "abc", email: "a@a"}))
  })
})
