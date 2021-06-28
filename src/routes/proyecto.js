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
    // Todas las rutas empiezan con /proyecto

    this.router.delete("/:id", AuthService.middleware,  this.borrarPorId)
    this.router.get("/:id", AuthService.middleware, this.obtenerPorId);
    this.router.get("/", AuthService.middleware, this.obtenerTodos);
    this.router.post("/", AuthService.middleware,  this.crear);
    this.router.put("/", AuthService.middleware,  this.modificar);

  }

  async crear(req, res) {
    const data = req.body;
    if (
      !data.nombre ||
      !data.descripcion ||
      !data.plazo ||
      !data.categoria ||
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
      !data.nombre ||
      !data.descripcion ||
      !data.plazo ||
      !data.categoria ||
      !data.lider
    ) {
      res.status(400).send("Parametros inválidos");
    }
    const proyectoEdit = await Proyecto.findByIdAndUpdate(data.id, data);
    if (proyectoEdit) {
      res.send("Modificacion correcta");
      res.json(proyectoEdit)
    }
  }

  async obtenerPorId(req, res) {

    const {id} = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).send("ID invalido");
      return
    }
    const data = await Proyecto.findById(id);
    if (!data) {
      res.status(400).send("Proyecto no encontrado");
      return
    }
    res.json(data);
  }

  async obtenerTodos(req, res) {
    console.log('Get by id ??')
    const data = await Proyecto.find({});
    res.json(data);
  }

  async borrarPorId(req, res){

    const {id} = req.params;

    if (!ObjectId.isValid(id)) {
        res.status(400).send("ID invalido");
      }
      const data = await Proyecto.findByIdAndDelete(id);
      if (!data) {
        res.status(400).send("Proyecto no encontrado");
      }
      res.json(data);
  }
}

const proyectoRoutes = new ProyectoRoutes();
module.exports = proyectoRoutes.router;
