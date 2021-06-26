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
}

module.exports = new AuthService();
