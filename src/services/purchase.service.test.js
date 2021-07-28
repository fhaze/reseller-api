const assert = require("assert")
const purchaseRepo = require("../datasource/repo/purchase.repo")
const resellerRepo = require("../datasource/repo/reseller.repo")
const purchase = require("./purchase.service");
const cashback = require("./cashback.service")
const sinon = require("sinon");
const {purchaseStatus} = require("./purchase.service");

describe("purchase rules", () => {
  let calculate
  let getByCpf
  let getByCode
  let getByCodeAndCpf
  let remove
  let create
  let update

  beforeEach(() => {
    calculate = sinon.stub(cashback, "calculate")
    getByCpf = sinon.stub(resellerRepo, "getByCpf")
    getByCode = sinon.stub(purchaseRepo, "getByCode")
    getByCodeAndCpf = sinon.stub(purchaseRepo, "getByCodeAndCpf")
    remove = sinon.stub(purchaseRepo, "remove")
    create = sinon.stub(purchaseRepo, "create")
    update = sinon.stub(purchaseRepo, "update")
  })

  afterEach(() => {
    calculate.restore()
    getByCpf.restore()
    getByCode.restore()
    getByCodeAndCpf.restore()
    remove.restore()
    create.restore()
    update.restore()
  })

  it("can update a purchase with 'IN_VALIDATON status", async () => {
    const res = [{ code: "ABC001", cpf: "11111111", status: purchaseStatus.IN_VALIDATON }]
    const args = { code: "ABC001", cpf: "11111111" }
    const cashback = { value: 125, percentage: 0.1 }

    getByCodeAndCpf.resolves(res)
    update.resolves("OK")
    calculate.returns(cashback)

    await assert.doesNotReject(() => purchase.updateByCodeAndCpf(args))
  })
  it("can't update a purchase with status different than 'IN_VALIDATON", async () => {
    const res = [{ code: "ABC001", cpf: "11111111", status: purchaseStatus.APPROVED }]
    const args = { code: "ABC001", cpf: "11111111" }
    const cashback = { value: 125, percentage: 0.1 }

    getByCodeAndCpf.resolves(res)
    update.resolves("OK")
    calculate.returns(cashback)

    await assert.rejects(() => purchase.updateByCodeAndCpf(args))
  })
  it("can remove a purchase with 'IN_VALIDATON' status", async () => {
    const res = [{ code: "ABC001", cpf: "11111111", status: purchaseStatus.IN_VALIDATON }]
    const args = { code: "ABC001", cpf: "11111111" }

    getByCodeAndCpf.resolves(res)
    remove.resolves("OK")

    await assert.doesNotReject(() => purchase.removeByCodeAndCpf(args))
  })
  it("can't remove a purchase with status different than 'IN_VALIDATON'", async () => {
    const res = [{ code: "ABC001", cpf: "11111111", status: purchaseStatus.APPROVED }]
    const args = { code: "ABC001", cpf: "11111111" }

    getByCodeAndCpf.resolves(res)
    remove.resolves("OK")

    await assert.rejects(() => purchase.removeByCodeAndCpf(args))
  })
  it("should apply cashback when creating a new purchase", async () => {
    const args = { code: "ABC001", resellerCpf: "11111111", date: "2021-07-27", value: 1_250 }
    const cashback = { value: 125, percentage: 0.1 }

    create.resolves({ insertId: 1 })
    getByCpf.resolves([{ id: 1 }])
    getByCode.resolves([])
    calculate.returns(cashback)

    const { cashbackValue, cashbackPercentage } = await purchase.create(args)

    assert.equal(cashback.value, cashbackValue)
    assert.equal(cashback.percentage, cashbackPercentage)
  })
})
