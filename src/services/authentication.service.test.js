const assert = require("assert")
const resellerRepo = require("../datasource/repo/reseller.repo")
const authentication = require("./authentication.service")
const sinon = require("sinon");

describe("authentication rules", () => {
  let getByCpfAndPassword

  beforeEach(() => {
    getByCpfAndPassword = sinon.stub(resellerRepo, "getByCpfAndPassword")
  })

  afterEach(() => {
    getByCpfAndPassword.restore()
  })

  it("shouldn't create token if the reseller can't be found", async () => {
    getByCpfAndPassword.resolves([])
    await assert.rejects(authentication.auth({ cpf: "11111111111", password: "secret" }))
  })
  it("should create token if the reseller can be found", async () => {
    getByCpfAndPassword.resolves([{ id: 1, cpf: "11111111111" }])
    await assert.doesNotReject(authentication.auth({ cpf: "11111111111", password: "secret" }))
  })
})
