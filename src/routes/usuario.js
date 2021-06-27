const { Router } = require("express");
const Usuario = require("../models/Usuario");
//const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");
const bcrypt = require("bcryptjs");

class UsuarioRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/usuario/registrar", this.registrar);
    this.router.post("/usuario/ingresar", this.ingresar);
  }

  async registrar(req, res) {
    const data = req.body;
    if (!data.usuario && !data.contrasenia) {
      res.status(400).send("Parametros inválidos");
      return;
    }

    const hashContrasenia = bcrypt.hashSync(data.contrasenia, 8);
    const usuarioBuscado = await Usuario.findOne({ usuario: data.usuario });
    console.log(usuarioBuscado);
    if (usuarioBuscado) {
      res.status(400).send("Usuario existente");
      return;
    }

    data.contrasenia = hashContrasenia;
    await Usuario.create(data);
    
    const token = AuthService.crearToken(data.usuario);
    res.status(200).send({ auth: true, token: token });

  }

  async ingresar(req, res){

    const usuarioBuscado = await Usuario.findOne({ usuario: req.body.usuario })
    if( !usuarioBuscado ){
        res.status(401).send("Acceso no autorizado")
        return
    }
    const contraseniaValida = bcrypt.compareSync(req.body.contrasenia, usuarioBuscado.contrasenia);
    if (!contraseniaValida){
      return res.status(401).send({ auth: false, token: null });
    } 
    const token = AuthService.crearToken(usuarioBuscado.usuario);
    res.status(200).send({ auth: true, token: token });

  }

}

const usuarioRoutes = new UsuarioRoutes();
module.exports = usuarioRoutes.router;
