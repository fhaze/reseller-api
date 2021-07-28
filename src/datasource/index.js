const mariadb = require("mariadb")

let pool


const connect = () => mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cashback",
  connectionLimit: 5
})


const getConnection = async func => {
  if (pool == null) {
    pool = connect()
  }

  let conn
  try {
    conn = await pool.getConnection()
    return func(conn)
  }  catch (err) {
    throw err
  } finally {
    if (conn) {
      await conn.end()
    }
  }
}

module.exports = {
  getConnection
}
