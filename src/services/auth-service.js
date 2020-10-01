const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: "1d"})
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY)
    return data
}

// Função de middleware
exports.authorize = async (req, res, netx) => {
    // Buscar o token no body, no query ou no headers
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Encontrou o token 
    if(!token){
        res.status(401).json({
            messsage: `Acesso restrito`
        })
    } else {
        // Se achou, verificar
        jet.verify(token, global.SALT_KEY, function(error, decode) {
            if(error){
                res.status(401).json({
                    messsage: `Token inválido`,
                    error: error
                })
            } else {
                // Token Valido, portanto, continua a aplicação
                netx();
            }
        })
    }
}