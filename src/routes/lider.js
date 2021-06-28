const { Router } = require("express");
const Lider = require("../models/Lider");
const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");


class LiderRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
      
    // Middleware de autorizacion con JWT  
    this.router.use(AuthService.middleware);
    this.router.get("lLider", this.obtenerTodos);
    this.router.get("/lider/:id", this.obtenerPorId);
    this.router.post("/lider", this.crear);
    this.router.put("/lider", this.modificar);
    this.router.delete("/lider/:id", this.borrarPorId)
  }

  async crear(req, res) {
    const data = req.body;
    if (
      !data.nombre &&
      !data.rol &&
      !data.email
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const lidernew = await Lider.create(data);
    res.json(lidernew);
  }

  async modificar(req, res) {
    const data = req.body;
    if (
        !data.nombre &&
        !data.rol &&
        !data.email
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const liderEdit = await Lider.findByIdAndUpdate(data.id, data);
    if (liderEdit) {
      res.send("Modificacion correcta");
      res.json(liderEdit);
    }
  }

  async obtenerTodos(req, res) {
    const data = await Lider.find({});
    res.json(data);
  }

  async obtenerPorId(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send("ID invalido");
    }
    const data = await Lider.findById(req.params.id);
    if (!data) {
      res.status(400).send("Lider no encontrado");
    }
    res.json(data);
  }

  async borrarPorId(req, res){

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("ID invalido");
      }
      const data = await Lider.findByIdAndDelete(req.params.id);
      if (!data) {
        res.status(400).send("Lider no encontrado");
      }
      res.json(data);
  }
}

const LiderRoutes = new LiderRoutes();
module.exports = LiderRoutes.router;