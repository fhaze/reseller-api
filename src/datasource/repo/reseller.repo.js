const datasource = require("../index");

const create = async ({ fullname, cpf, email, password }) => await datasource.getConnection(conn =>
  conn.query(
    "INSERT INTO reseller(fullname,cpf,email,password) values(?,?,?,?)",
    [fullname, cpf, email, password],
  )
)

const getByCpf = async cpf => await datasource.getConnection(conn =>
  conn.query("SELECT id, fullname, cpf, email, password FROM reseller WHERE cpf = ?", [cpf])
)

const getByCpfAndPassword = async ({ cpf, password }) => await datasource.getConnection(conn =>
  conn.query("SELECT id, fullname, cpf, email, password FROM reseller WHERE cpf = ? AND password = ?", [cpf, password])
)

module.exports = {
  create,
  getByCpf,
  getByCpfAndPassword
}
