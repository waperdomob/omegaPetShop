const express = require("express")

const routerProducto = require("../routes/product")
const routerUsuario = require("../routes/user")
const routerCliente = require("../routes/client")
const routerSale = require("../routes/sale")
const routerLogin = require("../routes/login")

const connectDB = require("./database")
const fileUpload = require("express-fileupload")

class Server {

  constructor() {
    this.aplicacion = express()

    // Middlewares
    this.aplicacion.use( express.json() )
    this.aplicacion.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
    }))
  
    this.aplicacion.listen(3001, ()=>{ console.log("se esta ejecutando el servidor") })
    this.rutas()
    
    connectDB()
  }

  rutas() {
    this.aplicacion.use("/usuario", routerUsuario)
    this.aplicacion.use("/producto", routerProducto)
    this.aplicacion.use("/venta", routerSale)
    this.aplicacion.use("/cliente", routerCliente)
    this.aplicacion.use("/login", routerLogin)

  }
}

module.exports = Server
