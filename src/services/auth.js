const jwt = require("jsonwebtoken");

class AuthService {
  crearToken(usuario) {
    if (usuario) {
      const token = jwt.sign({ usuario }, process.env.SECRET, {
        expiresIn: 86400, // vence en 24 horas
      });
      return token;
    }
    return null;
  }

  middleware(req, res, next) {
    const authorization = req.headers["authorization"]
    if (!authorization){
        return res.status(401)
        .send({ auth: false, message: "Falta token."});
    } 

    const [_, token] = authorization.split(' ');


    let payload;
    try {
      payload = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res
        .status(500)
        .send({ auth: false, message: "No se pudo autenticar el token." });
    }

    req.usuario = payload;

    next();

  }
}

module.exports = new AuthService();
