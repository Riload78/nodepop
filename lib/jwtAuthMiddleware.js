const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const jwtAuth = (req, res, next) => {
	// sacar el jwk de la respuesta
	const tokenJWT = req.get("Authorization") || req.body.token || req.query.token
	// si no tengo el token-> error
	if (!tokenJWT) {
		next(createError(401, "Token not found"));
		return;
	}
	//  Compruebo el token si es valido -> error
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            next(createError(401, "Unauthorized"));
            return;
        }
        console.log(decoded);
        req.user = decoded.id
        next();
    })
}

module.exports = jwtAuth