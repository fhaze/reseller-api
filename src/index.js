Date.prototype.toJSON = function () {
  return this.toISOString().split('T')[0]
}

const express = require("express")
const PORT = 8000
const app = express()

app.use(express.json())

app.use("/v1/authentication", require("./routes/authentication.route"))
app.use("/v1/reseller", require("./routes/reseller.route"))
app.use("/v1/purchase", require("./routes/purchase.route"))

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({message: err.message})
  } else {
    console.log(err)
    res.status(500).json({message: "sorry, something went wrong."})
  }
})

app.listen(PORT, () => console.log(`Listening on 0.0.0.0:${PORT}`))
