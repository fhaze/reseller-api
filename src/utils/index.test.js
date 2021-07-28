const assert = require("assert")
const index = require("./index");

describe("utils verification", () => {
  it("invalid cpf", () => {
    const ok = index.validateCpf("12345678912")
    assert.equal(false, ok.valid)
  })
  it("valid cpf", () => {
    const ok = index.validateCpf("24670383000")
    assert.equal(true, ok.valid)
  })
  it("invalid email", () => {
    const ok = index.validateEmail("my-email.com")
    assert.equal(false, ok)
  })
  it("valid email", () => {
    const ok = index.validateEmail("a@a.com")
    assert.equal(true, ok)
  })
})
