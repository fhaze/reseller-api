const assert = require("assert")
const { calculate } = require("./cashback.service");

describe("cashback calculation", () => {
  it("10% promotion", () => {
    const cashback10 = { value: 50, percentage: 0.1 }
    const calculated = calculate(500)
    assert.equal(cashback10.value, calculated.value)
    assert.equal(cashback10.percentage, calculated.percentage)
  })
  it("15% promotion", () => {
    const cashback15 = { value: 180, percentage: 0.15 }
    const calculated = calculate(1_200)
    assert.equal(cashback15.value, calculated.value)
    assert.equal(cashback15.percentage, calculated.percentage)
  })
  it("20% promotion", () => {
    const cashback20 = { value: 480, percentage: 0.2 }
    const calculated = calculate(2_400)
    assert.equal(cashback20.value, calculated.value)
    assert.equal(cashback20.percentage, calculated.percentage)
  })
})
