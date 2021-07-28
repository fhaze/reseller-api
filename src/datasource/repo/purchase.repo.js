const datasource = require("../index");

const create = async ({ code, id, date, value, status, cashbackValue, cashbackPercentage }) => await datasource.getConnection(conn =>
  conn.query(
    "INSERT INTO purchase(code, resellerId, date, value, status, cashback_value, cashback_percentage) values(?,?,?,?,?,?,?)",
    [ code, id, date, value, status, cashbackValue, cashbackPercentage ],
  )
)

const getByCodeAndCpf = async ({code, cpf}) => await datasource.getConnection(conn =>
  conn.query(
    "SELECT p.id, p.code, p.resellerId, p.date, p.value, p.status, p.cashback_value, p.cashback_percentage FROM purchase p JOIN reseller r ON p.resellerId = r.id WHERE p.code = ? AND r.cpf = ?",
    [code, cpf]
  )
)

const getByCpf = async cpf => await datasource.getConnection(conn =>
  conn.query(
    "SELECT p.code, p.date, p.value, p.status, p.cashback_value, p.cashback_percentage FROM purchase p JOIN reseller r ON p.resellerId = r.id WHERE r.cpf = ?",
    [cpf]
  )
)

const getByCode = async code => await datasource.getConnection(conn =>
  conn.query(
    "SELECT code, date, value, status, cashback_value, cashback_percentage FROM purchase WHERE code = ?",
    [code]
  )
)

const remove = async id => await datasource.getConnection(conn =>
  conn.query("DELETE FROM purchase WHERE id = ?", [id])
)

const update = async (id, { resellerId, date, value, status, cashbackValue, cashbackPercentage }) => await datasource.getConnection(conn =>
  conn.query(
    "UPDATE purchase SET resellerId = ?, date = ?, value = ?, status = ?, cashback_value = ?, cashback_percentage = ? WHERE id = ?",
    [ resellerId, date, value, status, cashbackValue, cashbackPercentage, id ],
  )
)

module.exports = {
  create,
  getByCodeAndCpf,
  getByCpf,
  getByCode,
  remove,
  update
}
