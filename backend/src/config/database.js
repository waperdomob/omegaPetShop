const {connect} = require("mongoose")
const { MONGODB_URI} = require("./config")
// 1. Conectamos la base de datos
const connectDB = () => {
  connect("mongodb://localhost:27017/petsParadise", {
    useNewUrlParser: true,
    })
    .then(() => {
      console.log("conectado a la base de datos")
    })
    .catch(() => {
      console.error("no se logro conectar con la base de datos")
    })
}

module.exports = connectDB
