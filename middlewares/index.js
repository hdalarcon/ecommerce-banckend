require('dotenv').config()

const authMiddleware = (req, res, next) => {
    if(process.env.rol == "admin"){
        next()
    }else{
        res.send('No tiene permisos de administrador.')
    }
}

module.exports = { authMiddleware }