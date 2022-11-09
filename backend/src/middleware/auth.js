const { verifyToken } = require( "../helper/generateToken");
const User = require( "../models/User");

const checkAuth = async(req, res, next) =>{
    
    let token = await req.headers["authorization"] //existe el encabezado de autorizacion?
    if ( ! token ){ //si  no existe token a la mierda
            res.status(409)
            res.send({error : "tu por aqui no pasas"})
            return
    }
    token = token.split(" ").pop()
    

    const tokenData = await verifyToken(token)
    console.log(token);
    if ( tokenData === null){ //el token no pasa la prueba... a la mierda
        res.status(409)
        res.send({error : "tu por aqui no pasas"})
        return
    }
    const userData = await User.findById(tokenData._id)
    if ( ! userData.active ){ // si el usario esta inactivo.. a la mierda
        res.status(409)
        res.send({error : "tu por aqui no pasas"})
        return
    }
    next()  //si el token sortea el campo minado o el hacker es la monda o el token es valido
}

module.exports = {checkAuth}