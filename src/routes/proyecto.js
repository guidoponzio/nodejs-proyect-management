const { Router } = require("express");
const Proyecto = require("../models/Proyecto");
const ObjectId = require("mongoose").Types.ObjectId;
const AuthService = require("../services/auth");

class ProyectoRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
      
    // Middleware de autorizacion con JWT  
    //this.router.use(AuthService.middleware);
    this.router.get("/proyecto", AuthService.middleware, this.obtenerTodos);
    this.router.get("/proyecto/:id", AuthService.middleware, this.obtenerPorId);
    this.router.post("/proyecto", AuthService.middleware,  this.crear);
    this.router.put("/proyecto", AuthService.middleware,  this.modificar);
    this.router.delete("/proyecto/:id", AuthService.middleware,  this.borrarPorId)
  }

  async crear(req, res) {
    const data = req.body;
    if (
      !data.nombre &&
      !data.descripcion &&
      !data.plazo &&
      !data.categoria &&
      !data.lider
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const proyectonew = await Proyecto.create(data);
    res.json(proyectonew);
  }

  async modificar(req, res) {
    const data = req.body;
    if (
      !data.nombre &&
      !data.descripcion &&
      !data.plazo &&
      !data.categoria &&
      !data.lider
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const proyectoEdit = await Proyecto.findByIdAndUpdate(data.id, data);
    if (proyectoEdit) {
      res.send("Todo joya");
    }
  }

  async obtenerTodos(req, res) {
    const data = await Proyecto.find({});
    res.json(data);
  }

  async obtenerPorId(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send("ID invalido");
    }
    const data = await Proyecto.findById(req.params.id);
    if (!data) {
      res.status(400).send("Proyecto no encontrado");
    }
    res.json(data);
  }

  async borrarPorId(req, res){

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("ID invalido");
      }
      const data = await Proyecto.findByIdAndDelete(req.params.id);
      if (!data) {
        res.status(400).send("Proyecto no encontrado");
      }
      res.json(data);
  }
}

const proyectoRoutes = new ProyectoRoutes();
module.exports = proyectoRoutes.router;
